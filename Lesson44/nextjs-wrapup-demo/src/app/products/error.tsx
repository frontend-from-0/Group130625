"use client";

import { useEffect } from "react";

type ProductsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  useEffect(() => {
    console.error("[products segment]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
        Something went wrong in /products
      </h2>
      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
        {error.message}
      </p>
      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        This UI comes from{" "}
        <code className="text-xs">src/app/products/error.tsx</code> and only
        wraps the products segment—not the whole site.
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
