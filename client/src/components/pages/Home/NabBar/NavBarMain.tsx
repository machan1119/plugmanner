import MainButton from "@/components/Buttons";
import SearchIcon from "@/libs/consts/MySvg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBarMain = () => {
  return (
    <div className="px-8 py-2 md:px-[5%] flex items-center w-full justify-between">
      <Image
        width="164"
        height="32"
        alt=""
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e86_navbar-logo.svg"
        className="mr-10"
      />
      <div className="flex items-center gap-2 lg:grow">
        <div className="rounded-lg gap-3 flex items-center border-[#D0D0D0] border-[1px] p-3 grow">
          {SearchIcon}
          <input
            type="text"
            className="hidden md:flex bg-transparent text-[16px] text-[#333] border-none grow"
            placeholder="Search"
          />
        </div>
        <div className="w-[1px] h-[50px] bg-[linear-gradient(315deg,_#d9d9d900,_#d9d9d9_50%,_#d9d9d91f)]" />
        <MainButton type="white-main" title="Login" />
        <MainButton type="green-main" title="All Services" />
        <div className="inline-block group w-[62px] h-[40px] bg-white relative transition-all duration-500">
          <Link
            href={"#"}
            className="w-[62px] h-[40px] gap-[1px] flex items-center px-2"
          >
            <Image
              src="https://cdn.weglot.com/flags/square/us.svg"
              width="28"
              height="21"
              alt="English flag"
              className="w-[28px] h-[21px] object-cover rounded-sm"
            />
            <Image
              width={16}
              height={16}
              alt="down"
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e87_nav_dd-icon.svg"
              className="w-4 h-4"
            />
          </Link>
          <Link
            href={"#"}
            className="absolute hidden z-10 group-hover:block bg-white transition-all duration-500 w-[62px] h-[30px] rounded-lg px-2 shadow-[-2px_8px_9px_rgba(0,0,0,0.08),_-8px_15px_16px_rgba(0,0,0,0.07),_-20px_32px_24px_rgba(0,0,0,0.04),_-36px_56px_28px_rgba(0,0,0,0.01)]"
          >
            <Image
              src="https://cdn.weglot.com/flags/square/es.svg"
              width="28"
              height="21"
              alt="Español flag"
              className="w-[28px] h-[21px] object-cover rounded-sm"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBarMain;
