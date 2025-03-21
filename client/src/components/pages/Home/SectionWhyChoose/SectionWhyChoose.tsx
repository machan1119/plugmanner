import React, { memo } from "react";
import SectionWhyChooseItems from "./SectionWhyChooseItems";
import { useTranslations } from "next-intl";
interface SectionWhyChooseProps {
  className?: string;
}

const SectionWhyChoose = memo(({ className = "" }: SectionWhyChooseProps) => {
  const t = useTranslations("Home");
  const WhyChooseThis = [
    {
      icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e58_why-choose-us-img-3.svg",
      title: t("Why_2.WhyChooseThisItems.0.title"),
      description: t("Why_2.WhyChooseThisItems.0.description"),
    },
    {
      icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6766f66976667853ccd2dc0a_homep-checkoutsvg.svg",
      title: t("Why_2.WhyChooseThisItems.1.title"),
      description: t("Why_2.WhyChooseThisItems.1.description"),
    },
    {
      icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e56_why-choose-us-img-1.svg",
      title: t("Why_2.WhyChooseThisItems.2.title"),
      description: t("Why_2.WhyChooseThisItems.2.description"),
    },
  ];

  return (
    <section
      className={`flex flex-col py-12 md:py-16 lg:py-[80px] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden border-black-dark border-t-[1px] border-b-[1px] ${className}`}
    >
      <div className="max-w-[1366px] justify-self-center px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-3 items-center w-[50%] justify-self-center">
          <h2 className="font-h1 animate-fade-in">
            {t("Why_2.title_1")}
            <span className="text-primary">{t("Why_2.title_2")}</span>
            {t("Why_2.title_3")}
          </h2>
          <span className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
            {t("Why_2.description")}
          </span>
        </div>
        <div className="flex flex-col lg:grid lg:[&>*:nth-child(3)]:col-span-2 2xl:[&>*:nth-child(3)]:col-span-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-center">
          {WhyChooseThis.map((item, index) => (
            <SectionWhyChooseItems item={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

SectionWhyChoose.displayName = "SectionWhyChoose";

export default SectionWhyChoose;
