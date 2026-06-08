import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export default function CreateBudgetPage() {
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <header className="flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card"
          aria-label="Back to home"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </Link>
        <h1 className="text-sm font-bold text-foreground">Create Budget</h1>
      </header>
      <PlaceholderPage
        title="Budget builder"
        description="Scaffold route for Epic B. Implement amount chips, category allocation, and amount-left validation here."
      />
    </div>
  );
}
