import ServicesContent from "@/components/pages/Services/ServiceContent";
import { ServiceMetadataType } from "@/libs/types/ListTypes";
import { ServicesProvider } from "@/providers/ServicesProvider";
import { fetchServiceMetaData } from "@/utils/fetch-service-data";
import { Metadata } from "next";
import { getOriginalServiceItem } from "@/i18n/serviceItemMappings";

export default async function ServicesPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; item: string }>;
}>) {
  const { locale, item } = await params;
  const originalItem = await getOriginalServiceItem(item, locale);
  return (
    <ServicesProvider locale={locale} item={originalItem}>
      <ServicesContent />;
    </ServicesProvider>
  );
}
type Props = {
  params: Promise<{ item: string }>;
};
export async function generateMetadata({
  params,
}: Props): Promise<Metadata | null> {
  const item = (await params).item;
  const metaData: ServiceMetadataType = (await fetchServiceMetaData(item)).seo;
  if (!metaData) {
    return null;
  }
  return {
    title: metaData?.metaTitle,
    description: metaData?.metaDescription,
    icons:
      "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/629626671773b82cec88fdc4_socialplug-favicon-small.png",
    ...(metaData.metaSocial?.[0] && {
      twitter: {
        title: metaData?.metaSocial[0]?.title,
        description: metaData?.metaSocial[0]?.description,
        images: metaData?.metaSocial[0]?.image,
      },
    }),
    openGraph: {
      title: metaData?.openGraph?.ogtitle,
      description: metaData?.openGraph?.ogdescription,
      images: metaData?.openGraph?.ogimage,
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
