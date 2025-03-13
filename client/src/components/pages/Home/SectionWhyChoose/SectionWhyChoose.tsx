import { WhyChooseThis } from "@/libs/data/WhyChooseThis";
import React, { memo } from "react";
import SectionWhyChooseItems from "./SectionWhyChooseItems";

interface SectionWhyChooseProps {
  className?: string;
}

const SectionWhyChoose = memo(({ className = "" }: SectionWhyChooseProps) => {
  return (
    <section
      className={`flex flex-col py-12 md:py-16 lg:py-[80px] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden border-black-dark border-t-[1px] border-b-[1px] ${className}`}
    >
      <div className="max-w-[1366px] justify-self-center px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-3 items-center">
          <h2 className="font-h1 animate-fade-in">
            Why Choose <span className="text-primary">Social</span>Plug?
          </h2>
          <span className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
            Our approach focuses on boosting engagement, increasing visibility,
            and driving results across every platform.
          </span>
        </div>
        <div className="flex flex-col lg:grid lg:[&>*:nth-child(3)]:col-span-2 2xl:[&>*:nth-child(3)]:col-span-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center">
          {WhyChooseThis.map((item, index) => (
            <SectionWhyChooseItems
              item={item}
              key={index}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

SectionWhyChoose.displayName = "SectionWhyChoose";

export default SectionWhyChoose;
