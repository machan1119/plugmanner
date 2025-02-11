import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceCustomerReview = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServiceCustomerReview</div>;
};

export default ServiceCustomerReview;
