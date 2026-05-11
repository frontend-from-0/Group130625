"use client";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white px-4 py-16 text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
        <h1 className="text-lg font-semibold text-red-700 dark:text-red-400">
          Critical error
        </h1>
        <p className="mt-2 text-sm">{error.message}</p>
        <p className="mt-4 max-w-lg text-xs text-zinc-600 dark:text-zinc-400">
          <code>global-error.tsx</code> replaces the root layout when the error
          happens in the root layout itself. It must define its own{" "}
          <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code>.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
