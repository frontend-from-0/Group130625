import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { formatCurrency } from "@/lib/format-currency";
import { Progress } from "@/components/ui/progress";

type InsightCardProps = {
  remaining: number;
  spent: number;
  total: number;
};

export function InsightCard({ remaining, spent, total }: InsightCardProps) {
  const progress = total > 0 ? Math.min(100, (spent / total) * 100) : 0;

  return (
    <Link
      href="/insights"
      className="block rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Spending insight</h2>
        <ArrowRight className="size-4 text-brand" aria-hidden />
      </div>
      <p className="text-sm font-semibold text-foreground">
        {formatCurrency(remaining)} left
      </p>
      <Progress value={progress} className="mt-3 h-2" />
      <p className="mt-2 text-sm text-text-secondary">
        {formatCurrency(spent)} of {formatCurrency(total)} spent
      </p>
    </Link>
  );
}
