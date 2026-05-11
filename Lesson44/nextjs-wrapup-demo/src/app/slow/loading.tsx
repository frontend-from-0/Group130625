export default function SlowRouteLoading() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start gap-3 px-4 py-16 sm:px-6">
      <div
        className="h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"
        aria-hidden
      />
      <div
        className="h-4 w-full max-w-md animate-pulse rounded bg-zinc-100 dark:bg-zinc-900"
        aria-hidden
      />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Loading <code className="text-xs">/slow</code>… This UI is from{" "}
        <code className="text-xs">src/app/slow/loading.tsx</code> (segment
        loading).
      </p>
    </div>
  );
}
