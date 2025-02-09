import { HowToOrderItemType } from "@/libs/types/Types";
import Image from "next/image";
import React from "react";

const HowToOrderItems = ({ item }: { item: HowToOrderItemType }) => {
  return (
    <div className="flex flex-col grow h-full items-center relative">
      <Image
        width={340}
        height={350}
        src={item.icon}
        alt={item.title}
        className="absolute left-[5%] top-[-20px] w-auto h-auto"
      />
      <div className="flex flex-col justify-between pt-[270px] items-center">
        <h2 className="font-h1 mb-6 text-center">{item.title}</h2>
        <span className="text-black text-[16px] text-center leading-6 font-satoshi w-[75%]">
          {item.description}
        </span>
      </div>
    </div>
  );
};

export default HowToOrderItems;
