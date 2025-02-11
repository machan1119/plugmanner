import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceBuyFeature = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServiceBuyFeature</div>;
};

export default ServiceBuyFeature;
