import { prisma } from '@/lib/prisma';


export enum Currency {
  SEK = 'SEK',
  USD = 'USD'
}

export const Currencies = Object.values(Currency);

interface ProductPayload {
  title: string;
  price: number;
  images: {
    url: string;
  }[];
}

export async function getProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      price: true,
      currency: true,
      images: true,
      createdAt: true,
    },
  });
}

export async function createProduct(product: ProductPayload) {
  return prisma.product.create({
    data: {
      title: product.title,
      price: product.price,
      currency: Currency.SEK,
      images: product.images.map((item) => item.url),
    },
  });
}

// same for any other prisma interaction - never call prisma directly from your app code
