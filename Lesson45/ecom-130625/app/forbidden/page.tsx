import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-[#060812] text-white">
      <div className="w-full max-w-md bg-white/4 border border-white/8 rounded-3xl p-8">
        <h1 className="text-2xl font-semibold tracking-[-0.02em]">403</h1>
        <p className="mt-2 text-slate-300">You don’t have access to this page.</p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-white/6 hover:bg-white/10 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

