import { Suspense } from "react";
import { PostsList } from "@/components/PostsList";

function PostsFallback() {
  return (
    <div
      className="animate-pulse space-y-4"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="h-4 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
      <div className="h-3 w-5/6 rounded bg-zinc-100 dark:bg-zinc-900" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Data fetching and Suspense
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            The shell above renders immediately. The list below streams in when
            the async server component finishes—see{" "}
            <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
              PostsList
            </code>{" "}
            wrapped in{" "}
            <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
              Suspense
            </code>
            .
          </p>
        </div>
        <Suspense fallback={<PostsFallback />}>
          <PostsList />
        </Suspense>
      </main>
    </div>
  );
}
