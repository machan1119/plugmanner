import { OurPartnersItems } from "@/libs/data/OurPatnersItems";
import React from "react";
import OurPartnersItem from "./OurPartnersItem";
const OurPartners = () => {
  return (
    <div className="flex flex-col p-[5%] items-center bg-black-medium w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden">
      <div className="mb-12 flex flex-col gap-3 items-center">
        <div className="font-h1">
          Our <span className="text-green-light">Partners</span>
        </div>
        <span className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi w-full">
          We team up with the best in the business.
        </span>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {OurPartnersItems.map((item, index) => (
          <OurPartnersItem item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default OurPartners;
