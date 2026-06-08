"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LineChart } from "lucide-react";

import { isNavActive, NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-background lg:flex lg:flex-col">
      <div className="flex items-center gap-2 border-b border-border px-6 py-5">
        <LineChart className="size-5 text-brand" aria-hidden />
        <span className="text-lg font-bold text-foreground">Fintrack</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                active
                  ? "bg-brand/10 text-brand"
                  : "text-text-secondary hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
