import Link from "next/link";
import { notFound } from "next/navigation";

type Post = { id: number; title: string; body: string };

async function fetchPost(id: string): Promise<Post | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: { revalidate: 300 },
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Failed to load post (${res.status})`);
  }
  return res.json() as Promise<Post>;
}

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const post = await fetchPost(id);
  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
        <Link
          href="/products"
          className="text-sm text-zinc-600 underline-offset-2 hover:underline dark:text-zinc-400"
        >
          ← Back to products
        </Link>
        <article className="mt-6">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {post.body}
          </p>
        </article>
        <p className="mt-8 text-xs text-zinc-500 dark:text-zinc-500">
          IDs 1–3 are listed in <code>generateStaticParams</code>; other IDs
          still work on demand when <code>dynamicParams</code> is true (the
          default).
        </p>
      </main>
    </div>
  );
}
