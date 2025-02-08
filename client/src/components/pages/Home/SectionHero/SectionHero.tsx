import Image from "next/image";
import React from "react";
import Status from "./Status";
import MainButton from "@/components/Buttons";
import SectionHeroImage from "./SectionHeroImage";

const SectionHero = () => {
  return (
    <div className="flex flex-col gap-2 px-10 pt-5 items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden">
      <div className="flex flex-col gap-6 items-center">
        <div className="bg-[] flex items-center gap-2 text-[16px] font-medium p-[2px] pr-3 text-black bg-black-light border-white border-2 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <span className="bg-black rounded-full text-[rgb(239,255,248)] font-clash px-2 py-[6px] text-[16px] font-semibold">
            Rated 4.8/5
          </span>
          <span>from over 100K+ customers</span>
        </div>
        <div className="flex flex-col gap-4 font-satoshi text-black items-center">
          <h1 className="font-clash text-[48px] font-semibold leading-[60x] w-[80%] text-center">
            <span>Buy Followers, Likes </span>
            <Image
              width={46}
              height={46}
              alt="Thumbs up emoji Socialplug"
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e3c_hero_thumb-img.svg"
              loading="eager"
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
          <div className="text-black text-[18px] leading-[27px] font-medium text-center max-w-[480px] font-satoshi">
            Helping brands and influencers build social proof through innovative
            social media services
          </div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex gap-[6px] items-center">
            <Image
              loading="lazy"
              width={20}
              height={20}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e3e_UsersFour.svg"
              alt="users icon"
            />
            <span className="text-black font-satoshi text-[14px] font-medium">
              1.5B+ People Reached
            </span>
          </div>
          <div className="bg-[rgb(224_224_224)] w-[1px] h-6" />
          <Status />
          <div className="bg-[rgb(224_224_224)] w-[1px] h-6" />
          <div className="flex gap-[6px] items-center">
            <Image
              loading="lazy"
              width={20}
              height={20}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e3f_Cursor.svg"
              alt="users icon"
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
