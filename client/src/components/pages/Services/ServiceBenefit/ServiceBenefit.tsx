import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceBenefit = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServiceBenefit</div>;
};

export default ServiceBenefit;
