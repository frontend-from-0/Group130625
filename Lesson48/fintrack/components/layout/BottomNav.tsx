"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavActive, NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] lg:hidden"
      aria-label="Primary"
    >
      <ul className="grid grid-cols-4 px-5 pt-3">
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <li key={item.href} className="flex justify-center">
              <Link
                href={item.href}
                className={cn(
                  "flex w-[75px] flex-col items-center gap-2 text-[11px] transition-colors",
                  active
                    ? "font-semibold text-brand"
                    : "font-medium text-text-secondary",
                )}
              >
                <Icon className="size-5" aria-hidden />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
