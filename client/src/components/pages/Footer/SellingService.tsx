import React, { memo } from "react";
import Link from "next/link";
import { generate_item_url } from "@/utils/functions";
import { useList } from "@/providers/ListProvider";
import { useLocale, useTranslations } from "next-intl";
import { SupportedLocale } from "@/libs/types/Types";

const LocaleLinks = {
  en: "services",
  "es-ES": "servicios",
  "pt-BR": "serviços",
};

const SellingService = memo(() => {
  const { serviceList } = useList();
  const locale = useLocale() as SupportedLocale;

  const t = useTranslations("Footer");
  return (
    <div className="min-w-[260px] pt-4 border-t border-white/10 sm:border-none sm:pt-0 transition-all duration-300">
      <button className="font-clash leading-5 text-xl font-semibold flex items-center gap-4 text-white hover:text-primary transition-colors duration-300 focus:outline-none focus:text-primary group mb-4 md:mb-8">
        <span>{t("best_selling")}</span>
      </button>
      <div className="flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out lg:max-h-[600px] max-h-[660px]">
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
