import { HowToOrderItemType } from "@/libs/types/Types";
import Image from "next/image";
import React, { memo } from "react";

interface HowToOrderItemsProps {
  item: HowToOrderItemType;
  count: number;
}

const HowToOrderItems = memo(({ item, count }: HowToOrderItemsProps) => {
  return (
    <div className="flex flex-col grow h-full items-center relative bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 focus-within:ring-2">
      <div className="relative w-full max-w-[250px] aspect-[285/265] mb-6">
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
      <div className="flex flex-col gap-6 justify-between items-center">
        <div className="text-[#01c573] bg-black rounded-lg flex justify-center items-center w-8 h-8 font-clash text-xl font-semibold leading-[1.25]">
          {count + 1}
        </div>
        <h3 className="font-h1 text-center animate-fade-in">{item.title}</h3>
        <p className="text-black text-[16px] text-center leading-6 font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
          {item.description}
        </p>
      </div>
    </div>
  );
});

HowToOrderItems.displayName = "HowToOrderItems";

export default HowToOrderItems;
