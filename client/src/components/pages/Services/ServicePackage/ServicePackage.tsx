import { useServices } from "@/providers/ServicesProvider";
import React from "react";
import ServicePackageItem from "./ServicePackageItem";

const ServicePackage = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction.ChoosePackage) {
    return "";
  }
  return (
    <div className="w-full py-[80px]">
      <div className="max-w-[1366px] w-full px-10 flex gap-5 justify-self-center">
        {serviceItems.introduction.ChoosePackage.package.map((item, index) => (
          <ServicePackageItem
            level={item.level}
            price={item.price}
            unit={item.unit}
            popular={item.popular}
            list={item.list}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicePackage;
