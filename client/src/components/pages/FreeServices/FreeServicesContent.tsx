"use client";
import React, { memo, useEffect, useCallback } from "react";
import { ServicePageSkeleton } from "@/components/Skeletons";
import { generate_item_url_from_name } from "@/utils/functions";
import { useLocale } from "next-intl";
import { useFreeServices } from "@/providers/FreeServicesProvider";
import SectionServices from "../Home/SectionServices.tsx/SectionServices";
import FreeServicesHero from "./FreeServicesSections/FreeServicesHero";
import FreeServicesRelatedServices from "./FreeServicesSections/FreeServicesRelatedServices";
import FreeServicesHowTo from "./FreeServicesSections/FreeServicesHowTo";
import FreeServicesSummary from "./FreeServicesSections/FreeServicesSummary";
import FreeServicesBenefit from "./FreeServicesSections/FreeServicesBenefit";
import FreeServicesQuestion from "./FreeServicesSections/FreeServicesQuestion";
import FreeServicesBlogs from "./FreeServicesSections/FreeServicesBlogs";
import FreeServicesTopReview from "./FreeServicesSections/FreeServicesTopReview";
import FreeServicesCustomerReview from "./FreeServicesSections/FreeServicesCustomerReview";

interface FreeServicesSection {
  component: React.ReactNode;
  id: string;
}

interface FaqType {
  "@type": string;
  name: string;
  acceptedAnswer: {
    "@type": string;
    text: string;
  };
}

const FreeServicesContent = memo(() => {
  const { isLoading, freeServiceItem } = useFreeServices();
  const locale = useLocale();
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [scrollToTop]);

  if (isLoading) {
    return <ServicePageSkeleton />;
  }
  if (!freeServiceItem?.name) return;
  const url = generate_item_url_from_name(freeServiceItem?.name);
  function get_url() {
    if (locale == "en")
      return `${process.env.NEXT_PUBLIC_URL}/free-services/${url}`;
    else if (locale == "es-ES")
      return `${process.env.NEXT_PUBLIC_URL}/es-ES/servicios-gratuitos/${url}`;
    else if (locale == "de")
      return `${process.env.NEXT_PUBLIC_URL}/de/kostenlose-Dienstleistungen/${url}`;
    else if (locale == "pt-BR")
      return `${process.env.NEXT_PUBLIC_URL}/pt-BR/serviços-gratuitos/${url}`;
  }
  const product_schema = {
    "@context": "http://schema.org",
    "@type": "Product",
    url: get_url(),
    name: freeServiceItem?.name,
    image: freeServiceItem.seo.openGraph.ogimage,
    description: freeServiceItem.seo.metaDescription,
    sku: "SCP" + freeServiceItem?.name.slice(-2).toUpperCase(),
    offers: {
      "@type": "AggregateOffer",
      url: get_url(),
      priceCurrency: "USD",
      offerCount: "200",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: freeServiceItem.top_reviews.rate.toString(),
      ratingCount: (
        (freeServiceItem.customer_reviews?.Review.length | 0) +
        (freeServiceItem.top_reviews?.review.length | 0)
      ).toString(),
    },
    brand: {
      "@type": "Brand",
      name: "SocialPlug",
    },
  };
  const faq: FaqType[] = [];
  if (freeServiceItem.FAQ)
    freeServiceItem.FAQ.Question.map((item) =>
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
  const sections: FreeServicesSection[] = [
    { component: <FreeServicesHero />, id: "hero" },
    { component: <FreeServicesRelatedServices />, id: "related-services" },
    { component: <FreeServicesTopReview />, id: "top-review" },
    { component: <FreeServicesHowTo />, id: "how-to" },
    { component: <FreeServicesSummary />, id: "summary" },
    { component: <FreeServicesBenefit />, id: "benefit" },
    { component: <FreeServicesCustomerReview />, id: "customer-review" },
    { component: <FreeServicesBlogs />, id: "blogs" },
    { component: <FreeServicesQuestion />, id: "question" },
    { component: <SectionServices state="Services" />, id: "services" },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product_schema) }}
      />
      {freeServiceItem.FAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq_schema) }}
        />
      )}
      <main className="flex flex-col animate-fade-in">
        {sections.map((section) => (
          <div key={section.id} className="animate-fade-in" id={section.id}>
            {section.component}
          </div>
        ))}
      </main>
    </>
  );
});

FreeServicesContent.displayName = "FreeServicesContent";

export default FreeServicesContent;
