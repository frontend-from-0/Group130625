import Image from "next/image";
import { Bell } from "lucide-react";

import { BalanceCard } from "@/components/home/BalanceCard";
import { BudgetCta } from "@/components/home/BudgetCta";
import { InsightCard } from "@/components/home/InsightCard";
import { TransactionList } from "@/components/home/TransactionList";
import { getHomeDashboard } from "@/lib/budget/queries";

function getGreeting(date = new Date()): string {
  const hour = date.getHours();

  if (hour < 12) {
    return "Good Morning";
  }

  if (hour < 18) {
    return "Good Afternoon";
  }

  return "Good Evening";
}

export default async function HomePage() {
  const dashboard = await getHomeDashboard();
  const balance = dashboard.account?.balance ?? 0;

  return (
    <div className="mx-auto flex w-full max-w-[350px] flex-col gap-6 lg:max-w-3xl">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/design/avatar.png"
              alt=""
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground">
              {getGreeting()}, {dashboard.user.name}
            </h1>
            <p className="text-sm font-semibold text-text-secondary">
              Have a good day!
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex size-10 items-center justify-center rounded-[27px] bg-card p-2 shadow-[0px_6px_30px_rgba(0,0,0,0.04)]"
        >
          <Bell className="size-6 text-foreground" aria-hidden />
          <span className="absolute right-1 top-1 size-2.5 rounded-full bg-[#ff3b30]" />
        </button>
      </header>

      <BalanceCard balance={balance} currency={dashboard.account?.currency} />

      {dashboard.budget && dashboard.remaining !== null ? (
        <InsightCard
          remaining={dashboard.remaining}
          spent={dashboard.spent}
          total={dashboard.budget.totalAmount}
        />
      ) : (
        <BudgetCta />
      )}

      <TransactionList transactions={dashboard.transactions} />
    </div>
  );
}
