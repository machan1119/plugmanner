import React, { memo } from "react";
import DropDownServices from "./DropDownServices";
import { useList } from "@/providers/ListProvider";
import { ServiceListSkeleton } from "@/components/Skeletons";
import DropDownServicesResponsive from "./DropDownServicesResponsive";

interface NavBarBottomProps {
  className?: string;
}

const NavBarBottom = memo(({ className = "" }: NavBarBottomProps) => {
  const { list, isLoading } = useList();

  if (isLoading) {
    return <ServiceListSkeleton />;
  }

  return (
    <div
      className={`
      bg-background-light 
      border-y border-black-dark 
      py-1 w-full
      transition-all duration-300
      ${className}
    `}
    >
      <div
        className="
        hidden lg:flex lg:flex-row lg:justify-between 
        justify-self-center 
        w-[90%] xl:w-[65%]
        mx-auto
        animate-fade-in
      "
      >
        {list.map((val, index) => (
          <div
            key={index}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <DropDownServices item={val} />
          </div>
        ))}
      </div>
      <div
        className="
        flex flex-col lg:hidden 
        justify-self-center 
        w-[90%] xl:w-[65%]
        mx-auto
        animate-fade-in
      "
      >
        {list.map((item, index) =>
          item.data.map((val, innerIndex) => (
            <div
              key={`${index}-${innerIndex}`}
              className="animate-fade-in"
              style={{
                animationDelay: `${
                  (index * item.data.length + innerIndex) * 100
                }ms`,
              }}
            >
              <DropDownServicesResponsive serviceData={val} />
            </div>
          ))
        )}
      </div>
    </div>
  );
});

NavBarBottom.displayName = "NavBarBottom";

export default NavBarBottom;
