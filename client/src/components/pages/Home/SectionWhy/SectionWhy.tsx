import Link from "next/link";
import React, { memo } from "react";
import { Reviews } from "@/libs/data/Reviews";
import SectionWhyItems from "./SectionWhyItems";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface StatsData {
  value: string;
  label: string;
}

const SectionWhy = memo(() => {
  const t = useTranslations("Home");
  const statsData: StatsData[] = [
    { value: "100k+", label: t("Why.Review_Status.happy") },
    { value: "1.7 Billion+", label: t("Why.Review_Status.population") },
    { value: "4.8", label: t("Why.Review_Status.review_rate") },
  ];
  return (
    <section className="flex flex-col py-[20px] md:py-16 lg:py-[80px] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden border-black/10 border-b-[1px]">
      <div className="max-w-[1366px] justify-self-center px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-3 items-center w-full md:w-[90%] lg:w-[50%] justify-self-center">
          <h2 id="section-why-title" className="font-h1 animate-fade-in">
            {t("Why.title_1")}
            <span className="text-primary">{t("Why.title_2")}</span>
            {t("Why.title_3")}
          </h2>
          <p className="text-black text-[16px] leading-6 text-center font-satoshi w-full sm:w-[75%] animate-fade-in-up">
            {t("Why.description")}
            <Link
              href={"#"}
              aria-label="Leave a review"
              className="text-primary underline hover:text-secondary transition-colors duration-300 rounded-sm"
            >
              {t("Why.review")}.
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-8 lg:mt-8 items-center w-full ">
          <div className="mt-[70px] lg:mt-0 flex flex-col sm:flex-row bg-white border border-black-dark/50 rounded-[16px] py-6 relative w-full lg:w-[80%] items-center shadow-sm hover:shadow-md transition-all duration-300">
            <div className="absolute -top-0 right-0 transform -translate-y-[78%] translate-x-[10%] md:translate-x-[20%] z-20 w-[80px] lg:w-[10%] flex flex-col items-end">
              <Image
                width={136}
                height={176}
                loading="lazy"
                alt="Socialplug Character Sitting"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e7b_why-choose-us-character-img.svg"
                className="w-full"
              />
              <Image
                width={82}
                height={38}
                loading="lazy"
                alt="5-star reviews"
                src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e7a_why-choose-us-rating-bubble.svg"
                className="absolute top-[10%] lg:-right-[60%] right-[110%] w-[70%]"
              />
            </div>
            {statsData.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col grow gap-2 items-center animate-fade-in-up">
                  <p className="font-h1">{stat.value}</p>
                  <p className="text-black/40 text-[18px] font-satoshi text-center">
                    {stat.label}
                  </p>
                </div>
                {index < statsData.length - 1 && (
                  <div className="hidden sm:block bg-gradient-to-b from-white via-black-dark to-white w-[1px] h-[75px]" />
                )}
                {index < statsData.length - 1 && (
                  <div className="sm:hidden w-full h-[1px] bg-gradient-to-r from-white via-black-dark to-white my-4" />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full">
            {Reviews.map((item, index) => (
              <SectionWhyItems item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SectionWhy.displayName = "SectionWhy";

export default SectionWhy;
