import React, { memo, useEffect, useState } from "react";
import DropDownServices from "./DropDownServices";
import { useList } from "@/providers/ListProvider";
import { ServiceListSkeleton } from "@/components/Skeletons";
import DropDownServicesResponsive from "./DropDownServicesResponsive";
import { useHome } from "@/providers/HomeProvider";

const NavBarBottom = memo(() => {
  const { serviceShow } = useHome();
  const { list, isLoading } = useList();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth > 1024) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return <ServiceListSkeleton />;
  }

  return (
    serviceShow &&
    (isMobile ? (
      <div
        className="
        flex flex-col
        justify-self-center 
        w-full px-[20px]
        border-y border-black-dark/50 
        py-1.5
        h-[100vh] overflow-scroll
      "
      >
        {list.map((item, index) =>
          item.data.map((val, innerIndex) => (
            <DropDownServicesResponsive
              serviceData={val}
              key={`${index}-${innerIndex}`}
            />
          ))
        )}
      </div>
    ) : (
      <div
        className="
        flex flex-row justify-between 
        justify-self-center 
        w-full 2xl:px-[15%] xl:px-[10%] px-[5%]
        border-y border-black-dark/50 
        py-1.5
      "
      >
        {list.map((val, index) => (
          <DropDownServices item={val} key={index} />
        ))}
      </div>
    ))
  );
});

NavBarBottom.displayName = "NavBarBottom";

export default NavBarBottom;
