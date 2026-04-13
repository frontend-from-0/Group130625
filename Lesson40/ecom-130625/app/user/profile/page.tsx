import { Profile } from "@/components/Profile";
import { Button } from "@/components/ui/button";

export default function UserProfilePage() {
  return (
    <main className="min-h-screen bg-[#060812] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white/4 backdrop-blur-2xl border border-white/8 rounded-3xl shadow-2xl shadow-black/60 overflow-hidden">
          <div className="h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />
          <div className="px-8 md:px-10 pt-9 md:pt-10 pb-9 md:pb-10 flex flex-col items-center gap-6 md:gap-7">
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-semibold text-white tracking-[-0.02em]">
                Your profile
              </h1>
              <p className="text-slate-500 text-sm md:text-[15px] mt-1.5">
                Account details
              </p>
            </div>

            <div className="w-full h-px bg-white/6" />

            <div className="w-full flex flex-col gap-4">
              <Profile />
              <Button asChild variant="outline" className="w-full">
                <a href="/auth/logout">Sign out</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

