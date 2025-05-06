"use client";
import React, { memo, useState, useEffect } from "react";
import { DropIcon } from "@/libs/consts/MySvg";
import Link from "next/link";
import { useLocale } from "next-intl";
import { SupportedLocale } from "@/libs/types/Types";
import { useList } from "@/providers/ListProvider";
import { generate_item_url_from_name } from "@/utils/functions";

interface FreeToolProps {
  className?: string;
}

interface ToolLink {
  label: string;
  href: string;
  isFree?: boolean;
}

const quickLinks: ToolLink[] = [
  {
    label: "Contact Us",
    href: "https://panel.socialplug.io/contact/helpdesk?_gl=1*1ai26oe*_ga*MTM5OTE1MzUyOS4xNzM4OTI3NTYx*_ga_2W3R0LJ26C*MTczODk1Nzg4OC4zLjAuMTczODk1Nzg4OC4wLjAuMA..",
  },
  {
    label: "Affiliate Program",
    href: "https://www.socialplug.io/affiliate-program",
  },
  { label: "Blog", href: "https://www.socialplug.io/blog" },
  { label: "About Us", href: "https://www.socialplug.io/about-us" },
  {
    label: "Privacy Policy",
    href: "https://www.socialplug.io/terms-of-services-privacy-policy",
  },
  {
    label: "Terms & Conditions",
    href: "https://www.socialplug.io/terms-of-services-privacy-policy",
  },
];

interface SectionProps {
  title: string;
  links: ToolLink[];
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Section = memo(
  ({ title, links, isOpen, onToggle, className = "", style }: SectionProps) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        onToggle();
      }
    };

    return (
      <div className={className} style={style}>
        <button
          className="
          font-clash mb-4 
          leading-5 text-base md:text-xl 
          font-semibold 
          flex items-center gap-4
          text-white
          hover:text-primary
          transition-colors duration-300
          focus:outline-none focus:text-primary
          group
          lg:mb-4
        "
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <span>{title}</span>
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
          lg:max-h-[200px]
          ${isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              aria-label={link.label}
              href={link.href}
              className="text-base leading-6 text-white/50 hover:text-primary hover:underline transition-colors duration-300 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{link.label}</span>
              {link.isFree && (
                <span
                  className="
                bg-primary
                rounded-full
                text-black
                px-2 py-0.5
                text-xs
                font-medium
                transition-colors duration-300
                group-hover:bg-secondary
              "
                >
                  FREE
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    );
  }
);

Section.displayName = "Section";
const LocaleLinks = {
  en: "free-tools",
  "es-ES": "herramientas-gratis",
  de: "kostenlose-tools",
  "pt-BR": "ferramentas-gratuitas",
};
const FreeTool = memo(({ className = "" }: FreeToolProps) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { freeToolsList } = useList();
  const locale = useLocale() as SupportedLocale;
  const freeTools: ToolLink[] = freeToolsList.map((item) => {
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
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsToolsOpen(!isMobile);
    setIsLinksOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className={`w-[168px] flex flex-col gap-5 ${className}`}>
      <Section
        title="Free Tools"
        links={freeTools}
        isOpen={isToolsOpen}
        onToggle={() => setIsToolsOpen(!isToolsOpen)}
      />
      <Section
        title="Quick Links"
        links={quickLinks}
        isOpen={isLinksOpen}
        onToggle={() => setIsLinksOpen(!isLinksOpen)}
      />
    </div>
  );
});

FreeTool.displayName = "FreeTool";

export default FreeTool;
