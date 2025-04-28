import Image from "next/image";
import React, { memo } from "react";
import { useTranslations } from "next-intl";
interface NavBarTopItem {
  icon: string;
  text: string;
  alt: string;
}

const NavBarTop = memo(() => {
  const t = useTranslations("Navbar");
  const navBarTopItems: NavBarTopItem[] = [
    {
      icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8b_Frame%201000003820.svg",
      text: t("top.0.title"),
      alt: t("top.0.alt"),
    },
    {
      icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8a_Frame%201000003819.svg",
      text: t("top.1.title"),
      alt: t("top.1.alt"),
    },
    {
      icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e89_Frame%201000003818.svg",
      text: t("top.2.title"),
      alt: t("top.2.alt"),
    },
  ];
  return (
    <div className="bg-black text-white text-xs md:text-sm flex relative justify-center overflow-hidden">
      <div className="flex justify-center gap-4 md:gap-14 lg:gap-24 py-1">
        {navBarTopItems.map((item, index) => (
          <div key={index} className="flex gap-2 items-center p-2">
            <Image
              width={24}
              height={24}
              alt={item.alt}
              src={item.icon}
              priority
              className="w-[18px] h-[18px] md:w-6 md:h-6"
            />
            <span className="font-normal">{item.text}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <Image
          width={120}
          height={120}
          alt=""
          priority
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8d_Group%201000004059.svg"
          className="
            hidden sm:block
            w-[8%] lg:w-[120px]
            absolute
            inset-[-20%_auto_auto_8.5%]
            lg:inset-[-60%_auto_auto_8.5%]
            transition-transform duration-500
            hover:scale-105
          "
        />
        <Image
          width={110}
          height={110}
          alt=""
          priority
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8e_Group.svg"
          className="
            hidden sm:block
            w-[8%] lg:w-[110px]
            absolute
            inset-[10%_9%_-25%_auto]
            lg:inset-[-23%_9%_-25%_auto]
          "
        />
      </div>
    </div>
  );
});

NavBarTop.displayName = "NavBarTop";

export default NavBarTop;
