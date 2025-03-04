import { WhyChooseThisType } from "@/libs/types/Types";
import Image from "next/image";
import React, { memo } from "react";

interface SectionWhyChooseItemsProps {
  item: WhyChooseThisType;
  className?: string;
  style?: React.CSSProperties;
}

const SectionWhyChooseItems = memo(
  ({ item, className = "", style }: SectionWhyChooseItemsProps) => {
    return (
      <div
        className={`flex flex-col md:flex-row grow h-full p-4 sm:p-6 items-center bg-white border-black-dark text-black rounded-[16px] hover:shadow-lg transition-all duration-300 ${className}`}
        style={style}
        role="listitem"
        aria-label={`${item.title} feature`}
      >
        <div className="relative w-[152px] h-[166px] mb-6 md:mb-0 md:mr-6">
          <Image
            width={152}
            height={166}
            src={item.icon}
            alt={`${item.title} illustration`}
            className="object-contain w-full h-full animate-fade-in"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-between text-center md:text-left">
          <h3 className="font-clash font-semibold text-[18px] sm:text-[20px] leading-[25px] mb-4 sm:mb-6 w-full animate-fade-in">
            {item.title}
          </h3>
          <span className="text-black-dark text-[14px] sm:text-[16px] leading-6 font-satoshi w-full text-center md:text-left animate-fade-in-up">
            {item.description}
          </span>
        </div>
      </div>
    );
  }
);

SectionWhyChooseItems.displayName = "SectionWhyChooseItems";

export default SectionWhyChooseItems;
