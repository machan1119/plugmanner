import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceArticle = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServiceArticle</div>;
};

export default ServiceArticle;
