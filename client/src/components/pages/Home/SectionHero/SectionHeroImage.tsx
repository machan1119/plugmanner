import Image from "next/image";
import React from "react";

const SectionHeroImage = () => {
  return (
    <div>
      <Image
        width={1315}
        height={366}
        loading="eager"
        alt=""
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e9e_hero_img-bg.svg"
        className="w-auto h-auto"
      />
    </div>
  );
};

export default SectionHeroImage;
