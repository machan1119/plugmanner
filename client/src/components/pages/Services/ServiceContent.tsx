"use client";
import ServiceArticle from "@/components/pages/Services/ServiceArticle/ServiceArticle";
import ServiceCustomerReview from "@/components/pages/Services/ServiceCustomerReview/ServiceCustomerReview";
import ServiceInfo from "@/components/pages/Services/ServiceInfo/ServiceInfo";
// import ServicePowerUp from "@/components/pages/Services/ServicePowerUp/ServicePowerUp";
import ServiceQuestion from "@/components/pages/Services/ServiceQuestion/ServiceQuestion";
import ServiceReview from "@/components/pages/Services/ServiceReview/ServiceReview";
// import ServiceTip from "@/components/pages/Services/ServiceTip/ServiceTip";
// import ServiceVideo from "@/components/pages/Services/ServiceVideo/ServiceVideo";
import ServiceHowTo from "./ServiceHowTo/ServiceHowTo";
import ServiceBenefit from "./ServiceBenefit/ServiceBenefit";
import SectionServices from "../Home/SectionServices.tsx/SectionServices";
import ServiceSummary from "./ServiceSummary/ServiceSummary";
import ServiceUpBlogs from "./ServiceUpBlogs/ServiceUpBlogs";
import ServiceVideo from "./ServiceVideo/ServiceVideo";
import { useServices } from "@/providers/ServicesProvider";
import { ServicePageSkeleton } from "@/components/Skeletons";
import ServiceDownBlogs from "./ServiceDownBlogs/ServiceDownBlogs";
// import ServicePackage from "./ServicePackage/ServicePackage";

function ServicesContent() {
  const { isLoading } = useServices();
  if (isLoading) return <ServicePageSkeleton />;
  return (
    <>
      <ServiceInfo />
      <ServiceReview />
      <ServiceHowTo />
      <ServiceSummary />
      <ServiceVideo />
      <ServiceUpBlogs />
      <ServiceBenefit />
      <ServiceDownBlogs />
      {/* <ServicePackage /> */}
      <ServiceCustomerReview />
      <ServiceQuestion />
      <ServiceArticle />
      <SectionServices />
    </>
  );
}

export default ServicesContent;
