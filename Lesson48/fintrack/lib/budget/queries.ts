import { format } from "date-fns";

import { leftToSpend, spentByCategory, totalSpent } from "@/lib/budget/calculations";
import { prisma } from "@/lib/prisma";
import { getDemoUser } from "@/lib/session";

export function currentBillingMonth(date = new Date()): string {
  return format(date, "yyyy-MM");
}

export async function getHomeDashboard() {
  const user = await getDemoUser();
  const billingMonth = currentBillingMonth();

  const [budget, transactions, categories] = await Promise.all([
    prisma.budget.findUnique({
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
    }),
    prisma.transaction.findMany({
      where: { userId: user.id },
      orderBy: { occurredAt: "desc" },
      include: { category: true },
    }),
    prisma.category.findMany({
      where: { userId: user.id },
      orderBy: { name: "asc" },
    }),
  ]);

  const spent = totalSpent(transactions);
  const remaining = budget ? leftToSpend(budget.totalAmount, spent) : null;

  return {
    user,
    account: user.account,
    budget,
    transactions,
    categories,
    spent,
    remaining,
    billingMonth,
    spentByCategory: spentByCategory(transactions),
  };
}
