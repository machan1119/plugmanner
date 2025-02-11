import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceVideo = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServiceVideo</div>;
};

export default ServiceVideo;
