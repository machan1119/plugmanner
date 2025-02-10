import { WhyChooseThis } from "@/libs/data/WhyChooseThis";
import React from "react";
import SectionWhyChooseItems from "./SectionWhyChooseItems";

const SectionWhyChoose = () => {
  return (
    <div className="flex flex-col p-[5%] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden border-black-dark border-t-[1px] border-b-[1px]">
      <div className="mb-12 flex flex-col gap-3 items-center">
        <div className="font-h1-md lg:font-h1-lg">
          Why Choose <span className="text-green-light">Social</span>Plug?
        </div>
        <span className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi w-[75%]">
          Our approach focuses on boosting engagement, increasing visibility,
          and driving results across every platform.
        </span>
      </div>
      <div className="flex flex-col md:grid [&>*:nth-child(3)]:col-span-2 xl:[&>*:nth-child(3)]:col-span-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-center">
        {WhyChooseThis.map((item, index) => (
          <SectionWhyChooseItems item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SectionWhyChoose;
