"use client";

import { ServicesDataType } from "@/libs/types/ListTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback } from "react";

const ServicesItem = ({ serviceData }: { serviceData: ServicesDataType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className="inline-block relative bg-black-light border-[1px] border-black-dark rounded-[12px] p-4 w-full h-max transition-all duration-300 hover:border-gray-600"
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      aria-label={`${serviceData.title} services section`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleToggle();
        }
      }}
      onClick={handleToggle}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Image
            width={40}
            height={40}
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${serviceData.icon}`}
            alt={`${serviceData.title} icon`}
            className="lg:size-10 size-8"
            loading="lazy"
          />
          <span className="text-black text-[16px] lg:text-[20px] font-semibold font-clash leading-[25px]">
            {serviceData.title}
          </span>
        </div>
        <button
          className="rounded-[4px] bg-white border-[1px] border-[rgb(224,_224,_224)] h-fit p-2 transition-all duration-300 hover:bg-gray-50"
          aria-label={isExpanded ? "Collapse services" : "Expand services"}
        >
          <Image
            width={12}
            height={8}
            alt=""
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
                className="p-2 bg-white rounded-md flex items-center justify-center text-center transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
                href={`/home/services/${serviceItem.id}`}
                key={`${serviceData.title}-${index}`}
              >
                {serviceItem.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServicesItem);
