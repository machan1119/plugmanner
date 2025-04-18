"use client";
import Image from "next/image";
import MainButton from "./Buttons";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface OrderNowProps {
  title: string;
  link: string;
  icon: string;
}
export function OrderNow({ title, link, icon }: OrderNowProps) {
  const t = useTranslations("ServiceItem");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    show && (
      <div className="w-[50%] flex md:bg-white border-black-light border-[2px] z-[50] rounded-lg md:p-3 justify-between bottom-0 left-[50%] fixed -translate-x-1/2 -translate-y-1/2">
        <div className="hidden md:flex gap-2">
          <Image
            src={icon}
            alt={title}
            width={50}
            height={50}
            className="w-[50px] h-[50px]"
          />
          <div>
            <p className="font-clash text-[18px] text-black font-semibold text-left">
              {title}
            </p>
            <p className="text-[#686889] text-[16px] font-satoshi text-left">
              {t("OrderNowFix")}
            </p>
          </div>
        </div>
        <MainButton
          type="primary"
          title={`${t("OrderNow")} >`}
          customClass="w-full md:w-max border-none"
          link={link}
        />
      </div>
    )
  );
}
