"use client";

import { Eye, EyeOff, Grid2x2, Plus, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  { label: "Deposit", icon: Plus },
  { label: "Transfer", icon: ArrowUpRight },
  { label: "More", icon: Grid2x2 },
] as const;

type BalanceCardProps = {
  balance: number;
  currency?: string;
};

export function BalanceCard({ balance, currency = "USD" }: BalanceCardProps) {
  const [visible, setVisible] = useState(true);

  return (
    <section className="flex flex-col gap-7 overflow-hidden rounded-[18px] bg-surface-dark px-5 pb-5 pt-6 text-white shadow-sm">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <p className="font-balance text-sm text-[#bababa]">Total balance</p>
          <button
            type="button"
            aria-pressed={visible}
            aria-label={visible ? "Hide balance" : "Show balance"}
            className="inline-flex size-4 items-center justify-center text-[#bababa] transition-colors hover:text-white"
            onClick={() => setVisible((value) => !value)}
          >
            {visible ? (
              <EyeOff className="size-4" aria-hidden />
            ) : (
              <Eye className="size-4" aria-hidden />
            )}
          </button>
        </div>
        <div className="flex items-end gap-1.5">
          <p
            className={cn(
              "text-[40px] font-bold leading-none tracking-tight",
              !visible && "blur-sm select-none",
            )}
          >
            {visible ? formatCurrency(balance, currency).replace("$", "") : "••••••"}
          </p>
          <span className="pb-0.5 text-base text-[#bababa]">{currency}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              className="flex flex-col items-center justify-center gap-2.5 rounded-[13px] border border-white/6 bg-white/6 px-4 py-4 text-[13px] font-semibold text-white"
              disabled
              title="Coming soon"
            >
              <Icon className="size-6" aria-hidden />
              {action.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
