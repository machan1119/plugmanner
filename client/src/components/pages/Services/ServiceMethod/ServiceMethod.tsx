import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceMethod = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServiceMethod</div>;
};

export default ServiceMethod;
