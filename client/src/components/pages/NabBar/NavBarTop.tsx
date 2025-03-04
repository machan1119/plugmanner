import Image from "next/image";
import React, { memo } from "react";

interface NavBarTopItem {
  icon: string;
  text: string;
  alt: string;
}

const navBarTopItems: NavBarTopItem[] = [
  {
    icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8b_Frame%201000003820.svg",
    text: "24/7 Support",
    alt: "Support icon",
  },
  {
    icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8a_Frame%201000003819.svg",
    text: "Instant Delivery",
    alt: "Delivery icon",
  },
  {
    icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e89_Frame%201000003818.svg",
    text: "100k+ Clients",
    alt: "Clients icon",
  },
];

interface NavBarTopProps {
  className?: string;
}

const NavBarTop = memo(({ className = "" }: NavBarTopProps) => {
  return (
    <div
      className={`
        bg-black text-white
        text-xs md:text-sm
        flex relative justify-center
        overflow-hidden
        transition-colors duration-300
        ${className}
      `}
    >
      <div className="flex justify-center gap-5 md:gap-15 lg:gap-25 p-3">
        {navBarTopItems.map((item, index) => (
          <div
            key={item.text}
            className="
              flex gap-3 items-center
              transition-transform duration-300
              hover:scale-105
              animate-fade-in
            "
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Image
              width={24}
              height={24}
              alt={item.alt}
              src={item.icon}
              className="
                w-[18px] h-[18px]
                md:w-6 md:h-6
                transition-transform duration-300
                group-hover:scale-110
              "
            />
            <span className="font-medium">{item.text}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <Image
          width={125}
          height={125}
          alt=""
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8d_Group%201000004059.svg"
          className="
            hidden sm:block
            w-[8%] lg:w-[125px]
            absolute
            inset-[-20%_auto_auto_13%]
            lg:inset-[-90%_auto_auto_13%]
            transition-transform duration-500
            hover:scale-105
          "
        />
        <Image
          width={110}
          height={110}
          alt=""
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e8e_Group.svg"
          className="
            hidden sm:block
            w-[8%] lg:w-[120px]
            absolute
            inset-[10%_13%_-25%_auto]
            lg:inset-[-30%_13%_-25%_auto]
            transition-transform duration-500
            hover:scale-105
          "
        />
      </div>
    </div>
  );
});

NavBarTop.displayName = "NavBarTop";

export default NavBarTop;
