import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products (ISR)" },
  { href: "/now", label: "Now (dynamic)" },
  { href: "/env-demo", label: "Env (dynamic)" },
  { href: "/api/ping", label: "API ping" },
  { href: "/slow", label: "Slow route" },
] as const;

export function SiteNav() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <nav
        className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-4 py-3 text-sm"
        aria-label="Lesson demos"
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-zinc-700 underline-offset-4 hover:text-zinc-950 hover:underline dark:text-zinc-300 dark:hover:text-white"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
