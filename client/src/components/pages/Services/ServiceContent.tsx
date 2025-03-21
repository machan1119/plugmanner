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

interface ServiceContentProps {
  className?: string;
}

interface ServiceSection {
  component: React.ReactNode;
  id: string;
}

const ServiceContent = memo(({ className = "" }: ServiceContentProps) => {
  const { isLoading } = useServices();

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

  return (
    <main
      className={`
        flex flex-col
        animate-fade-in
        ${className}
      `}
    >
      {sections.map((section) => (
        <div key={section.id} className="animate-fade-in" id={section.id}>
          {section.component}
        </div>
      ))}
    </main>
  );
});

ServiceContent.displayName = "ServiceContent";

export default ServiceContent;
