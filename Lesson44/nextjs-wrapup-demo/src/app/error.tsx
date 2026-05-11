"use client";

import { useEffect } from "react";

type RootErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error("[root error boundary]", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
      <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
        Application error
      </h2>
      <p className="mt-2 max-w-md text-center text-sm text-zinc-700 dark:text-zinc-300">
        {error.message}
      </p>
      <p className="mt-4 max-w-md text-center text-xs text-zinc-500 dark:text-zinc-500">
        From <code>src/app/error.tsx</code>—wraps the root layout’s children.
        Nested routes can still use their own <code>error.tsx</code> first (e.g.{" "}
        <code>/products</code>).
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Try again
      </button>
    </div>
  );
}
