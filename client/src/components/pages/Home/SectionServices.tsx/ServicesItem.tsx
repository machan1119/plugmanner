"use client";
import { ServicesDataType } from "@/libs/types/Types";
import Image from "next/image";
import React, { useState } from "react";

const ServicesItem = ({ data }: { data: ServicesDataType }) => {
  const [status, setStatus] = useState(false);

  return (
    <div className="inline-block relative bg-[rgb(246,_246,_246)] border-[1px] border-[rgb(224,_224,_224)] rounded-[12px] p-4 w-full h-max">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <Image width={20} height={20} src={data.icon} alt={data.title} />
          <span className="text-black text-[20px] font-semibold font-clash leading-[25px]">
            {data.title}
          </span>
        </div>
        <button
          onClick={() => setStatus(!status)}
          className="rounded-[4px] bg-[rgb(255,_255,_255)] border-[1px] border-[rgb(224,_224,_224)] p-2"
        >
          <Image
            width={12}
            height={8}
            fs-accordion-element="arrow"
            loading="lazy"
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
            className={`${status ? "arrow-expend" : "allow-collapse"}`}
          />
        </button>
      </div>
      <div
        className={`h-0 ${
          status ? "h-[400px]" : "h-0"
        } overflow-hidden transition-height duration-1000 ease-in-out`}
      >
        sadf
      </div>
    </div>
  );
};

export default ServicesItem;
