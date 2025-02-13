"use client";
import ServiceArticle from "@/components/pages/Services/ServiceArticle/ServiceArticle";
import ServiceCustomerReview from "@/components/pages/Services/ServiceCustomerReview/ServiceCustomerReview";
import ServiceInfo from "@/components/pages/Services/ServiceInfo/ServiceInfo";
import ServiceMethod from "@/components/pages/Services/ServiceMethod/ServiceMethod";
import ServicePowerUp from "@/components/pages/Services/ServicePowerUp/ServicePowerUp";
import ServiceQuestion from "@/components/pages/Services/ServiceQuestion/ServiceQuestion";
import ServiceReview from "@/components/pages/Services/ServiceReview/ServiceReview";
import ServiceTip from "@/components/pages/Services/ServiceTip/ServiceTip";
import ServiceVideo from "@/components/pages/Services/ServiceVideo/ServiceVideo";
import ServiceHowTo from "./ServiceHowTo/ServiceHowTo";
import ServiceWhyBuyThis from "./ServiceWhyBuyThis/ServiceWhyBuyThis";
import ServiceBenefit from "./ServiceBenefit/ServiceBenefit";
import SectionServices from "../Home/SectionServices.tsx/SectionServices";

function ServicesContent() {
  return (
    <>
      <ServiceInfo />
      <ServiceReview />
      <ServiceHowTo />
      <ServiceWhyBuyThis />
      <ServiceBenefit />
      {/* <ServicePowerUp /> */}
      {/* <ServiceVideo /> */}
      {/* <ServiceTip /> */}
      <ServiceMethod />
      <ServiceCustomerReview />
      <ServiceQuestion />
      <ServiceArticle />
      <SectionServices />
    </>
  );
}

export default ServicesContent;
