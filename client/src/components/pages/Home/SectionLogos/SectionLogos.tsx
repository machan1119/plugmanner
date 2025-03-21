import Image from "next/image";
import React, { memo } from "react";

interface LogoData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface SectionLogosProps {
  className?: string;
}

const logosData: LogoData[] = [
  {
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e47_Forbes%20logo.svg",
    alt: "Forbes Logo",
    width: 84,
    height: 28,
  },
  {
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e4c_The%20logo.svg",
    alt: "Huffpost logo",
    width: 150,
    height: 28,
  },
  {
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e45_The-Miami-Herald-Logo%20logo.svg",
    alt: "The Miami Herald Logo",
    width: 176,
    height: 28,
  },
  {
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e4a_Business_Insider_Logo%20logo.svg",
    alt: "Business Insider Logo",
    width: 91,
    height: 28,
  },
  {
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e4b_Marketwatch%20logo.svg",
    alt: "Marketwatch logo",
    width: 196,
    height: 28,
  },
  {
    src: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e46_hubspot%20logo.svg",
    alt: "Hubspot Logo",
    width: 97,
    height: 28,
  },
];

const SectionLogos = memo(({ className = "" }: SectionLogosProps) => {
  return (
    <section
      id="services-list"
      className={`p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-6 items-center mb-4 bg-white/5 backdrop-blur-sm rounded-lg ${className}`}
    >
      <h2
        id="section-logos-title"
        className="text-[rgba(0,_0,_0,_0.5)] font-satoshi text-[20px] font-medium leading-[25px] text-center"
      >
        FEATURED IN TOP MEDIA
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 lg:gap-[52px] w-full max-w-7xl mx-auto">
        {logosData.map((logo, index) => (
          <div
            key={logo.alt}
            className="justify-self-center bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
          >
            <Image
              width={logo.width}
              height={logo.height}
              className="justify-self-center hover:opacity-80 transition-opacity duration-300"
              loading={index < 3 ? "eager" : "lazy"}
              src={logo.src}
              alt={logo.alt}
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </section>
  );
});

SectionLogos.displayName = "SectionLogos";

export default SectionLogos;
