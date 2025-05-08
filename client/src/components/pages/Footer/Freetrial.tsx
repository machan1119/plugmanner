"use client";
import React, { memo, useState } from "react";
import Link from "next/link";
import { DropIcon } from "@/libs/consts/MySvg";
import { useList } from "@/providers/ListProvider";
import { useLocale, useTranslations } from "next-intl";
import { SupportedLocale } from "@/libs/types/Types";
import { generate_item_url_from_name } from "@/utils/functions";

interface FreeTrialProps {
  className?: string;
}

interface FreeTrialLink {
  label: string;
  href: string;
}

const LocaleLinks = {
  en: "free-services",
  "es-ES": "servicios-gratuitos",
  de: "kostenlose-Dienstleistungen",
  "pt-BR": "serviços-gratuitos",
};

const FreeTrial = memo(({ className = "" }: FreeTrialProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { freeServicesList } = useList();
  const locale = useLocale() as SupportedLocale;
  const t = useTranslations("Footer");

  const links: FreeTrialLink[] = freeServicesList.map((item) => {
    return {
      label: item.name,
      href:
        "/" +
        LocaleLinks[locale] +
        "/" +
        generate_item_url_from_name(item.name),
      isFree: true,
    };
  });
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={className}>
      <button
        className="
          font-clash mt-8 mb-4 
          leading-5 text-base md:text-xl 
          font-semibold 
          flex items-center gap-4
          text-white
          hover:text-primary
          transition-colors duration-300
          focus:outline-none focus:text-primary
          group
        "
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <span>{t("free_trial")}</span>
        <span
          className={`
            transition-transform duration-300 ease-in-out
            group-hover:scale-110
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          {DropIcon}
        </span>
      </button>
      <div
        id="free-trial-links"
        className={`
          flex flex-col gap-4 
          overflow-hidden 
          transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {links.map((link) => (
          <Link
            key={link.label}
            aria-label={link.label}
            href={link.href}
            className="
              text-base leading-6
              text-white/50
              hover:text-primary
              hover:underline
              transition-colors duration-300
            "
            rel="noopener noreferrer"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
});

FreeTrial.displayName = "FreeTrial";

export default FreeTrial;
