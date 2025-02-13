import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceTip = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServiceTip</div>;
};

export default ServiceTip;
