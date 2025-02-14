import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceTip = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) return "";
  return <div>ServiceTip</div>;
};

export default ServiceTip;
