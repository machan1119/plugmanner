import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceHowTo = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServiceHowToOrder</div>;
};

export default ServiceHowTo;
