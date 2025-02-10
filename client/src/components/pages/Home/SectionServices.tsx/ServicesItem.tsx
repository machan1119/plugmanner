"use client";

import { ServicesDataType } from "@/libs/types/DataTypes";
import Image from "next/image";
import React, { useState } from "react";

const ServicesItem = ({ serviceData }: { serviceData: ServicesDataType }) => {
  const [status, setStatus] = useState(false);

  return (
    <div className="inline-block relative bg-black-light border-[1px] border-black-dark rounded-[12px] p-4 w-full h-max">
      <div className="flex justify-between items-center mb">
        <div className="flex gap-3 items-center">
          <Image
            width={40}
            height={40}
            src={`${process.env.BACKEND_IP}${serviceData.icon}`}
            alt={serviceData.title}
            className="lg:size-10 size-8"
          />
          <span className="text-black text-[16px] lg:text-[20px] font-semibold font-clash leading-[25px]">
            {serviceData.title}
          </span>
        </div>
        <button
          onClick={() => setStatus(!status)}
          className="rounded-[4px] bg-[rgb(255,_255,_255)] border-[1px] border-[rgb(224,_224,_224)] h-fit p-2"
        >
          <Image
            width={12}
            height={8}
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
            className={`${status ? "arrow-expend" : "allow-collapse"}`}
          />
        </button>
      </div>
      <div
        className={`max-h-0 ${
          status ? "max-h-[1400px]" : "max-h-0"
        } overflow-hidden transition-height duration-1000 ease-in-out`}
      >
        <div className="mt-5" />
        <div className="grid grid-cols-2 gap-2">
          {serviceData.services.map((serviceItem, index) => (
            <div
              className="p-2 bg-white rounded-md flex items-center justify-center text-center"
              key={index}
            >
              {serviceItem}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesItem;
