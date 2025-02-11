import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceQuestion = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServiceQuestion</div>;
};

export default ServiceQuestion;
