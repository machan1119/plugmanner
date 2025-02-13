import React from "react";
import DropDownServices from "./DropDownServices";
import { useData } from "@/providers/DataProvider";
import { ServiceListSkeleton } from "@/components/Skeletons";

const NavBarBottom = () => {
  const { data, isLoading } = useData();
  if (isLoading) {
    return <ServiceListSkeleton />;
  }
  return (
    <div className="bg-black-light border-y border-black-dark py-1 w-full">
      <div className="flex flex-col lg:flex-row lg:justify-between justify-self-center w-[65%]">
        {data.map((val, index) => (
          <DropDownServices key={index} item={val} />
        ))}
      </div>
    </div>
  );
};

export default NavBarBottom;
