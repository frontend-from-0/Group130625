import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AdminTopNav({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <header className="w-full border-b border-white/8 bg-[#060812] text-white">
      <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
        <div>
          {isAuthenticated ? (
            <Button
              asChild
              variant="ghost"
              className="border border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="/auth/logout">Logout</a>
            </Button>
          ) : (
            <Button
              asChild
              variant="ghost"
              className="border border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="/auth/login">Login</a>
            </Button>
          )}
        </div>

        <Link
          href="/admin"
          className="text-lg font-semibold tracking-tight hover:opacity-90 transition-opacity"
        >
          VoltHaus Admin
        </Link>
      </div>
    </header>
  );
}

