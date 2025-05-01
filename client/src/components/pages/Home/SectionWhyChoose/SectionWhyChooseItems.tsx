import { WhyChooseThisType } from "@/libs/types/Types";
import Image from "next/image";
import React, { memo } from "react";

interface SectionWhyChooseItemsProps {
  item: WhyChooseThisType;
  count: number;
}

const SectionWhyChooseItems = memo(
  ({ item, count }: SectionWhyChooseItemsProps) => {
    return (
      <div
        className={`flex ${
          count === 2 ? "" : "md:flex-col-reverse pt-4"
        } gap-4 lg:flex-row grow w-full h-full px-4 items-center bg-white border-black-dark text-black rounded-[16px] hover:shadow-lg transition-all duration-300 border border-black-dark/50`}
      >
        <div
          className={`relative max-w-[200px] ${
            count === 2 ? "w-[50%] md:w-[30%]" : "w-[50%]"
          } h-full mb-6 md:mb-0 md:mr-6`}
        >
          <Image
            width={152}
            height={166}
            src={item.icon}
            alt={`${item.title} illustration`}
            className="w-full h-full animate-fade-in"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-2 lg:w-[60%] w-full justify-between text-center md:text-left">
          <h3 className="font-clash font-semibold text-[18px] sm:text-[20px] leading-[25px] mb-1 w-full animate-fade-in">
            {item.title}
          </h3>
          <span className="text-black/50 text-[16px] leading-6 font-satoshi w-full text-center md:text-left animate-fade-in-up">
            {item.description}
          </span>
        </div>
      </div>
    );
  }
);

SectionWhyChooseItems.displayName = "SectionWhyChooseItems";

export default SectionWhyChooseItems;
