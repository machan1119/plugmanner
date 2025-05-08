"use client";
import React, { memo, useState, useEffect } from "react";
import { DropIcon } from "@/libs/consts/MySvg";
import Link from "next/link";
import { generate_item_url } from "@/utils/functions";
import { useList } from "@/providers/ListProvider";
import { useLocale, useTranslations } from "next-intl";
import { SupportedLocale } from "@/libs/types/Types";

const LocaleLinks = {
  en: "services",
  "es-ES": "servicios",
  de: "dienstleistungen",
  "pt-BR": "serviços",
};

const SellingService = memo(() => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { serviceList } = useList();
  const locale = useLocale() as SupportedLocale;
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const t = useTranslations("Footer");
  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isMobile && (e.key === "Enter" || e.key === " ")) {
      setIsOpen(!isOpen);
    }
  };
  return (
    <div className="min-w-[260px] pt-4 border-t border-white/10 sm:border-none sm:pt-0 transition-all duration-300">
      <button
        className="font-clash leading-5 text-base md:text-xl font-semibold flex items-center gap-4 text-white hover:text-primary transition-colors duration-300 focus:outline-none focus:text-primary group mb-4 md:mb-8"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span>{t("best_selling")}</span>
        <span
          className={`
            lg:hidden
            transition-transform duration-300 ease-in-out
            group-hover:scale-110
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          {DropIcon}
        </span>
      </button>
      <div
        className={`
          flex flex-col gap-4 
          overflow-hidden 
          transition-all duration-300 ease-in-out
          lg:max-h-[600px]
          ${isOpen ? "max-h-[660px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <Link
          className="text-base leading-6 text-white/50 hover:text-primary hover:underline transition-colors duration-300"
          href={`/${LocaleLinks[locale]}`}
        >
          {t("all_services")}
        </Link>
        {serviceList.data_3.map(
          (subservice) =>
            subservice.recommend && (
              <Link
                className="text-base leading-6 text-white/50 hover:text-primary hover:underline transition-colors duration-300"
                href={`/${LocaleLinks[locale]}/${generate_item_url(
                  subservice.header.text
                )}`}
                aria-label={subservice.name}
                key={subservice.id}
              >
                {subservice.name}
              </Link>
            )
        )}
      </div>
    </div>
  );
});

SellingService.displayName = "SellingService";

export default SellingService;
