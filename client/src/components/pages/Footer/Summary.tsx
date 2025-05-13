import React, { memo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Summary = memo(() => {
  const t = useTranslations("Footer");
  return (
    <div className="flex flex-col gap-5 max-w-[280px] pb-4 sm:pb-0">
      <div className="flex flex-col gap-4">
        <Image
          width={164}
          height={32}
          className="w-[123px] h-[24px] md:w-[164px] md:h-[32px] transition-transform duration-300 hover:scale-105"
          alt="SocialPlug Logo"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e69_footer-logo.svg"
        />
        <p className="text-white/50 text-base leading-relaxed transition-colors duration-300 hover:text-white/70">
          {t("summary")}
        </p>
      </div>

      <div className="flex p-2.5 items-center justify-start rounded-lg border border-white/20 bg-white/10 gap-2 transition-all duration-300 hover:bg-white/15 hover:border-white/30">
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
        </span>
        <p className="text-white/90 font-medium">{t("all_services_online")}</p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-clash leading-5 font-semibold text-xl text-white transition-colors duration-300 hover:text-primary">
          {t("company")}
        </p>
        <p className="text-white/50 text-sm md:text-base leading-relaxed transition-colors duration-300 hover:text-white/70">
          CB SOLUTIONS OÜ (16474680) Hobujaama 5, Talinn, Estonia, 10111
        </p>
        <p className="text-white/90 font-medium transition-colors duration-300 hover:text-primary">
          {t("deliver")}
        </p>
      </div>
    </div>
  );
});

Summary.displayName = "Summary";

export default Summary;
