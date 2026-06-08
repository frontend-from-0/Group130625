import Link from "next/link";

import { Button } from "@/components/ui/button";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="mx-auto flex max-w-lg flex-col gap-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-text-secondary">{description}</p>
      <Link href="/">
        <Button variant="outline">Back to Home</Button>
      </Link>
    </section>
  );
}
