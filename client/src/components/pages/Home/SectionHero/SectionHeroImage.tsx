import Image from "next/image";
import React from "react";

const SectionHeroImage = () => {
  return (
    <div>
      {/* <Image
        width={376}
        height={296}
        loading="eager"
        alt="Social media platforms"
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e9b_hero_image-left.svg"
        className="hero_img-left"
      /> */}
      <Image
        width={1315}
        height={366}
        loading="eager"
        alt=""
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e9e_hero_img-bg.svg"
        className="hero_image-bg"
      />
      {/* <Image
        width={358}
        height={281}
        loading="eager"
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e9c_hero_image-right.svg"
        alt="Social media engagement results"
        className="hero_img-right"
      /> */}
    </div>
  );
};

export default SectionHeroImage;
