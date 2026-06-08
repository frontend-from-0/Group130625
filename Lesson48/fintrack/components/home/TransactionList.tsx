import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";

type TransactionItem = {
  id: string;
  merchantName: string;
  amount: number;
  direction: "INFLOW" | "OUTFLOW";
};

type TransactionListProps = {
  transactions: TransactionItem[];
  limit?: number;
};

function TransactionAvatar({
  merchantName,
  direction,
}: {
  merchantName: string;
  direction: "INFLOW" | "OUTFLOW";
}) {
  if (merchantName.toLowerCase() === "fitness first") {
    return (
      <span className="relative size-11 shrink-0 overflow-hidden rounded-[30px]">
        <Image
          src="/design/fitness-first.png"
          alt=""
          fill
          className="object-cover"
          sizes="44px"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-[30px] p-3",
        direction === "INFLOW" ? "bg-[#edf7ec]" : "bg-[#f2f4f7]",
      )}
    >
      <ArrowUpRight
        className={cn(
          "size-5",
          direction === "INFLOW"
            ? "rotate-180 text-success"
            : "text-foreground",
        )}
        aria-hidden
      />
    </span>
  );
}

export function TransactionList({
  transactions,
  limit = 3,
}: TransactionListProps) {
  const items = transactions.slice(0, limit);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-foreground">Transactions</h2>
        <Link
          href="/transactions"
          className="inline-flex items-center gap-1 text-sm font-bold text-brand"
        >
          view all
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
      <div className="flex flex-col gap-4 rounded-[18px] border border-[#f2f4f7] bg-card p-5 shadow-[0px_6px_30px_rgba(0,0,0,0.04)]">
        {items.map((transaction, index) => (
          <div key={transaction.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TransactionAvatar
                  merchantName={transaction.merchantName}
                  direction={transaction.direction}
                />
                <span className="text-[13px] font-semibold text-foreground">
                  {transaction.merchantName}
                </span>
              </div>
              <span
                className={cn(
                  "text-sm font-semibold",
                  transaction.direction === "INFLOW"
                    ? "text-success"
                    : "text-text-secondary",
                )}
              >
                {transaction.direction === "OUTFLOW" ? "- " : ""}
                {formatCurrency(transaction.amount)}
              </span>
            </div>
            {index < items.length - 1 ? (
              <div className="mt-4 h-px bg-[#f2f4f7]" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
