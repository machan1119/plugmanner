"use client";

import React, { memo, useEffect, useState } from "react";
import DropDownServices from "./DropDownServices";
import { useList } from "@/providers/ListProvider";
import { ServiceListSkeleton } from "@/components/Skeletons";
import DropDownServicesResponsive from "./DropDownServicesResponsive";
import { useHome } from "@/providers/HomeProvider";
import DropDownTools from "./DropDownTools";
import MainButton from "@/components/Buttons";
import { useTranslations } from "next-intl";
import DropDownToolsResponsive from "./DropDownToolsResponsive";

const NavBarBottom = memo(() => {
  const { serviceShow, setServiceShow } = useHome();
  const [isMobile, setIsMobile] = useState(true);
  const { serviceList, freeToolsList, isLoading } = useList();
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    if (!serviceShow) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [serviceShow]);
  const t = useTranslations("Navbar");

  if (isLoading) {
    if (!isMobile) return <ServiceListSkeleton />;
  }

  return isMobile ? (
    isVisible && (
      <div
        className={`w-full bg-[#f5f5f5] ${
          serviceShow ? "slide-up" : "slide-down"
        }`}
      >
        <div className="flex flex-col justify-self-center w-full px-[20px] border-y border-black-dark/50 py-1.5 h-[calc(100vh-120px)] overflow-y-scroll overflow-x-hidden">
          {serviceList.data_1.map((item, index) => (
            <DropDownServicesResponsive serviceData={item} key={index} />
          ))}
          <DropDownToolsResponsive toolItems={freeToolsList} />
          <MainButton
            type="primary"
            title={t("main.all_services")}
            customChildClass="!bg-none !bg-primary px-6"
            customClass="mt-2"
            link="/services/"
            handleClick={() => setServiceShow(!serviceShow)}
          />
        </div>
      </div>
    )
  ) : (
    <div className="flex flex-row justify-between justify-self-center bg-black-light w-full xl:px-[12%] px-[5%] border-y border-black-dark/50 py-2">
      {serviceList.data_1.map((val, index) => (
        <DropDownServices item={val} key={index} />
      ))}
      <DropDownTools items={freeToolsList} />
    </div>
  );
});

NavBarBottom.displayName = "NavBarBottom";

export default NavBarBottom;
