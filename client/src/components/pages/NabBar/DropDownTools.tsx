"use client";
import { generate_item_url_from_name } from "@/utils/functions";
import { FreeToolsListType } from "@/libs/types/ListTypes";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useCallback, useState } from "react";
import { useLocale } from "next-intl";
import { SupportedLocale } from "@/libs/types/Types";

const LocaleLinks = {
  en: "free-tools",
  "es-ES": "herramientas-gratis",
  "pt-BR": "ferramentas-gratuitas",
};

const ToolsItem = memo(({ item }: { item: FreeToolsListType }) => {
  const locale = useLocale() as SupportedLocale;
  return (
    <Link
      rel="canonical"
      href={`/${LocaleLinks[locale]}/${generate_item_url_from_name(item.name)}`}
      className="
      flex items-center gap-2 
      py-2 px-4 
      w-full
      text-text-primary 
      hover:bg-background-light
      hover:text-primary
      transition-all duration-300
      group
    "
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.icon}`}
        width={20}
        height={20}
        alt={item.name}
        className="
        w-5 h-5 
        opacity-80 
        group-hover:opacity-100
        transition-opacity duration-300
      "
      />

      <span className="text-[14px] font-normal">{item.name}</span>
    </Link>
  );
});

ToolsItem.displayName = "ToolsItem";

const DropDownTools = memo(({ items }: { items: FreeToolsListType[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  if (items.length == 0) return;
  return (
    <div
      className={`
      inline-block group relative
    `}
    >
      <div
        className="
          flex gap-1 items-center 
          cursor-pointer 
          py-4 
          font-normal text-base 
          font-satoshi
          transition-colors duration-300
          hover:text-primary
        "
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <p>Tools</p>
        <Image
          width={16}
          height={16}
          priority
          className="
            w-auto h-auto
            transition-transform duration-300
            group-hover:rotate-180
          "
          alt="down"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e87_nav_dd-icon.svg"
        />
      </div>
      <div
        className={`
          absolute 
          ${isOpen ? "block" : "hidden"}
          group-hover:block 
          bg-white 
          rounded-lg 
          shadow-soft
          animate-fade-in right-0
          w-max
        `}
      >
        <div
          className="
            max-h-[70vh] 
            max-w-[50vw] 
            overflow-auto 
            p-1
            w-full
          "
        >
          <div className="text-base font-semibold font-clash text-text-primary w-max text-wrap px-4 py-2 transition-colors duration-300">
            Free Tools
          </div>
          <div className="w-full h-px bg-black-normal" />
          {items.map((item, index) => (
            <ToolsItem item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
});

DropDownTools.displayName = "DropDownTools";

export default DropDownTools;
