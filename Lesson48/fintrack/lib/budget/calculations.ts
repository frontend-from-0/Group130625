export type CategoryAllocation = {
  categoryId: string;
  limitAmount: number;
};

export type TransactionAmount = {
  categoryId: string | null;
  amount: number;
  direction: "INFLOW" | "OUTFLOW";
};

export function sumCategoryLimits(allocations: CategoryAllocation[]): number {
  return allocations.reduce((sum, row) => sum + row.limitAmount, 0);
}

export function amountLeft(
  totalAmount: number,
  allocations: CategoryAllocation[],
): number {
  return totalAmount - sumCategoryLimits(allocations);
}

export function spentByCategory(
  transactions: TransactionAmount[],
): Map<string, number> {
  const totals = new Map<string, number>();

  for (const transaction of transactions) {
    if (!transaction.categoryId || transaction.direction !== "OUTFLOW") {
      continue;
    }

    const current = totals.get(transaction.categoryId) ?? 0;
    totals.set(transaction.categoryId, current + transaction.amount);
  }

  return totals;
}

export function totalSpent(transactions: TransactionAmount[]): number {
  let spent = 0;

  for (const transaction of transactions) {
    if (transaction.direction === "OUTFLOW") {
      spent += transaction.amount;
    }
  }

  return spent;
}

export function leftToSpend(totalAmount: number, spent: number): number {
  return totalAmount - spent;
}

export function isOverBudget(spent: number, limit: number): boolean {
  return spent > limit;
}

export function overageAmount(spent: number, limit: number): number {
  return Math.max(0, spent - limit);
}
