import Image from "next/image";
import React from "react";

const NavBarTop = () => {
  return (
    <div className="bg-black text-white text-[10px] md:text-[14px] flex relative justify-center overflow-hidden px-[10%]">
      <div className="flex justify-center gap-[20px] lg:gap-[100px] md:gap-[60px] p-3">
        <div className="flex gap-3 items-center">
          <Image
            width={24}
            height={24}
            alt="nav-bar chat icon"
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8b_Frame%201000003820.svg"
            className="md:w-[24px] md:h-[24px] h-[18px] w-[18px]"
          />
          <span>24/7 Support</span>
        </div>
        <div className="flex gap-3 items-center">
          <Image
            width={24}
            height={24}
            alt="nav-bar chat icon"
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8a_Frame%201000003819.svg"
            className="md:w-[24px] md:h-[24px] h-[18px] w-[18px]"
          />
          <span>Instant Delivery</span>
        </div>
        <div className="flex gap-3 items-center">
          <Image
            width={24}
            height={24}
            alt="nav-bar chat icon"
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e89_Frame%201000003818.svg"
            className="md:w-[24px] md:h-[24px] h-[18px] w-[18px]"
          />
          <span>100k+ Clients</span>
        </div>
      </div>
      <Image
        width={125}
        height={125}
        alt=""
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8d_Group%201000004059.svg"
        className="hidden sm:flex w-[8%] absolute inset-[-20%_auto_auto_10%] lg:inset-[-90%_auto_auto_10%] lg:w-[125px]"
      />
      <Image
        width={110}
        height={110}
        alt=""
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8e_Group.svg"
        className="hidden sm:flex w-[8%] absolute inset-[10%_10%_-25%_auto] lg:inset-[-30%_10%_-25%_auto] lg:w-[120px]"
      />
    </div>
  );
};

export default NavBarTop;
