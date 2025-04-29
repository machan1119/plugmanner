"use client";
import React, { memo, useEffect, useCallback, useState } from "react";
import { ServicePageSkeleton } from "@/components/Skeletons";
import { generate_item_url, generate_name } from "@/utils/functions";
import { useLocale } from "next-intl";
import { OrderNow } from "@/components/OrderNow";
import { fetchAPI } from "@/utils/fetch-api";
import { useFreeTools } from "@/providers/FreeToolsProvider";
import InstagramUsernameChecker from "./Instgram/InstagramUsernameChecker";
import FacebookVideoDownloader from "./OtherTools/FacebookVideoDownloader";
import InstagramCaptionGenerator from "./Instgram/InstagramCaptionGenerator";
import PinterestVideoDownloader from "./OtherTools/PinterestVideoDownloader";
import LinkedinVideoDownloader from "./OtherTools/LinkedinVideoDownloader";
import RedditVideoDownloader from "./OtherTools/RedditVideoDownloader";
import TiktokVideoDownloader from "./TitokTools/TiktokVideoDownloader";
import TwitterVideoDownloader from "./TwitterTools/TwitterVideoDownloader";
import YoutubeVideoDownloader from "./YoutubeTools/YoutubeVideoDownloader";
import HookGenerator from "./OtherTools/HookGenerator";
import TiktokCaptionGenerator from "./TitokTools/TiktokCaptionGenerator";
import TiktokTranscriptGenerator from "./TitokTools/TiktokTranscriptGenerator";
import TwitterUsernameChecker from "./TwitterTools/TwitterUsernameChecker";
import FakeTweetGenerator from "./TwitterTools/FakeTweetGenerator";
import YoutubeDescriptionGenerator from "./YoutubeTools/YoutubeDescriptionGenerator";
import YoutubeHashtagGenerator from "./YoutubeTools/YoutubeHashtagGenerator";
import YoutubeNameGenerator from "./YoutubeTools/YoutubeNameGenerator";
import YoutubeTitleGenerator from "./YoutubeTools/YoutubeTitleGenerator";

interface FreeToolsComponentType {
  component: React.ReactNode;
  id: {
    en: string;
    "es-ES": string;
    de: string;
    "pt-BR": string;
  };
}

const freeToolsComponent: FreeToolsComponentType[] = [
  {
    component: <InstagramUsernameChecker />,
    id: {
      en: "instagram-username-checker",
      "es-ES": "comprobador-de-nombre-de-usuario-de-instagram",
      de: "instagram-benutzernamen-checker",
      "pt-BR": "verificador-de-nome-de-usuário-do-instagram",
    },
  },
  {
    component: <InstagramCaptionGenerator />,
    id: {
      en: "instagram-caption-generator",
      "es-ES": "generador-de-capturas-de-instagram",
      de: "instagram-caption-generator",
      "pt-BR": "gerador-de-capturas-de-instagram",
    },
  },
  {
    component: <FacebookVideoDownloader />,
    id: {
      en: "facebook-video-downloader",
      "es-ES": "descargador-de-videos-de-facebook",
      de: "facebook-video-downloader",
      "pt-BR": "descarregador-de-vídeos-do-facebook",
    },
  },
  {
    component: <HookGenerator />,
    id: {
      en: "hook-generator",
      "es-ES": "generador-de-ganchos",
      de: "hook-generator",
      "pt-BR": "gerador-de-ganchos",
    },
  },
  {
    component: <LinkedinVideoDownloader />,
    id: {
      en: "linkedin-video-downloader",
      "es-ES": "descargador-de-videos-de-linkedin",
      de: "linkedin-video-downloader",
      "pt-BR": "descarregador-de-vídeos-do-linkedin",
    },
  },
  {
    component: <PinterestVideoDownloader />,
    id: {
      en: "pinterest-video-downloader",
      "es-ES": "descargador-de-videos-de-pinterest",
      de: "pinterest-video-downloader",
      "pt-BR": "descarregador-de-vídeos-do-pinterest",
    },
  },
  {
    component: <RedditVideoDownloader />,
    id: {
      en: "reddit-video-downloader",
      "es-ES": "descargador-de-videos-de-reddit",
      de: "reddit-video-downloader",
      "pt-BR": "descarregador-de-vídeos-do-reddit",
    },
  },
  {
    component: <TiktokVideoDownloader />,
    id: {
      en: "tiktok-video-downloader",
      "es-ES": "descargador-de-videos-de-tiktok",
      de: "tiktok-video-downloader",
      "pt-BR": "descarregador-de-vídeos-do-tiktok",
    },
  },
  {
    component: <TiktokCaptionGenerator />,
    id: {
      en: "tiktok-caption-generator",
      "es-ES": "generador-de-capturas-de-tiktok",
      de: "tiktok-caption-generator",
      "pt-BR": "gerador-de-capturas-de-tiktok",
    },
  },
  {
    component: <TiktokTranscriptGenerator />,
    id: {
      en: "tiktok-transcript-generator",
      "es-ES": "generador-de-transcripciones-de-tiktok",
      de: "tiktok-transcript-generator",
      "pt-BR": "gerador-de-transcrições-de-tiktok",
    },
  },
  {
    component: <TwitterVideoDownloader />,
    id: {
      en: "twitter-video-downloader",
      "es-ES": "descargador-de-videos-de-twitter",
      de: "twitter-video-downloader",
      "pt-BR": "descarregador-de-vídeos-do-twitter",
    },
  },
  {
    component: <FakeTweetGenerator />,
    id: {
      en: "fake-tweet-generator",
      "es-ES": "generador-de-tweets-falsos",
      de: "fake-tweet-generator",
      "pt-BR": "gerador-de-tweets-falsos",
    },
  },
  {
    component: <TwitterUsernameChecker />,
    id: {
      en: "twitter-username-checker",
      "es-ES": "comprobador-de-nombre-de-usuario-de-twitter",
      de: "twitter-benutzernamen-checker",
      "pt-BR": "verificador-de-nome-de-usuário-do-twitter",
    },
  },
  {
    component: <YoutubeVideoDownloader />,
    id: {
      en: "youtube-video-downloader",
      "es-ES": "descargador-de-videos-de-youtube",
      de: "youtube-video-downloader",
      "pt-BR": "descarregador-de-vídeos-do-youtube",
    },
  },
  {
    component: <YoutubeDescriptionGenerator />,
    id: {
      en: "youtube-description-generator",
      "es-ES": "generador-de-descripciones-de-youtube",
      de: "youtube-description-generator",
      "pt-BR": "gerador-de-descrições-do-youtube",
    },
  },
  {
    component: <YoutubeHashtagGenerator />,
    id: {
      en: "youtube-hashtag-generator",
      "es-ES": "generador-de-hashtags-de-youtube",
      de: "youtube-hashtag-generator",
      "pt-BR": "gerador-de-hashtags-do-youtube",
    },
  },
  {
    component: <YoutubeNameGenerator />,
    id: {
      en: "youtube-name-generator",
      "es-ES": "generador-de-nombres-de-youtube",
      de: "youtube-name-generator",
      "pt-BR": "gerador-de-nomes-do-youtube",
    },
  },
  {
    component: <YoutubeTitleGenerator />,
    id: {
      en: "youtube-title-generator",
      "es-ES": "generador-de-titulos-de-youtube",
      de: "youtube-title-generator",
      "pt-BR": "gerador-de-títulos-do-youtube",
    },
  },
];

interface FaqType {
  "@type": string;
  name: string;
  acceptedAnswer: {
    "@type": string;
    text: string;
  };
}

const FreeToolsContent = memo(() => {
  const { isLoading, freeToolItems } = useFreeTools();
  const [serviceIcon, setServiceIcon] = useState("");
  const locale = useLocale();
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const fetchServiceIcon = async () => {
      try {
        const path = `/free-tools/${freeToolItems?.documentId}`;
        const urlParamsObject = {
          populate: {
            service: {
              populate: {
                icon: {
                  fields: ["url"],
                },
              },
            },
          },
        };
        const options = "";
        const fetchedData = await fetchAPI(path, urlParamsObject, options);
        if (fetchedData.data)
          setServiceIcon(
            process.env.NEXT_PUBLIC_STRAPI_API_URL +
              fetchedData.data.service.icon.url
          );
      } catch (error) {
        console.error(error);
      }
    };
    scrollToTop();
    if (freeToolItems?.documentId) fetchServiceIcon();
  }, [scrollToTop, freeToolItems?.documentId]);

  if (isLoading) {
    return <ServicePageSkeleton />;
  }

  if (!freeToolItems?.header.text) return;

  const iconURL = freeToolItems.icon?.url
    ? freeToolItems.icon.url
    : serviceIcon;
  const url = generate_item_url(freeToolItems?.header.text);
  const name = generate_name(freeToolItems?.header.text);
  const price = freeToolItems.introduction.OrderIntro.price;
  function get_url() {
    if (locale == "en")
      return `${process.env.NEXT_PUBLIC_URL}/free-tools/${url}`;
    else if (locale == "es-ES")
      return `${process.env.NEXT_PUBLIC_URL}/es-ES/herramientas-gratis/${url}`;
    else if (locale == "de")
      return `${process.env.NEXT_PUBLIC_URL}/de/kostenlose-tools/${url}`;
    else if (locale == "pt-BR")
      return `${process.env.NEXT_PUBLIC_URL}/pt-BR/ferramentas-gratuitas/${url}`;
  }

  const currentComponent = freeToolsComponent.find(
    (section) => section.id[locale as keyof typeof section.id] === url
  );
  const product_schema = {
    "@context": "http://schema.org",
    "@type": "Product",
    url: get_url(),
    name: name,
    image: freeToolItems.seo.openGraph.ogimage,
    description: freeToolItems.seo.metaDescription,
    sku: "SCP" + name.slice(-2).toUpperCase() + price.toString().slice(-3),
    offers: {
      "@type": "AggregateOffer",
      url: get_url(),
      priceCurrency: "USD",
      Price: price.toString(),
      offerCount: "200",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: freeToolItems.introduction.rated.toString(),
      ratingCount: (
        (freeToolItems.introduction.CustomerReviews?.Review.length | 0) +
        (freeToolItems.introduction.TopReviews?.review.length | 0)
      ).toString(),
    },
    brand: {
      "@type": "Brand",
      name: "SocialPlug",
    },
  };
  const faq: FaqType[] = [];
  if (freeToolItems.introduction.FrequentlyQuestions)
    freeToolItems.introduction.FrequentlyQuestions.Question.map((item) =>
      faq.push({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })
    );
  const faq_schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product_schema) }}
      />
      {freeToolItems.introduction.FrequentlyQuestions && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq_schema) }}
        />
      )}
      <main className="flex flex-col animate-fade-in">
        {currentComponent?.component}
      </main>
      {iconURL && (
        <OrderNow
          title={generate_name(freeToolItems.header.text)}
          link={freeToolItems.ordernow}
          icon={iconURL}
        />
      )}
    </>
  );
});

FreeToolsContent.displayName = "FreeToolsContent";

export default FreeToolsContent;
