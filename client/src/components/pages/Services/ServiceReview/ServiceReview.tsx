import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceReview = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div className=""></div>;
};

export default ServiceReview;
