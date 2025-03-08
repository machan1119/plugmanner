import React, { memo } from "react";
import { HowTo } from "@/libs/data/HowToOrder";
import HowToOrderItems from "./HowToOrderItems";
import Image from "next/image";

interface HowToOrderProps {
  className?: string;
}

const HowToOrder = memo(({ className = "" }: HowToOrderProps) => {
  return (
    <section
      className={`flex flex-col py-12 md:py-16 lg:py-[80px] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden ${className}`}
      aria-labelledby="section-how-to-order-title"
    >
      <div className="mb-12 flex flex-col gap-3 items-center">
        <h2
          id="section-how-to-order-title"
          className="font-h1-md lg:font-h1-lg animate-fade-in"
        >
          How to <span className="text-green-light">Order?</span>
        </h2>
        <p className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
          Here&apos;s a quick rundown of how you can place an order for our
          social media services.
        </p>
      </div>
      <div
        className="w-full max-w-7xl mx-auto relative"
        role="list"
        aria-label="Order steps"
      >
        <Image
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e65_how-to-order_desktop-line-bg.svg"
          alt="Order steps"
          width={100}
          height={100}
          className="absolute top-[10%] left-[20%] w-[60%] hidden xl:block"
        />
        <div className="grid md:[&>*:nth-child(3)]:col-span-2 xl:[&>*:nth-child(3)]:col-span-1 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-[5%] items-center w-full">
          {HowTo.map((item, index) => (
            <HowToOrderItems
            item={item}
            key={item.title}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

HowToOrder.displayName = "HowToOrder";

export default HowToOrder;
