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
  delay: number;
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
    { component: <ServiceInfo />, delay: 100, id: "service-info" },
    { component: <ServiceReview />, delay: 200, id: "service-review" },
    { component: <ServiceHowTo />, delay: 300, id: "service-how-to" },
    { component: <ServiceSummary />, delay: 400, id: "service-summary" },
    { component: <ServiceVideo />, delay: 500, id: "service-video" },
    { component: <ServiceUpBlogs />, delay: 600, id: "service-up-blogs" },
    { component: <ServiceBenefit />, delay: 700, id: "service-benefit" },
    { component: <ServiceSummary2 />, delay: 800, id: "service-summary-2" },
    { component: <ServiceDownBlogs />, delay: 900, id: "service-down-blogs" },
    { component: <ServicePackage />, delay: 1000, id: "service-package" },
    {
      component: <ServiceGoodPoints />,
      delay: 1100,
      id: "service-good-points",
    },
    {
      component: <ServiceCustomerReview />,
      delay: 1200,
      id: "service-customer-review",
    },
    { component: <ServiceQuestion />, delay: 1300, id: "service-question" },
    { component: <ServiceArticle />, delay: 1400, id: "service-article" },
    { component: <SectionServices />, delay: 1500, id: "section-services" },
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
        <div
          key={section.id}
          className="animate-fade-in"
          style={{ animationDelay: `${section.delay}ms` }}
          id={section.id}
        >
          {section.component}
        </div>
      ))}
    </main>
  );
});

ServiceContent.displayName = "ServiceContent";

export default ServiceContent;
