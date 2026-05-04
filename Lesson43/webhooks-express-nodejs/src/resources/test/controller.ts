import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { prisma } from '../../common/prisma'
import logger from '../../common/logger'

const orderLineSchema = z
  .strictObject({
    productId: z.string().trim().min(1),
    quantity: z.number().int().positive(),
    unitPrice: z.number().finite().nonnegative(),
  })

export const createOrderBodySchema = z
  .strictObject({
    userId: z.string().trim().min(1),
    email: z.string().trim().email().optional(),
    status: z.string().trim().min(1).optional(),
    lines: z.array(orderLineSchema).min(1),
  })

export type CreateOrderBody = z.infer<typeof createOrderBodySchema>

export const receiveOrders = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const parsed = createOrderBodySchema.safeParse(request.body)
    if (!parsed.success) {
      return response.status(400).json({
        error: 'Validation failed',
        issues: parsed.error.issues,
      })
    }

    const { userId, email, status, lines } = parsed.data

    const userEmail = email ?? `${userId}@orders.placeholder`

    await prisma.user.upsert({
      where: { id: userId },
      create: {
        id: userId,
        email: userEmail,
      },
      update: {},
    })

    const order = await prisma.order.create({
      data: {
        userId,
        ...(status !== undefined ? { status } : {}),
        order_lines: {
          create: lines.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
            unitPrice: line.unitPrice,
          })),
        },
      },
      include: { order_lines: true },
    })

    logger.info({ orderId: order.id, userId }, 'Order created')

    return response.status(201).json({
      id: order.id,
      userId: order.userId,
      status: order.status,
      order_lines: order.order_lines,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    })
  } catch (err) {
    logger.error(err, 'receiveOrders failed')
    next(err)
  }
}

const orderIdQuerySchema = z.strictObject({
  orderId: z.preprocess(
    (val) => {
      if (typeof val === 'string') return val
      if (Array.isArray(val) && typeof val[0] === 'string') return val[0]
      return val
    },
    z.string().trim().min(1),
  ),
})

function formatCustomerName(user: {
  firstName: string | null
  lastName: string | null
}): string | null {
  const parts = [user.firstName?.trim(), user.lastName?.trim()].filter(Boolean)
  return parts.length > 0 ? parts.join(' ') : null
}

export const getOrderForEmail = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const queryParsed = orderIdQuerySchema.safeParse(request.query)
    if (!queryParsed.success) {
      return response.status(400).json({
        error: 'Validation failed',
        issues: queryParsed.error.issues,
      })
    }

    const { orderId } = queryParsed.data

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
        order_lines: {
          include: { product: true },
        },
      },
    })

    if (!order) {
      return response.status(404).json({ error: 'Order not found' })
    }

    const { user } = order
    const order_lines = order.order_lines.map((line) => {
      const lineTotal = line.quantity * line.unitPrice
      return {
        lineId: line.id,
        productId: line.productId,
        title: line.product.title,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        lineTotal,
        currency: line.product.currency,
      }
    })

    const subtotal = order_lines.reduce((sum, item) => sum + item.lineTotal, 0)
    const primaryCurrency = order_lines[0]?.currency ?? 'SEK'
    const customerName = formatCustomerName(user)

    const payload = {
      meta: {
        type: 'order_summary',
        generatedAt: new Date().toISOString(),
      },
      customer: {
        id: user.id,
        email: user.email,
        displayName: customerName,
        emailVerified: user.emailVerified,
        address: user.address
          ? {
              street: user.address.street,
              city: user.address.city,
              postalCode: user.address.postalCode,
              country: user.address.country,
            }
          : null,
      },
      order: {
        id: order.id,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        currency: primaryCurrency,
        itemCount: order_lines.reduce((n, i) => n + i.quantity, 0),
        lineCount: order_lines.length,
        subtotal,
        order_lines,
      },
      email: {
        subject: `Order ${order.id} — ${order.status}`,
        greeting: customerName ? `Hi ${customerName},` : 'Hi,',
        summaryLines: [
          `Order ID: ${order.id}`,
          `Status: ${order.status}`,
          `Placed: ${order.createdAt.toISOString()}`,
          '',
          ...order_lines.map(
            (i) =>
              `• ${i.title} × ${i.quantity} @ ${i.unitPrice} ${i.currency} = ${i.lineTotal} ${i.currency}`,
          ),
          '',
          `Subtotal: ${subtotal} ${primaryCurrency}`,
        ],
      },
    }

    return response.status(200).json(payload)
  } catch (err) {
    logger.error(err, 'getOrderForEmail failed')
    next(err)
  }
}
