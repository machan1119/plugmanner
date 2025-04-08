import ServicesContent from "@/components/pages/Services/ServiceContent";
import { ServiceMetadataType } from "@/libs/types/ListTypes";
import { ServicesProvider } from "@/providers/ServicesProvider";
import { fetchServiceMetaData } from "@/utils/fetch-service-data";
import { Metadata } from "next";
import { getOriginalServiceItem } from "@/i18n/serviceItemMappings";
import { generate_item_url } from "@/utils/functions";
import { AlternateURLs } from "next/dist/lib/metadata/types/alternative-urls-types";

export default async function ServicesPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; item: string }>;
}>) {
  const { locale, item } = await params;
  const originalItem = await getOriginalServiceItem(item, locale);
  const product_schema = {
    "@context": "http://schema.org",
    "@type": "Product",
    url: "https://www.socialplug.io/es/servicios/comprar-seguidores-twitter",
    name: "Comprar seguidores Twitter (X)",
    image:
      "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67811a78b723437c08e9863a_buy-twitter-followers.png",
    description:
      "Comprar seguidores Twitter (X) de Socialplug por $0.053. Los seguidores son de calidad y se entregan en solo 2 minutos.",
    sku: "SCPX)036",
    offers: {
      "@type": "AggregateOffer",
      url: "https://www.socialplug.io/es/servicios/comprar-seguidores-twitter",
      priceCurrency: "USD",
      Price: " 0.036",
      offerCount: "200",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "47",
    },
    brand: {
      "@type": "Brand",
      name: "SocialPlug",
    },
  };
  const faq_schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Son seguidores de verdad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Se trata de seguidores de alta calidad y con perfiles realistas. Sin embargo, estos seguidores no interactuarán con tus publicaciones.",
        },
      },
      {
        "@type": "Question",
        name: "¿Es seguro?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, comprar seguidores de Twitter (X) es seguro y no afectará negativamente a tu cuenta de ninguna manera posible. Sólo asegúrate de que trabajas con una empresa confiable cada vez que compres seguidores.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo se tarda en conseguir seguidores en mi página de Twitter (X)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Procesamos los pedidos de seguidores automáticamente, lo que significa que tus seguidores empezarán a aparecer justo después de realizar el pedido. En casos excepcionales, es posible que tengamos que procesar tu pedido manualmente en un plazo de 12 horas.",
        },
      },
      {
        "@type": "Question",
        name: "Necesito más de 10.000 seguidores, ¿qué podéis ofrecerme?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Abre un ticket en el servicio de asistencia y te crearemos una factura personalizada a un precio con descuento para pedidos superiores a 10.000 seguidores.",
        },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product_schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq_schema) }}
      />
      <ServicesProvider locale={locale} item={originalItem}>
        <ServicesContent />;
      </ServicesProvider>
    </>
  );
}

type Props = {
  params: Promise<{ item: string }>;
};

interface AlternatesDataType {
  locale: string;
  url: string;
}

const BASE_URL = "https://plugmanner.com";
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
