import {
  amountLeft,
  isOverBudget,
  leftToSpend,
  overageAmount,
  spentByCategory,
  sumCategoryLimits,
  totalSpent,
} from "@/lib/budget/calculations";
import { formatCurrency } from "@/lib/format-currency";

describe("budget calculations", () => {
  it("sums category limits", () => {
    expect(
      sumCategoryLimits([
        { categoryId: "a", limitAmount: 1000 },
        { categoryId: "b", limitAmount: 2000 },
      ]),
    ).toBe(3000);
  });

  it("calculates amount left", () => {
    expect(
      amountLeft(6000, [
        { categoryId: "a", limitAmount: 1000 },
        { categoryId: "b", limitAmount: 2000 },
      ]),
    ).toBe(3000);
  });

  it("aggregates spent by category for outflows only", () => {
    const totals = spentByCategory([
      { categoryId: "a", amount: 50, direction: "OUTFLOW" },
      { categoryId: "a", amount: 25, direction: "OUTFLOW" },
      { categoryId: "b", amount: 100, direction: "INFLOW" },
      { categoryId: null, amount: 10, direction: "OUTFLOW" },
    ]);

    expect(totals.get("a")).toBe(75);
    expect(totals.has("b")).toBe(false);
  });

  it("calculates total spent and remaining budget", () => {
    const transactions = [
      { categoryId: "a", amount: 50, direction: "OUTFLOW" as const },
      { categoryId: "b", amount: 100, direction: "INFLOW" as const },
      { categoryId: "a", amount: 25, direction: "OUTFLOW" as const },
    ];

    expect(totalSpent(transactions)).toBe(75);
    expect(leftToSpend(6000, 75)).toBe(5925);
  });

  it("detects overspend and overage amount", () => {
    expect(isOverBudget(1250, 1000)).toBe(true);
    expect(overageAmount(1250, 1000)).toBe(250);
    expect(isOverBudget(900, 1000)).toBe(false);
  });
});

describe("formatCurrency", () => {
  it("formats USD values", () => {
    expect(formatCurrency(18987.67)).toBe("$18,987.67");
  });
});
