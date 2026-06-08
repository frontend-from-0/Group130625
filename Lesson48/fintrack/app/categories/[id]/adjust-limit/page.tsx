import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

type AdjustLimitPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdjustLimitPage({ params }: AdjustLimitPageProps) {
  const { id } = await params;

  return (
    <PlaceholderPage
      title="Adjust limit"
      description={`Scaffold route for adjusting category ${id} limit with keypad and billing cycle (Epic D5–D6).`}
    />
  );
}
