import { WhyChooseThisType } from "@/libs/types/Types";
import Image from "next/image";
import React, { memo } from "react";

interface SectionWhyChooseItemsProps {
  item: WhyChooseThisType;
}

const SectionWhyChooseItems = memo(({ item }: SectionWhyChooseItemsProps) => {
  return (
    <div className="flex flex-col md:flex-row grow w-full h-full p-4 sm:p-6 items-center bg-white border-black-dark text-black rounded-[16px] hover:shadow-lg transition-all duration-300 border border-black-dark/50">
      <div className="relative max-w-[200px] w-[40%] h-full mb-6 md:mb-0 md:mr-6">
        <Image
          width={152}
          height={166}
          src={item.icon}
          alt={`${item.title} illustration`}
          className="w-full h-full animate-fade-in"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col w-[60%] justify-between text-center md:text-left">
        <h3 className="font-clash font-semibold text-[18px] sm:text-[20px] leading-[25px] mb-4 sm:mb-6 w-full animate-fade-in">
          {item.title}
        </h3>
        <span className="text-black-dark text-[14px] sm:text-[16px] leading-6 font-satoshi w-full text-center md:text-left animate-fade-in-up">
          {item.description}
        </span>
      </div>
    </div>
  );
});

SectionWhyChooseItems.displayName = "SectionWhyChooseItems";

export default SectionWhyChooseItems;
