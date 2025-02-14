import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServicePowerUp = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) return "";
  return <div>ServicePowerUp</div>;
};

export default ServicePowerUp;
