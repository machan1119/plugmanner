import React, { memo } from "react";
import SectionWhyChooseItems from "./SectionWhyChooseItems";
import { useTranslations } from "next-intl";

const SectionWhyChoose = memo(() => {
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
    <section className="flex flex-col py-[20px] md:py-16 lg:py-[80px] items-center bg-black-light w-full bg-cover overflow-hidden border-black/10 border-b-[1px]">
      <div className="max-w-[1366px] justify-self-center px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mb-14 flex flex-col gap-3 items-center w-full md:w-[90%] lg:w-[50%] justify-self-center">
          <h2 className="font-h1 animate-fade-in">
            {t("Why_2.title_1")}
            <span className="text-primary">{t("Why_2.title_2")}</span>
            {t("Why_2.title_3")}
          </h2>
          <span className="text-[rgba(0,0,0,0.5)] text-[16px] leading-6 text-center font-satoshi w-[90%] sm:w-[75%] animate-fade-in-up">
            {t("Why_2.description")}
          </span>
        </div>
        <div className="flex flex-col md:grid md:[&>*:nth-child(3)]:col-span-2 2xl:[&>*:nth-child(3)]:col-span-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 lg:gap-8 items-center">
          {WhyChooseThis.map((item, index) => (
            <SectionWhyChooseItems item={item} key={index} count={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

SectionWhyChoose.displayName = "SectionWhyChoose";

export default SectionWhyChoose;
