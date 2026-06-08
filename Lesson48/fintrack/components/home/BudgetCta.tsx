import Link from "next/link";

import { Button } from "@/components/ui/button";

export function BudgetCta() {
  return (
    <section className="flex items-center justify-between gap-4 overflow-hidden rounded-[18px] border border-[#f2eaff] bg-[rgba(239,229,255,0.8)] px-5 py-4 shadow-[0px_6px_60px_4px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-3.5">
        <div className="space-y-0.5">
          <h2 className="text-base font-semibold text-[#2f1d4f]">
            Set a financial budget
          </h2>
          <p className="max-w-[185px] text-xs font-medium leading-5 text-[#6b637f]">
            Setting a budget helps you track your finance easier with fintrack
          </p>
        </div>
        <Link href="/budget/create">
          <Button className="h-auto rounded-[28px] bg-brand px-4 py-3 text-xs font-bold text-white shadow-[0px_4px_8px_rgba(0,30,43,0.1)] hover:bg-brand/90">
            Set up now
          </Button>
        </Link>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/design/budget-illustration.svg"
        alt=""
        className="h-[100px] w-[101px] shrink-0 object-contain"
      />
    </section>
  );
}
