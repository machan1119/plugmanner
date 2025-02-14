import ServicesContent from "@/components/pages/Services/ServiceContent";
import { slugify_reverse } from "@/utils/functions";
import { ServicesProvider } from "@/providers/ServicesProvider";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ item: string[] }>;
}) {
  const item = slugify_reverse((await params).item);

  return (
    <ServicesProvider item={item}>
      <ServicesContent />
    </ServicesProvider>
  );
}
