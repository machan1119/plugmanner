"use client";
import { FreeToolsListType } from "@/libs/types/ListTypes";
import { SupportedLocale } from "@/libs/types/Types";
import { useHome } from "@/providers/HomeProvider";
import { generate_item_url_from_name } from "@/utils/functions";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useState } from "react";

const LocaleLinks = {
  en: "services",
  "es-ES": "servicios",
  "pt-BR": "serviços",
};

interface DropDownToolsResponsiveProps {
  toolItems: FreeToolsListType[];
}

const DropDownToolsResponsive = memo(
  ({ toolItems }: DropDownToolsResponsiveProps) => {
    const locale = useLocale() as SupportedLocale;
    const [states, setStates] = useState(false);
    const { setServiceShow } = useHome();
    if (toolItems.length == 0) return;
    return (
      <div className="border-b border-black-normal transition-all duration-300">
        <div
          className="flex justify-between items-center py-4 cursor-pointer hover:bg-background-light transition-all duration-300 group"
          onClick={() => setStates(!states)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setStates(!states);
            }
          }}
        >
          <div className="flex gap-3 items-center">
            <Image
              width={40}
              height={40}
              priority
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675855229d03d72bd75b6b4f_codesandbox.svg"
              alt="Other tools"
              className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="text-base font-semibold text-text-primary transition-colors duration-300 group-hover:text-primary">
              Tools
            </span>
          </div>
          <Image
            width={16}
            height={16}
            alt="expand"
            priority
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
            className={`
            transition-transform duration-300
            ${states ? "rotate-180" : "rotate-0"}
          `}
          />
        </div>
        <div
          className="
          overflow-hidden 
          transition-all duration-300 ease-in-out
          animate-fade-in
        "
          style={{
            maxHeight: states ? "1000px" : "0",
            opacity: states ? "1" : "0",
          }}
        >
          <div className="py-2 px-4">
            {toolItems.map((tool, index) => (
              <Link
                rel="canonical"
                key={index}
                aria-label={tool.name}
                href={`/${LocaleLinks[locale]}/${generate_item_url_from_name(
                  tool.name
                )}`}
                onClick={() => {
                  setServiceShow(true);
                  setStates(false);
                }}
                className="flex items-center gap-3 py-2 w-full font-normal text-text-secondary hover:bg-background-light hover:text-primary transition-all duration-300 group"
              >
                <Image
                  width={20}
                  height={20}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${tool.icon}`}
                  alt={tool.name}
                  className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="text-[15px] font-satoshi font-medium text-black hover:text-primary">
                  {tool.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

DropDownToolsResponsive.displayName = "DropDownToolsResponsive";

export default DropDownToolsResponsive;
