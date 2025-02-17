import React from "react";
import DropDownServices from "./DropDownServices";
import { useList } from "@/providers/ListProvider";
import { ServiceListSkeleton } from "@/components/Skeletons";

const NavBarBottom = () => {
  const { list, isLoading } = useList();
  if (isLoading) {
    return <ServiceListSkeleton />;
  }
  return (
    <div className="bg-black-light border-y border-black-dark py-1 w-full">
      <div className="flex flex-col lg:flex-row lg:justify-between justify-self-center w-[90%] xl:w-[65%]">
        {list.map((val, index) => (
          <DropDownServices key={index} item={val} />
        ))}
      </div>
    </div>
  );
};

export default NavBarBottom;
