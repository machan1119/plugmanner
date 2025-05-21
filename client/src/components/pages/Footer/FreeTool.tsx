import React, { memo } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { SupportedLocale } from "@/libs/types/Types";
import { useList } from "@/providers/ListProvider";
import { generate_item_url_from_name } from "@/utils/functions";

interface ToolLink {
  label: string;
  href: string;
  isFree?: boolean;
}

interface SectionProps {
  title: string;
  links: ToolLink[];
  className?: string;
  style?: React.CSSProperties;
}

const Section = memo(
  ({ title, links, className = "", style }: SectionProps) => {
    const t = useTranslations("Footer");
    const selected_links = title == "free_tools" ? links.slice(0, 3) : links;
    return (
      <div className={className} style={style}>
        <button
          className="font-clash mb-4 leading-5 text-xl font-semibold text-left flex items-center gap-4 text-white hover:text-primary transition-colors duration-300 focus:outline-none focus:text-primary group lg:mb-4"
          tabIndex={0}
        >
          <span>{t(title)}</span>
        </button>
        <div className="flex flex-col gap-4 transition-all duration-300 ease-in-out lg:max-h-[500px] max-h-[500px]">
          {selected_links.map((link) => (
            <Link
              key={link.label}
              aria-label={link.label}
              href={link.href}
              className="text-base leading-6 text-white/50 hover:text-primary hover:underline transition-colors duration-300 flex items-center gap-2"
            >
              <span>
                {link.label}{" "}
                {link.isFree && (
                  <span className="bg-primary rounded-full text-black px-2 py-0.5 text-xs font-medium transition-colors duration-300 group-hover:bg-secondary">
                    {t("free")}
                  </span>
                )}
              </span>
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
  "pt-BR": "ferramentas-gratuitas",
};
const FreeTool = memo(() => {
  const { freeToolsList } = useList();
  const locale = useLocale() as SupportedLocale;
  const t = useTranslations("Footer");
  const quickLinks: ToolLink[] = [
    {
      label: t("contact_us"),
      href: "https://panel.socialplug.io/contact/helpdesk?_gl=1*1ai26oe*_ga*MTM5OTE1MzUyOS4xNzM4OTI3NTYx*_ga_2W3R0LJ26C*MTczODk1Nzg4OC4zLjAuMTczODk1Nzg4OC4wLjAuMA..",
    },
    {
      label: t("affiliate_program"),
      href: "https://www.socialplug.io/affiliate-program",
    },
    { label: t("blog"), href: "/blog" },
    { label: t("about_us"), href: "https://www.socialplug.io/about-us" },
    { label: t("reviews"), href: "https://www.socialplug.io/about-us" },
    {
      label: t("privacy_policy"),
      href: "https://www.socialplug.io/terms-of-services-privacy-policy",
    },
    {
      label: t("terms_conditions"),
      href: "https://www.socialplug.io/terms-of-services-privacy-policy",
    },
  ];
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

  return (
    <div className="w-full md:w-[150px] grid grid-cols-2 gap-5 md:flex md:flex-col">
      <Section title="free_tools" links={freeTools} />
      <Section title="quick_links" links={quickLinks} />
    </div>
  );
});

FreeTool.displayName = "FreeTool";

export default FreeTool;
