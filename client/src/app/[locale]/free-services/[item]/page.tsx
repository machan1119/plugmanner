import { getOriginalFreeServicesItem } from "@/i18n/freeServicesItemMappings";
import { ServiceMetadataType } from "@/libs/types/ListTypes";
import { generate_item_url_from_name } from "@/utils/functions";
import { Metadata } from "next";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";
import { notFound, redirect } from "next/navigation";
import { FreeServicesProvider } from "@/providers/FreeServicesProvider";
import FreeServicesContent from "@/components/pages/FreeServices/FreeServicesContent";
import { fetchFreeServicesMetaData } from "@/utils/fetch-free-services-data";

export default async function FreeServicePage({
  params,
}: {
  params: Promise<{ locale: string; item: string }>;
}) {
  const { locale, item } = await params;
  const originalItem = await getOriginalFreeServicesItem(item, locale);
  if (!originalItem) {
    notFound();
  }
  if (item != originalItem) {
    let basePath = "/free-services";
    if (locale === "es-ES") basePath = "/servicios-gratuitos";
    else if (locale === "de") basePath = "/kostenlose-Dienstleistungen";
    else if (locale === "pt-BR") basePath = "/serviços-gratuitos";
    redirect(`${basePath}/${originalItem}`);
  }
  return (
    <FreeServicesProvider locale={locale} item={originalItem}>
      <FreeServicesContent />;
    </FreeServicesProvider>
  );
}

type Props = {
  params: Promise<{ item: string }>;
};

interface AlternatesDataType {
  locale: string;
  url: string;
}

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}`;
export async function generateMetadata({
  params,
}: Props): Promise<Metadata | null> {
  const item = (await params).item;
  const allMetaData: ServiceMetadataType = await fetchFreeServicesMetaData(
    item
  );
  if (!allMetaData) {
    return null;
  }
  const alternatesData: AlternatesDataType[] = [];
  alternatesData.push({
    locale: allMetaData.locale,
    url: generate_item_url_from_name(allMetaData.name),
  });
  allMetaData.localizations.map((item) =>
    alternatesData.push({
      locale: item.locale,
      url: generate_item_url_from_name(item.name),
    })
  );
  const alternates = generateAlternates(alternatesData);
  return {
    title: allMetaData.seo?.metaTitle,
    description: allMetaData.seo?.metaDescription,
    icons:
      "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/629626671773b82cec88fdc4_socialplug-favicon-small.png",
    ...(allMetaData.seo.metaSocial?.[0] && {
      twitter: {
        title: allMetaData.seo?.metaSocial[0]?.title,
        description: allMetaData.seo?.metaSocial[0]?.description,
        images: allMetaData.seo?.metaSocial[0]?.image,
      },
    }),
    openGraph: {
      title: allMetaData.seo?.openGraph?.ogtitle,
      description: allMetaData.seo?.openGraph?.ogdescription,
      images: allMetaData.seo?.openGraph?.ogimage,
    },
    alternates: {
      ...alternates,
    },
    robots: {
      index: false,
      follow: false,
      nocache: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function generateAlternates(data: AlternatesDataType[]): AlternateURLs {
  const alternates: AlternateURLs = {
    canonical: "",
    languages: undefined, // Initialize as undefined to avoid type errors
  };

  // Find the canonical URL (assuming 'en' locale)
  const canonicalItem = data.find((item) => item.locale === "en");
  alternates.canonical = BASE_URL + "/free-services/" + canonicalItem?.url;

  // Populate languages
  const languages: { [locale: string]: string } = {}; // Create a custom object for languages
  data.forEach((item) => {
    if (item.locale == "es-ES") {
      languages[item.locale] =
        BASE_URL + "/es-ES/servicios-gratuitos/" + item?.url;
    } else if (item.locale == "de") {
      languages[item.locale] =
        BASE_URL + "/de/kostenlose-Dienstleistungen/" + item?.url;
    } else if (item.locale == "pt-BR") {
      languages[item.locale] =
        BASE_URL + "/pt-BR/serviços-gratuitos/" + item?.url;
    }
  });

  alternates.languages = languages;

  return alternates;
}
