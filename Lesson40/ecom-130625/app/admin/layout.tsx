import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/authz";
import { auth0 } from "@/lib/auth0";
import { AdminTopNav } from "@/components/AdminTopNav";
import { AdminSidebar } from "@/components/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdmin();
  const session = await auth0.getSession();
  const isAuthenticated = Boolean(session?.user);

  return (
    <div className="dark min-h-screen bg-[#060812] text-white">
      <AdminTopNav isAuthenticated={isAuthenticated} />
      <SidebarProvider>
        <main className="mx-auto flex w-full max-w-7xl gap-4 px-6 py-6 md:gap-6 md:py-8">
          <AdminSidebar />
          <SidebarInset>
            <section className="flex-1 rounded-2xl border border-white/10 bg-white/4 p-4 md:p-6">
              {children}
            </section>
          </SidebarInset>
        </main>
      </SidebarProvider>
    </div>
  );
}

