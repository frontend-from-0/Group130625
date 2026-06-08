"use client";

import { BottomNav } from "@/components/layout/BottomNav";
import { AppSidebar } from "@/components/layout/AppSidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh bg-[#f8f9fa]">
      <AppSidebar />
      <div className="flex min-h-dvh flex-1 flex-col">
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-5 pb-24 pt-5 lg:px-8 lg:pb-8">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
