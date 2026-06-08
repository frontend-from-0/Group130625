import { currentBillingMonth } from "@/lib/budget/queries";
import { createBudgetSchema } from "@/lib/api/schemas";
import { apiError } from "@/lib/api/schemas";
import { prisma } from "@/lib/prisma";
import { getDemoUser } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const user = await getDemoUser();
    const { searchParams } = new URL(request.url);
    const billingMonth = searchParams.get("billingMonth") ?? currentBillingMonth();

    const budget = await prisma.budget.findUnique({
      where: {
        userId_billingMonth: {
          userId: user.id,
          billingMonth,
        },
      },
      include: {
        categoryBudgets: {
          include: { category: true },
        },
      },
    });

    return Response.json({ budget });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load budget";
    return apiError(message, 500);
  }
}

export async function POST(request: Request) {
  try {
    const user = await getDemoUser();
    const body = await request.json();
    const parsed = createBudgetSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0]?.message ?? "Invalid budget payload");
    }

    const { billingMonth, totalAmount, allocations } = parsed.data;

    const budget = await prisma.budget.create({
      data: {
        userId: user.id,
        billingMonth,
        totalAmount,
        categoryBudgets: {
          create: allocations.map((allocation) => ({
            categoryId: allocation.categoryId,
            limitAmount: allocation.limitAmount,
          })),
        },
      },
      include: {
        categoryBudgets: {
          include: { category: true },
        },
      },
    });

    return Response.json({ budget }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create budget";
    return apiError(message, 500);
  }
}
