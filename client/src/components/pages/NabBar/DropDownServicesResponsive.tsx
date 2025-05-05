"use client";

import { ServicesDataType } from "@/libs/types/ListTypes";
import { SupportedLocale } from "@/libs/types/Types";
import { useHome } from "@/providers/HomeProvider";
import { generate_item_url, replace_str } from "@/utils/functions";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useState } from "react";

const LocaleLinks = {
  en: "services",
  "es-ES": "servicios",
  de: "dienstleistungen",
  "pt-BR": "serviços",
};

interface DropDownServicesResponsiveProps {
  serviceData: ServicesDataType;
  className?: string;
}

const DropDownServicesResponsive = memo(
  ({ serviceData, className = "" }: DropDownServicesResponsiveProps) => {
    const locale = useLocale() as SupportedLocale;
    const [status, setStatus] = useState(false);
    const { setServiceShow } = useHome();

    return (
      <div
        className={`
      border-b border-black-normal
      transition-all duration-300
      ${className}
    `}
      >
        <div
          className="
          flex justify-between items-center 
          p-4 
          cursor-pointer 
          hover:bg-background-light
          transition-all duration-300
          group
        "
          onClick={() => setStatus(!status)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setStatus(!status);
            }
          }}
        >
          <div className="flex gap-3 items-center">
            <Image
              width={40}
              height={40}
              priority
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${serviceData.icon}`}
              alt={serviceData.title}
              className="
              w-8 h-8 
              opacity-80 
              group-hover:opacity-100
              transition-opacity duration-300
            "
            />
            <span
              className="
            text-base font-semibold 
            text-text-primary
            transition-colors duration-300
            group-hover:text-primary
          "
            >
              {serviceData.title}
            </span>
          </div>
          <Image
            width={16}
            height={16}
            alt="expand"
            priority
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
            className={`
            transition-transform duration-300
            ${status ? "rotate-180" : "rotate-0"}
          `}
          />
        </div>

        <div
          className="
          overflow-hidden 
          transition-all duration-300 ease-in-out
          animate-fade-in
        "
          style={{
            maxHeight: status ? "1000px" : "0",
            opacity: status ? "1" : "0",
          }}
        >
          <div className="py-2 px-4">
            {serviceData.services.map((serviceItem, index) => (
              <Link
                rel="canonical"
                key={index}
                aria-label={serviceItem.name}
                href={`/${LocaleLinks[locale]}/${generate_item_url(
                  serviceItem.header.text
                )}`}
                onClick={() => {
                  setServiceShow(true);
                  setStatus(false);
                }}
                className="
                flex items-center gap-3 
                py-2 px-4 
                w-full
                text-text-secondary
                hover:bg-background-light
                hover:text-primary
                transition-all duration-300
                group
              "
              >
                <Image
                  width={20}
                  height={20}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${serviceData.icon}`}
                  alt={serviceData.title}
                  className="
                  w-5 h-5 
                  opacity-80 
                  group-hover:opacity-100
                  transition-opacity duration-300
                "
                />
                <span className="text-[15px] font-medium">
                  {replace_str(serviceItem.name, serviceData.title)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

DropDownServicesResponsive.displayName = "DropDownServicesResponsive";

export default DropDownServicesResponsive;
