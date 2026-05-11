export const dynamic = "force-dynamic";

export default async function NowPage() {
  const generatedAt = new Date().toISOString();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Always fresh (dynamic)
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          This route sets{" "}
          <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
            export const dynamic = &quot;force-dynamic&quot;
          </code>
          . Each request runs on the server again—useful for per-user
          dashboards, live inventory, or anything that must not be served from a
          stale cache.
        </p>
        <p className="mt-8 rounded-lg border border-zinc-200 bg-white p-4 font-mono text-sm text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
          Server render time (UTC):{" "}
          <span className="font-semibold">{generatedAt}</span>
        </p>
        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-500">
          Refresh the page: the timestamp should change every time. On
          serverless hosts, each refresh may run in a new function instance.
        </p>
      </main>
    </div>
  );
}
