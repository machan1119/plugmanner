import { HowToOrderItemType } from "@/libs/types/Types";
import Image from "next/image";
import React, { memo } from "react";

interface HowToOrderItemsProps {
  item: HowToOrderItemType;
  className?: string;
  style?: React.CSSProperties;
}

const HowToOrderItems = memo(
  ({ item, className = "", style }: HowToOrderItemsProps) => {
    return (
      <div
        className={`flex flex-col grow h-full items-center relative bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 focus-within:ring-2 focus-within:ring-green-light focus-within:outline-none ${className}`}
        role="listitem"
        style={style}
      >
        <div className="relative w-full aspect-[285/265] mb-6">
          <Image
            width={285}
            height={265}
            src={item.icon}
            alt={`${item.title} illustration`}
            className="object-contain w-full h-full animate-fade-in"
            loading="lazy"
            priority={false}
          />
        </div>
        <div className="flex flex-col justify-between items-center">
          <h3 className="font-h1-main md:font-h1-md lg:font-h1-lg mb-6 text-center animate-fade-in">
            {item.title}
          </h3>
          <p className="text-black text-[16px] text-center leading-6 font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
            {item.description}
          </p>
        </div>
      </div>
    );
  }
);

HowToOrderItems.displayName = "HowToOrderItems";

export default HowToOrderItems;
