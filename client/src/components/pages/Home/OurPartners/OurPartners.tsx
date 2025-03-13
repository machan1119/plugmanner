import { OurPartnersItems } from "@/libs/data/OurPatnersItems";
import React, { memo } from "react";
import OurPartnersItem from "./OurPartnersItem";

interface OurPartnersProps {
  className?: string;
}

const OurPartners = memo(({ className = "" }: OurPartnersProps) => {
  return (
    <section
      className={`flex flex-col py-12 md:py-16 lg:py-[80px] items-center bg-black-medium w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden ${className}`}
    >
      <div className="mb-12 flex flex-col gap-3 items-center">
        <h2 id="section-partners-title" className="font-h1 animate-fade-in">
          Our <span className="text-primary">Partners</span>
        </h2>
        <p className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
          We team up with the best in the business.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl mx-auto">
        {OurPartnersItems.map((item, index) => (
          <OurPartnersItem
            item={item}
            key={item.alt}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    </section>
  );
});

OurPartners.displayName = "OurPartners";

export default OurPartners;
