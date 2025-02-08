import Image from "next/image";
import React from "react";

const SectionLogos = () => {
  return (
    <div className="p-10 flex flex-col gap-6 items-center mb-4">
      <h1 className="text-[rgba(0,_0,_0,_0.5)] font-satoshi text-[20px] font-medium leading-[25px]">
        FEATURED IN TOP MEDIA
      </h1>
      <div className="flex gap-[52px]">
        <Image
          width={84}
          height={28}
          loading="eager"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e47_Forbes%20logo.svg"
          alt="Forbes Logo"
        />
        <Image
          width={150}
          height={28}
          loading="eager"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e4c_The%20logo.svg"
          alt="Huffpost logo"
        />
        <Image
          width={176}
          height={28}
          loading="eager"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e45_The-Miami-Herald-Logo%20logo.svg"
          alt="The Miami Herald Logo"
        />
        <Image
          width={91}
          height={28}
          loading="eager"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e4a_Business_Insider_Logo%20logo.svg"
          alt="Business Insider Logo"
        />
        <Image
          width={196}
          height={28}
          loading="eager"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e4b_Marketwatch%20logo.svg"
          alt="Marketwatch logo"
        />
        <Image
          width={97}
          height={28}
          loading="eager"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e46_hubspot%20logo.svg"
          alt="Hubspot Logo"
        />
      </div>
    </div>
  );
};

export default SectionLogos;
