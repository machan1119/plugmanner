import { OurPartnersItems } from "@/libs/data/OurPatnersItems";
import React, { memo } from "react";
import OurPartnersItem from "./OurPartnersItem";
import { useTranslations } from "next-intl";

const OurPartners = memo(() => {
  const t = useTranslations("Home");
  return (
    <section className="flex flex-col py-[20px] md:py-10 lg:py-[80px] items-center bg-black-medium w-full">
      <div className="mb-12 flex flex-col gap-3 items-center w-[100%] md:w-[50%]">
        <h2 id="section-partners-title" className="font-h1 animate-fade-in">
          {t("OurPartners.title_1")}
          <span className="text-primary">{t("OurPartners.title_2")}</span>
        </h2>
        <p className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi animate-fade-in-up">
          {t("OurPartners.description")}
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 md:gap-10 w-full md:w-[60%] max-w-7xl mx-auto">
        {OurPartnersItems.map((item) => (
          <OurPartnersItem item={item} key={item.alt} />
        ))}
      </div>
    </section>
  );
});

OurPartners.displayName = "OurPartners";

export default OurPartners;
