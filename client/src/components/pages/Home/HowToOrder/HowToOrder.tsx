import React from "react";
import { HowTo } from "@/libs/data/HowToOrder";
import HowToOrderItems from "./HowToOrderItems";
const HowToOrder = () => {
  return (
    <div className="flex flex-col p-[5%] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden">
      <div className="mb-12 flex flex-col gap-3 items-center">
        <div className="font-h1-md lg:font-h1-lg">
          How to <span className="text-green-light">Order?</span>
        </div>
        <span className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi w-[75%]">
          Here’s a quick rundown of how you can place an order for our social
          media services.
        </span>
      </div>
      <div className="grid md:[&>*:nth-child(3)]:col-span-2 xl:[&>*:nth-child(3)]:col-span-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[5%] items-center xl:bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e65_how-to-order_desktop-line-bg.svg')] bg-[length:60%] bg-top bg-no-repeat">
        {HowTo.map((item, index) => (
          <HowToOrderItems item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default HowToOrder;
