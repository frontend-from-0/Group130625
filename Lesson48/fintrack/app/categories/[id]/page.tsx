import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

type CategoryDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title="Category detail"
      description={`Scaffold route for category ${id} — spending breakdown and filtered transactions (Epic D).`}
    />
  );
}
