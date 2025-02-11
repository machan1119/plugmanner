"use client";
import ServiceArticle from "@/components/pages/Services/ServiceArticle/ServiceArticle";
import ServiceBuyFeature from "@/components/pages/Services/ServiceBuyFeature/ServiceBuyFeature";
import ServiceCustomerReview from "@/components/pages/Services/ServiceCustomerReview/ServiceCustomerReview";
import ServiceFeature from "@/components/pages/Services/ServiceFeature/ServiceFeature";
import ServiceInfo from "@/components/pages/Services/ServiceInfo/ServiceInfo";
import ServiceMethod from "@/components/pages/Services/ServiceMethod/ServiceMethod";
import ServicePowerUp from "@/components/pages/Services/ServicePowerUp/ServicePowerUp";
import ServiceQuestion from "@/components/pages/Services/ServiceQuestion/ServiceQuestion";
import ServiceReview from "@/components/pages/Services/ServiceReview/ServiceReview";
import ServiceTip from "@/components/pages/Services/ServiceTip/ServiceTip";
import ServiceVideo from "@/components/pages/Services/ServiceVideo/ServiceVideo";
import ServiceHowTo from "./ServiceHowTo/ServiceHowTo";

function ServicesContent() {
  return (
    <>
      <ServiceInfo />
      <ServiceReview />
      <ServiceHowTo />
      <ServicePowerUp />
      <ServiceVideo />
      <ServiceFeature />
      <ServiceBuyFeature />
      <ServiceTip />
      <ServiceMethod />
      <ServiceCustomerReview />
      <ServiceQuestion />
      <ServiceArticle />
    </>
  );
}

export default ServicesContent;
