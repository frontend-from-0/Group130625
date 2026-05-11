export default function RootLoading() {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col gap-3 px-4 py-16 sm:px-6">
      <div
        className="h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"
        aria-hidden
      />
      <div
        className="h-4 w-full max-w-lg animate-pulse rounded bg-zinc-100 dark:bg-zinc-900"
        aria-hidden
      />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Loading route… from <code className="text-xs">src/app/loading.tsx</code>{" "}
        (root segment).
      </p>
    </div>
  );
}
