import ServicesContent from "@/components/pages/Services/ServiceContent";
import { ServicesProvider } from "@/providers/ServicesProvider";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const item = (await params).item;

  return (
    <ServicesProvider item={item}>
      <ServicesContent />
    </ServicesProvider>
  );
}
