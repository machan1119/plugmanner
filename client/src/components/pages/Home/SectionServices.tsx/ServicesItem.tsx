"use client";

import { ServicesDataType } from "@/libs/types/ListTypes";
import { generate_slug } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useCallback, memo } from "react";

interface ServicesItemProps {
  serviceData: ServicesDataType;
  className?: string;
  style?: React.CSSProperties;
}

const ServicesItem = memo(
  ({ serviceData, className = "", style }: ServicesItemProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

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
        className={`inline-block relative bg-black-light border-[1px] border-black-dark rounded-[12px] p-4 w-full h-max transition-all duration-300 hover:border-gray-600 hover:shadow-lg ${className}`}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleToggle}
        style={style}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Image
              width={40}
              height={40}
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${serviceData.icon}`}
              alt={`${serviceData.title} icon`}
              className="lg:size-10 size-8 animate-fade-in"
              loading="lazy"
            />
            <span className="text-black text-[16px] lg:text-[20px] font-semibold font-clash leading-[25px] animate-fade-in">
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
                  className="p-2 bg-white rounded-md flex items-center justify-center text-center transition-all duration-200 hover:bg-gray-50 hover:shadow-sm animate-fade-in-up"
                  href={`/services/${generate_slug(serviceItem.name)}`}
                  key={`${serviceData.title}-${index}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {serviceItem.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ServicesItem.displayName = "ServicesItem";

export default ServicesItem;
