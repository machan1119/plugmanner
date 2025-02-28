"use client";

import { ServicesDataType } from "@/libs/types/ListTypes";
import { useHome } from "@/providers/HomeProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const DropDownServicesResponsive = ({
  serviceData,
}: {
  serviceData: ServicesDataType;
}) => {
  const [status, setStatus] = useState(false);
  const { setServiceShow } = useHome();

  return (
    <div className="inline-block relative bg-black-light border-b-[1px] border-black-dark p-4 w-full h-max">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setStatus(!status)}
      >
        <div className="flex gap-3 items-center">
          <Image
            width={40}
            height={40}
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${serviceData.icon}`}
            alt={serviceData.title}
            className="lg:size-10 size-8"
          />
          <span className="text-black text-[16px] font-semibold font-clash leading-[25px]">
            {serviceData.title}
          </span>
        </div>
        <Image
          width={12}
          height={8}
          alt=""
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
          className={`${status ? "arrow-expend" : "allow-collapse"}`}
        />
      </div>
      <div
        className={`max-h-0 ${
          status ? "max-h-[1400px]" : "max-h-0"
        } overflow-hidden transition-height duration-1000 ease-in-out pl-3`}
      >
        {serviceData.services.map((serviceItem, index) => (
          <Link
            className="p-2 rounded-md flex gap-5"
            href={`/home/services/${serviceItem.id}`}
            onClick={() => {
              setServiceShow(true);
              setStatus(false);
            }}
            key={index}
          >
            <Image
              width={40}
              height={40}
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${serviceData.icon}`}
              alt={serviceData.title}
              className="size-6"
            />
            {serviceItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropDownServicesResponsive;
