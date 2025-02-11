import Image from "next/image";
import React from "react";
import Status from "./Status";
import MainButton from "@/components/Buttons";
import SectionHeroImage from "./SectionHeroImage";

const SectionHero = () => {
  return (
    <div className="flex flex-col gap-2 px-10 pt-5 items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex items-center gap-2 p-[2px] pr-3 bg-black-light border-white border-2 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <span className="bg-black rounded-full text-[rgb(239,255,248)] font-clash px-2 py-[6px] text-[12px] lg:text-[16px] font-semibold">
            Rated 4.8/5
          </span>
          <span className="text-[12px] sm:text-[16px] font-medium text-black">
            from over 100K+ customers
          </span>
        </div>
        <div className="flex flex-col gap-4 font-satoshi text-black items-center">
          <h1 className="font-h-main md:font-h-md lg:font-h-lg lg:w-[70%]">
            <span>Buy Followers, Likes </span>
            <Image
              width={46}
              height={46}
              alt="Thumbs up emoji Socialplug"
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e3c_hero_thumb-img.svg"
              loading="eager"
              style={{
                width: "auto",
                height: "auto",
              }}
              className="inline-block animated-image"
            />
            <span> , Subsoribers, Views & </span>
            <span className="text-green-light">Grow Exponentially </span>
            <Image
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/676522ff439c1d92501b3b6e_Graph%20PNG-p-500.png"
              alt="uptrend chart emoji"
              loading="eager"
              width={500}
              height={500}
              className="inline-block w-[50px] h-[50px]"
            />
          </h1>
          <div className="text-black text-[14px] md:text-[18px] leading-[27px] font-medium text-center w-[80%] lg:w-[50%] font-satoshi">
            Helping brands and influencers build social proof through innovative
            social media services
          </div>
        </div>
        <div className="grid grid-cols-auto-2 lg:grid-cols-auto-3 gap-6 items-center">
          <div className="flex gap-[6px] order-2 lg:order-1 items-center justify-center text-center">
            <Image
              width={20}
              height={20}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e3e_UsersFour.svg"
              alt="users icon"
              className="w-auto h-auto"
            />
            <span className="text-black font-satoshi text-[14px] font-medium">
              1.5B+ People Reached
            </span>
          </div>
          <div className="order-1 lg:order-2 col-span-2 lg:col-span-1 flex h-fit items-center gap-5">
            <div className="hidden lg:block bg-black-dark w-[1px] h-10" />
            <Status />
            <div className="hidden lg:block bg-black-dark w-[1px] h-10" />
          </div>
          <div className="flex order-3 gap-[6px] items-center justify-center text-center">
            <Image
              width={20}
              height={20}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e3f_Cursor.svg"
              alt="users icon"
              className="w-auto h-auto"
            />
            <span className="text-black font-satoshi text-[14px] font-medium">
              5M+ Monthly Clicks
            </span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <MainButton type="green-main" title="View All Services" />
          <MainButton type="white-main" title="Client Portal" />
        </div>
      </div>
      <SectionHeroImage />
    </div>
  );
};

export default SectionHero;
