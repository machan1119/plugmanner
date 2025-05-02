"use client";
import MainButton from "@/components/Buttons";
import { useServices } from "@/providers/ServicesProvider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const ServiceArticle = () => {
  const { serviceItems } = useServices();
  const t = useTranslations("ServiceItem");

  if (!serviceItems?.article) {
    return null;
  }
  return (
    <section className="flex flex-col py-6 md:py-16 lg:py-[80px] items-center bg-white w-full">
      <div className="max-w-[1366px] w-full h-fit justify-self-center px-10 flex flex-col items-center">
        <h2 className="font-h1 mb-12">
          {t("Articles_1")}
          <span className="text-primary">{t("Articles_2")}</span>
        </h2>
        <div className="border-white w-full h-full grid md:grid-cols-3 grid-cols-1">
          {serviceItems.article.map((item, index) => (
            <article
              key={index}
              className="w-full h-full justify-self-center flex flex-col justify-between bg-white rounded-lg p-2 items-center"
            >
              <Image
                width={365}
                height={242}
                src={item.img}
                alt={item.title}
                className="justify-self-center rounded-lg object-cover"
                loading="lazy"
              />
              <h3 className="text-black text-xl md:text-lg lg:text-xl text-left font-semibold font-clash !leading-6 my-4">
                {item.title}
              </h3>
              <button className="w-full text-primary text-md p-2 rounded-md hover:bg-gray-50 text-center font-semibold md:text-left transition-colors">
                {t("ReadMore")}
              </button>
            </article>
          ))}
        </div>
        <MainButton
          type="primary"
          title={t("ReadAllNews")}
          customClass="mt-10"
          customChildClass="py-4 !px-12"
        />
      </div>
    </section>
  );
};

export default ServiceArticle;
