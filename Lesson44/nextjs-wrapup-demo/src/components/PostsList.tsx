export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 120 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load posts (${res.status})`);
  }
  return res.json() as Promise<Post[]>;
}

export async function PostsList() {
  const posts = await fetchPosts();
  const preview = posts.slice(0, 5);

  return (
    <ul className="flex flex-col gap-6">
      {preview.map((post) => (
        <li
          key={post.id}
          className="border-b border-zinc-200 pb-6 last:border-0 dark:border-zinc-800"
        >
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {post.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {post.body}
          </p>
        </li>
      ))}
    </ul>
  );
}
