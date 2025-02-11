import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServicePowerUp = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.info) return <div className="">no data</div>;
  return <div>ServicePowerUp</div>;
};

export default ServicePowerUp;
