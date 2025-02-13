import { WhyChooseThisType } from "@/libs/types/Types";
import Image from "next/image";
import React from "react";

const SectionWhyChooseItems = ({ item }: { item: WhyChooseThisType }) => {
  return (
    <div className="flex flex-col md:flex-row grow h-full p-4 items-center bg-white border-black-dark text-black rounded-[16px]">
      <Image
        width={152}
        height={166}
        src={item.icon}
        alt={item.title}
        style={{
          width: "auto",
          height: "auto",
        }}
      />
      <div className="flex flex-col justify-between text-center md:text-left">
        <h2 className="font-clash font-semibold text-[20px] leading-[25px] mb-6 w-full">
          {item.title}
        </h2>
        <span className="text-black-dark text-[16px] leading-6 font-satoshi w-full text-center md:text-left">
          {item.description}
        </span>
      </div>
    </div>
  );
};

export default SectionWhyChooseItems;
