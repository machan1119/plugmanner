import ServicesContent from "@/components/pages/Services/ServiceContent";
import { ServiceMetadataType } from "@/libs/types/ListTypes";
import { fetchServiceMetaData } from "@/utils/fetch-service-data";
import { Metadata } from "next";

export default function ServicesPage() {
  return <ServicesContent />;
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
    viewport: metaData?.metaViewport,
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
