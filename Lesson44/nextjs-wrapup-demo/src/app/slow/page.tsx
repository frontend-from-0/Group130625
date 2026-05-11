async function artificialDelay(ms: number) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default async function SlowPage() {
  await artificialDelay(2500);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Slow route
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          This page awaits a short delay before rendering. When you navigate
          here from another route, Next.js shows the nearest{" "}
          <code className="text-xs">loading.tsx</code> for this segment until
          the server component finishes.
        </p>
        <p className="mt-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Content is ready.
        </p>
      </main>
    </div>
  );
}
