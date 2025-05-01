import Image from "next/image";
import React, { memo } from "react";

const SectionHeroImage = memo(() => {
  return (
    <div className="w-full flex justify-center">
      <Image
        width={1315}
        height={366}
        loading="eager"
        alt="Hero background illustration"
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e9e_hero_img-bg.svg"
        className="w-[950px] md:w-[1300px] animate-fade-in-up mr-2"
        priority
      />
    </div>
  );
});

SectionHeroImage.displayName = "SectionHeroImage";

export default SectionHeroImage;
