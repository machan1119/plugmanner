"use client";
import React, { memo, useEffect, useCallback } from "react";
import ServiceArticle from "@/components/pages/Services/ServiceArticle/ServiceArticle";
import ServiceCustomerReview from "@/components/pages/Services/ServiceCustomerReview/ServiceCustomerReview";
import ServiceInfo from "@/components/pages/Services/ServiceInfo/ServiceInfo";
import ServiceQuestion from "@/components/pages/Services/ServiceQuestion/ServiceQuestion";
import ServiceReview from "@/components/pages/Services/ServiceReview/ServiceReview";
import ServiceHowTo from "./ServiceHowTo/ServiceHowTo";
import ServiceBenefit from "./ServiceBenefit/ServiceBenefit";
import SectionServices from "../Home/SectionServices.tsx/SectionServices";
import ServiceSummary from "./ServiceSummary/ServiceSummary";
import ServiceUpBlogs from "./ServiceUpBlogs/ServiceUpBlogs";
import ServiceVideo from "./ServiceVideo/ServiceVideo";
import { useServices } from "@/providers/ServicesProvider";
import { ServicePageSkeleton } from "@/components/Skeletons";
import ServiceDownBlogs from "./ServiceDownBlogs/ServiceDownBlogs";
import ServiceGoodPoints from "./ServiceGoodPoints/ServiceGoodPoints";
import ServicePackage from "./ServicePackage/ServicePackage";
import ServiceSummary2 from "./ServiceSummary2/ServiceSummary2";
import { generate_item_url, generate_name } from "@/utils/functions";
import { useLocale } from "next-intl";

interface ServiceSection {
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

const ServiceContent = memo(() => {
  const { isLoading, serviceItems } = useServices();
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

  const sections: ServiceSection[] = [
    { component: <ServiceInfo />, id: "info" },
    { component: <ServiceReview />, id: "review" },
    { component: <ServiceHowTo />, id: "how-to" },
    { component: <ServiceSummary />, id: "summary" },
    { component: <ServiceVideo />, id: "video" },
    { component: <ServiceUpBlogs />, id: "up-blogs" },
    { component: <ServiceBenefit />, id: "benefit" },
    { component: <ServiceSummary2 />, id: "summary-2" },
    { component: <ServiceDownBlogs />, id: "down-blogs" },
    { component: <ServicePackage />, id: "package" },
    { component: <ServiceGoodPoints />, id: "good-points" },
    { component: <ServiceCustomerReview />, id: "customer-review" },
    { component: <ServiceQuestion />, id: "question" },
    { component: <ServiceArticle />, id: "article" },
    { component: <SectionServices />, id: "services" },
  ];
  if (!serviceItems?.header.text) return;
  const url = generate_item_url(serviceItems?.header.text);
  const name = generate_name(serviceItems?.header.text);
  const price = serviceItems.introduction.OrderIntro.price;
  function get_url() {
    if (locale == "en") return `https://plugmanner.com/services/${url}`;
    else if (locale == "es-ES")
      return `https://plugmanner.com/es-ES/servicios/${url}`;
    else if (locale == "de")
      return `https://plugmanner.com/de/dienstleistungen/${url}`;
    else if (locale == "pt-BR")
      return `https://plugmanner.com/pt-BR/serviços/${url}`;
  }
  const product_schema = {
    "@context": "http://schema.org",
    "@type": "Product",
    url: get_url(),
    name: name,
    image: serviceItems.seo.openGraph.ogimage,
    description: serviceItems.seo.metaDescription,
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
      ratingValue: serviceItems.introduction.rated.toString(),
      ratingCount: (
        (serviceItems.introduction.CustomerReviews?.Review.length | 0) +
        (serviceItems.introduction.TopReviews?.review.length | 0)
      ).toString(),
    },
    brand: {
      "@type": "Brand",
      name: "SocialPlug",
    },
  };
  const faq: FaqType[] = [];
  serviceItems.introduction.FrequentlyQuestions.Question.map((item) =>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq_schema) }}
      />
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

ServiceContent.displayName = "ServiceContent";

export default ServiceContent;
