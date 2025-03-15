import { ServicesProvider } from "@/providers/ServicesProvider";

export default async function ItemLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ item: string }>;
}>) {
  const item = (await params).item;
  return <ServicesProvider item={item}>{children}</ServicesProvider>;
}
