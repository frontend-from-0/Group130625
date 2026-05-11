import Link from "next/link";
import { notFound } from "next/navigation";

type Product = { id: number; title: string };

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=8",
    {
      next: { revalidate: 60 },
    },
  );
  if (!res.ok) {
    notFound();
  }
  const data = (await res.json()) as { id: number; title: string }[];
  return data.map((p) => ({ id: p.id, title: p.title }));
}

type ProductsPageProps = {
  searchParams: Promise<{ fail?: string }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { fail } = await searchParams;
  if (fail === "1") {
    throw new Error("Demo: intentional error (remove ?fail=1 from the URL).");
  }

  const products = await fetchProducts();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Products (ISR)
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
          This page uses{" "}
          <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs dark:bg-zinc-800">
            fetch(..., {"{"} next: {"{"} revalidate: 60 {"}"} {"}"})
          </code>
          . Responses can be cached and refreshed in the background—good for
          listings that do not need to be exact to the second.
        </p>
        <p className="mt-3 text-sm text-amber-800 dark:text-amber-200">
          Try{" "}
          <Link className="underline" href="/products?fail=1">
            /products?fail=1
          </Link>{" "}
          to see the segment <code className="text-xs">error.tsx</code>{" "}
          boundary.
        </p>
        <ul className="mt-8 flex flex-col gap-3">
          {products.map((p) => (
            <li key={p.id}>
              <Link
                href={`/products/${p.id}`}
                className="text-zinc-800 underline-offset-2 hover:underline dark:text-zinc-200"
              >
                {p.title.slice(0, 72)}
                {p.title.length > 72 ? "…" : ""}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
          Open a product, then try{" "}
          <Link className="underline" href="/products/99999">
            /products/99999
          </Link>{" "}
          for a 404 demo (<code className="text-xs">notFound()</code>).
        </p>
      </main>
    </div>
  );
}
