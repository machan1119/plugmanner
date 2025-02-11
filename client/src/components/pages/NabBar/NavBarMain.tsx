"use client";
import MainButton from "@/components/Buttons";
import { CloseIcon, SearchIcon } from "@/libs/consts/MySvg";
import { useHome } from "@/providers/HomeProvider";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const NavBarMain = () => {
  const [searchShow, setSearchShow] = useState(false);
  const { serviceShow, setServiceShow } = useHome();
  return (
    <div className="border-b-[1px] border-black-light">
      <div className="px-8 py-2 md:px-[15%] flex items-center w-full justify-between bg-white">
        <Link href={"/"}>
          <Image
            width={164}
            height={32}
            alt="logo"
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e86_navbar-logo.svg"
            className="w-[123px] h-[24px] md:w-[164px] md:h-[32px] mr-10"
          />
        </Link>
        <div className="flex items-center gap-2 lg:grow">
          <div className="rounded-lg gap-3 flex items-center border-[#D0D0D0] border-[1px] p-3 grow bg-black-light">
            <div className="lg:flex hidden">{SearchIcon}</div>
            <button
              onClick={() => setSearchShow(!searchShow)}
              className="lg:hidden"
            >
              {SearchIcon}
            </button>
            <input
              type="text"
              className="hidden lg:flex bg-transparent text-[16px] text-[#333] border-none grow"
              placeholder="Search"
            />
          </div>
          <div className="w-[1px] h-[50px] bg-[linear-gradient(315deg,_#d9d9d900,_#d9d9d9_50%,_#d9d9d91f)]" />
          <MainButton type="white-main" title="Login" />
          <div className="lg:block hidden">
            <MainButton type="green-main" title="All Services" />
          </div>
          <div className="inline-block group w-[62px] h-[40px] bg-white relative transition-all duration-500">
            <Link
              href={"#"}
              className="w-[62px] h-[40px] gap-[1px] flex items-center px-2"
            >
              <Image
                src="https://cdn.weglot.com/flags/square/us.svg"
                width={28}
                height={21}
                alt="English flag"
                className="object-cover rounded-sm w-[28px] h-[21px]"
              />
              <Image
                width={16}
                height={16}
                alt="down"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e87_nav_dd-icon.svg"
              />
            </Link>
            <Link
              href={"#"}
              className="absolute hidden z-10 group-hover:block bg-white transition-all duration-500 w-[62px] h-[30px] rounded-lg px-2 shadow-[-2px_8px_9px_rgba(0,0,0,0.08),_-8px_15px_16px_rgba(0,0,0,0.07),_-20px_32px_24px_rgba(0,0,0,0.04),_-36px_56px_28px_rgba(0,0,0,0.01)]"
            >
              <Image
                src="https://cdn.weglot.com/flags/square/es.svg"
                width={28}
                height={21}
                alt="Español flag"
                className="object-cover rounded-sm w-[28px] h-[21px]"
              />
            </Link>
          </div>
          <button
            onClick={() => setServiceShow(!serviceShow)}
            className="lg:hidden rounded-lg gap-3 flex items-center border-[#D0D0D0] border-[1px] p-3 fit"
          >
            <Image
              width={19}
              height={15}
              loading="lazy"
              alt=""
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e9a_nav-ham-icon.svg"
            />
          </button>
        </div>
      </div>
      <div
        className={`${
          searchShow ? "block" : "hidden"
        } rounded-lg gap-3 flex items-center border-[#D0D0D0] bg-black-light border-[1px] mb-2 mx-10 p-3`}
      >
        {SearchIcon}
        <input
          type="text"
          className="lg:hidden bg-transparent text-[16px] text-[#333] border-none grow"
          placeholder="Search"
        />
        <button onClick={() => setSearchShow(false)}>{CloseIcon}</button>
      </div>
    </div>
  );
};

export default NavBarMain;
