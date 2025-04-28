import FreeToolsContent from "@/components/pages/FreeTools/FreeToolsContent";
import { getOriginalFreeToolsItem } from "@/i18n/freeToolsItemMappings";
import { ServiceMetadataType } from "@/libs/types/ListTypes";
import { FreeToolsProvider } from "@/providers/FreeToolsProvider";
import { fetchServiceMetaData } from "@/utils/fetch-service-data";
import { generate_item_url } from "@/utils/functions";
import { Metadata } from "next";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";
import { notFound, redirect } from "next/navigation";

export default async function FreeToolPage({
  params,
}: {
  params: Promise<{ locale: string; item: string }>;
}) {
  const { locale, item } = await params;
  const originalItem = await getOriginalFreeToolsItem(item, locale);
  if (!originalItem) {
    setTimeout(() => {
      notFound();
    }, 2000);
  }
  if (item != originalItem) {
    let basePath = "/free-tools";
    if (locale === "es-ES") basePath = "/herramientas-gratis";
    else if (locale === "de") basePath = "/kostenlose-tools";
    else if (locale === "pt-BR") basePath = "/ferramentas-gratuitas";
    redirect(`${basePath}/${originalItem}`);
  }
  return (
    <FreeToolsProvider locale={locale} item={originalItem}>
      <FreeToolsContent />;
    </FreeToolsProvider>
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
  const allMetaData: ServiceMetadataType = await fetchServiceMetaData(item);
  if (!allMetaData) {
    return null;
  }
  const alternatesData: AlternatesDataType[] = [];
  alternatesData.push({
    locale: allMetaData.locale,
    url: generate_item_url(allMetaData.header.text),
  });
  allMetaData.localizations.map((item) =>
    alternatesData.push({
      locale: item.locale,
      url: generate_item_url(item.header.text),
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
  alternates.canonical = BASE_URL + "/services/" + canonicalItem?.url;

  // Populate languages
  const languages: { [locale: string]: string } = {}; // Create a custom object for languages
  data.forEach((item) => {
    if (item.locale == "es-ES") {
      languages[item.locale] = BASE_URL + "/es-ES/servicios/" + item?.url;
    } else if (item.locale == "de") {
      languages[item.locale] = BASE_URL + "/de/dienstleistungen/" + item?.url;
    } else if (item.locale == "pt-BR") {
      languages[item.locale] = BASE_URL + "/pt-BR/serviços/" + item?.url;
    }
  });

  alternates.languages = languages;

  return alternates;
}
