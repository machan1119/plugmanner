import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServicePackage = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) return "";
  return (
    <div className="w-full py-[80px]">
      <div className="max-w-[1366px] justify-self-center px-10">

      </div>
    </div>
  );
};

export default ServicePackage;
