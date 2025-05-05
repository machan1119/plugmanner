"use client";
import React, { memo, useEffect, useCallback } from "react";
import { ServicePageSkeleton } from "@/components/Skeletons";
// import { generate_item_url_from_name } from "@/utils/functions";
// import { useLocale } from "next-intl";
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

interface FreeToolsSection {
  component: React.ReactNode;
  id: string;
}

// interface FaqType {
//   "@type": string;
//   name: string;
//   acceptedAnswer: {
//     "@type": string;
//     text: string;
//   };
// }

const FreeServicesContent = memo(() => {
  const { isLoading, freeServiceItem } = useFreeServices();
  // const locale = useLocale();
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

  // const url = generate_item_url_from_name(freeServiceItem?.name);
  // function get_url() {
  //   if (locale == "en")
  //     return `${process.env.NEXT_PUBLIC_URL}/free-tools/${url}`;
  //   else if (locale == "es-ES")
  //     return `${process.env.NEXT_PUBLIC_URL}/es-ES/herramientas-gratis/${url}`;
  //   else if (locale == "de")
  //     return `${process.env.NEXT_PUBLIC_URL}/de/kostenlose-tools/${url}`;
  //   else if (locale == "pt-BR")
  //     return `${process.env.NEXT_PUBLIC_URL}/pt-BR/ferramentas-gratuitas/${url}`;
  // }

  // const product_schema = {
  //   "@context": "http://schema.org",
  //   "@type": "Product",
  //   url: get_url(),
  //   name: freeToolItems?.name,
  //   image: freeToolItems.seo.openGraph.ogimage,
  //   description: freeToolItems.seo.metaDescription,
  //   sku: "SCP" + freeToolItems?.name.slice(-2).toUpperCase(),
  //   offers: {
  //     "@type": "AggregateOffer",
  //     url: get_url(),
  //     priceCurrency: "USD",
  //     offerCount: "200",
  //   },
  //   aggregateRating: {
  //     "@type": "AggregateRating",
  //     ratingValue: freeToolItems.introduction.rated.toString(),
  //     ratingCount: (
  //       (freeToolItems.introduction.CustomerReviews?.Review.length | 0) +
  //       (freeToolItems.introduction.TopReviews?.review.length | 0)
  //     ).toString(),
  //   },
  //   brand: {
  //     "@type": "Brand",
  //     name: "SocialPlug",
  //   },
  // };
  // const faq: FaqType[] = [];
  // if (freeToolItems.FAQ)
  //   freeToolItems.FAQ.Question.map((item) =>
  //     faq.push({
  //       "@type": "Question",
  //       name: item.question,
  //       acceptedAnswer: {
  //         "@type": "Answer",
  //         text: item.answer,
  //       },
  //     })
  //   );
  // const faq_schema = {
  //   "@context": "https://schema.org",
  //   "@type": "FAQPage",
  //   mainEntity: faq,
  // };
  const sections: FreeToolsSection[] = [
    { component: <FreeServicesHero />, id: "hero" },
    { component: <FreeServicesTopReview />, id: "top-review" },
    { component: <FreeServicesRelatedServices />, id: "related-services" },
    { component: <FreeServicesHowTo />, id: "how-to" },
    { component: <FreeServicesSummary />, id: "summary" },
    { component: <FreeServicesBlogs />, id: "up-blogs" },
    { component: <FreeServicesBenefit />, id: "benefit" },
    { component: <FreeServicesCustomerReview />, id: "customer-review" },
    { component: <FreeServicesQuestion />, id: "question" },
    { component: <SectionServices state="Services" />, id: "services" },
  ];
  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product_schema) }}
      />
      {freeToolItems.FAQ && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq_schema) }}
        />
      )} */}
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
