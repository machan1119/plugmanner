"use client";

import { ServicesDataType } from "@/libs/types/ListTypes";
import { SupportedLocale } from "@/libs/types/Types";
import { generate_item_url, replace_str } from "@/utils/functions";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, memo } from "react";

interface ServicesItemProps {
  serviceData: ServicesDataType;
}
const LocaleLinks = {
  en: "services",
  "es-ES": "servicios",
  "pt-BR": "serviços",
};
const ServicesItem = memo(({ serviceData }: ServicesItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const locale = useLocale() as SupportedLocale;
  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <div
      className="inline-block relative bg-black-light border-[1px] border-black-dark rounded-[12px] p-4 w-full h-max transition-all duration-300 hover:border-gray-300 hover:shadow-lg cursor-pointer"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleToggle}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-3 items-center">
          <Image
            width={40}
            height={40}
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${serviceData.icon}`}
            alt={`${serviceData.title} icon`}
            className="size-12 animate-fade-in"
            loading="lazy"
          />
          <span className="text-black text-[20px] font-semibold font-clash leading-[25px] animate-fade-in">
            {serviceData.title}
          </span>
        </div>
        <button className="rounded-[4px] bg-white border-[1px] border-[rgb(224,_224,_224)] h-fit p-2 transition-all duration-300 hover:bg-gray-50">
          <Image
            width={12}
            height={8}
            alt="Toggle arrow"
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
            className={`transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100 mt-5"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-2 gap-2">
            {serviceData.services.map((serviceItem, index) => (
              <Link
                className="p-2 bg-white rounded-md flex text-left text-[14px] transition-all duration-200 hover:bg-gray-50 hover:border-primary border hover:shadow-sm animate-fade-in-up"
                href={`/${LocaleLinks[locale]}/${generate_item_url(
                  serviceItem.header.text
                )}`}
                aria-label={serviceItem.name}
                key={index}
              >
                {replace_str(serviceItem.name, serviceData.title)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ServicesItem.displayName = "ServicesItem";

export default ServicesItem;
