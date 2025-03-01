import React from "react";
import DropDownServices from "./DropDownServices";
import { useList } from "@/providers/ListProvider";
import { ServiceListSkeleton } from "@/components/Skeletons";
import DropDownServicesResponsive from "./DropDownServicesResponsive";

const NavBarBottom = () => {
  const { list, isLoading } = useList();
  if (isLoading) {
    return <ServiceListSkeleton />;
  }
  return (
    <div className="bg-black-light border-y border-black-dark py-1 w-full">
      <div className="hidden lg:flex lg:flex-row lg:justify-between justify-self-center w-[90%] xl:w-[65%]">
        {list.map((val, index) => (
          <DropDownServices key={index} item={val} />
        ))}
      </div>
      <div className="flex flex-col lg:hidden justify-self-center w-[90%] xl:w-[65%]">
        {list.map((item, index) =>
          item.data.map((val, innerIndex) => (
            <DropDownServicesResponsive
              serviceData={val}
              key={`${index}-${innerIndex}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NavBarBottom;
