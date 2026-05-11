import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Product not found
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The API returned no post for this id. This page is shown when the server
        calls <code className="text-xs">notFound()</code> from{" "}
        <code className="text-xs">next/navigation</code>.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-block text-sm text-zinc-800 underline dark:text-zinc-200"
      >
        Back to products
      </Link>
    </div>
  );
}
