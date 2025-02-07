import Image from "next/image";
import React from "react";

const SectionHero = () => {
  return (
    <div className="flex flex-col gap-2 px-10 pt-5 items-center bg-[#f6f6f6] w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden">
      <div className="flex flex-col gap-6 items-center">
        <div className="bg-[#f6f6f6] flex items-center gap-2 text-[16px] font-medium p-[2px] pr-3 text-black bg-[rgb(246, 246, 246)] border-white border-2 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <span className="bg-black rounded-full text-[rgb(239,255,248)] font-['Clashdisplay-Variable'] px-2 py-[6px] text-[16px] font-semibold">
            Rated 4.8/5
          </span>
          <span>from over 100K+ customers</span>
        </div>
        <div className="flex flex-col gap-4 font-['Satoshi-Variable'] text-black items-center">
          <h1 className="font-['Clashdisplay-Variable'] text-[48px] font-semibold leading-[60x] w-[80%] text-center">
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
            <span className="text-[rgb(1_197_115)]">Grow Exponentially </span>
            <Image
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/676522ff439c1d92501b3b6e_Graph%20PNG-p-500.png"
              alt="uptrend chart emoji"
              loading="eager"
              width={500}
              height={500}
              className="inline-block w-[50px] h-[50px]"
            />
          </h1>
          <div className="text-black text-[18px] leading-[27px] font-medium text-center max-w-[480px] font-['Satoshi-Variable']">
            Helping brands and influencers build social proof through innovative
            social media services
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default SectionHero;
