/**
 * Environment variables + **dynamic** rendering (Next.js 16 App Router)
 *
 * What typically makes a **route** render dynamically (i.e. work on a per-request basis instead
 * of being fully prerendered at build time)?
 *
 * - **Segment config:** `export const dynamic = 'force-dynamic'` (this page), or `revalidate = 0`
 * - **Request APIs:** `cookies()`, `headers()`, or `draftMode()` from `next/headers`
 * - **Route props:** reading `searchParams` / `params` in a `page` (and similar dynamic usage in layouts)
 * - **Uncached data:** `fetch(..., { cache: 'no-store' })` (and related opt-outs of the Data Cache)
 * - **Cache opt-out:** `unstable_noStore()` from `next/cache`
 * - **Request binding:** `await connection()` from `next/server` — defers rendering until a real
 *   incoming request exists, which prevents treating the route as static prerender output
 *
 * **About `process.env`:** reading an env var **alone** does *not* reliably force dynamic rendering.
 * Next may still inline values available at **build** time when it can prove the route is static.
 * For values that change per **deploy** or are injected at **runtime** (hosting dashboard, secrets),
 * combine env reads with one of the signals above — here we use `force-dynamic` so each request
 * sees the current server environment without needing a rebuild.
 */
export const dynamic = "force-dynamic";

export default async function EnvDemoPage() {
  const message =
    process.env.LESSON_DEMO_MESSAGE?.trim() ||
    "Set LESSON_DEMO_MESSAGE in .env.local (see .env.example), restart `npm run dev`, then refresh.";

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Server env (dynamic route)
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          This page reads a **server-only** env var (not{" "}
          <code className="text-xs">NEXT_PUBLIC_*</code>
          ). It sets{" "}
          <code className="text-xs">
            dynamic = &apos;force-dynamic&apos;
          </code>{" "}
          so the message is evaluated per request—mirroring how platforms inject
          env at deploy time.
        </p>
        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
            process.env.LESSON_DEMO_MESSAGE
          </p>
          <p className="mt-2 font-mono text-sm text-zinc-900 dark:text-zinc-100">
            {message}
          </p>
        </div>
        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-500">
          See the file comment in{" "}
          <code className="text-xs">src/app/env-demo/page.tsx</code> for what
          makes routes dynamic in Next.js 16.
        </p>
      </main>
    </div>
  );
}
