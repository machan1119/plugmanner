"use client";
import React, { memo, useEffect, useCallback, useState } from "react";
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
import { OrderNow } from "@/components/OrderNow";
import { fetchAPI } from "@/utils/fetch-api";

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
        const path = `/subservices/${serviceItems?.documentId}`;
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
    if (serviceItems?.documentId) fetchServiceIcon();
  }, [scrollToTop, serviceItems?.documentId]);

  if (isLoading) {
    return <ServicePageSkeleton />;
  }

  if (!serviceItems?.header.text) return;
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
    { component: <SectionServices state="Services" />, id: "services" },
  ];
  const iconURL = serviceItems.icon?.url ? serviceItems.icon.url : serviceIcon;
  const url = generate_item_url(serviceItems?.header.text);
  const name = generate_name(serviceItems?.header.text);
  const price = serviceItems.introduction.OrderIntro.price;
  function get_url() {
    if (locale == "en") return `${process.env.NEXT_PUBLIC_URL}/services/${url}`;
    else if (locale == "es-ES")
      return `${process.env.NEXT_PUBLIC_URL}/es-ES/servicios/${url}`;
    else if (locale == "de")
      return `${process.env.NEXT_PUBLIC_URL}/de/dienstleistungen/${url}`;
    else if (locale == "pt-BR")
      return `${process.env.NEXT_PUBLIC_URL}/pt-BR/serviços/${url}`;
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
      price: price.toString(),
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
  if (serviceItems.introduction.FrequentlyQuestions)
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
      {serviceItems.introduction.FrequentlyQuestions && (
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
      {iconURL && (
        <OrderNow
          title={generate_name(serviceItems.header.text)}
          link={serviceItems.ordernow}
          icon={iconURL}
        />
      )}
    </>
  );
});

ServiceContent.displayName = "ServiceContent";

export default ServiceContent;
