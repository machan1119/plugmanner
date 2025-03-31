"use client";

import MainButton from "@/components/Buttons";
import { NextArrow, PrevArrow } from "@/libs/consts/MySvg";
import { useServices } from "@/providers/ServicesProvider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useMemo } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ServiceArticle = () => {
  const { serviceItems } = useServices();
  const t = useTranslations("ServiceItem");

  const swiperConfig = useMemo(
    () => ({
      slidesPerView: 1,
      spaceBetween: 10,
      centeredSlides: true,
      autoHeight: true,
      grabCursor: true,
      speed: 1000,
      navigation: {
        prevEl: ".custom-swiper-button-prev",
        nextEl: ".custom-swiper-button-next",
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      loop: true,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 2,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
      modules: [Autoplay, Navigation],
    }),
    []
  );

  if (!serviceItems?.article) {
    return null;
  }
  return (
    <section className="flex flex-col py-20 items-center bg-white w-full border-b border-black-normal">
      <div className="max-w-[1366px] w-full justify-self-center px-10">
        <h2 className="font-h1 mb-12">{t("Articles")}</h2>
        <div className="border-white size-full">
          <Swiper {...swiperConfig}>
            {serviceItems.article.map((item, index) => (
              <SwiperSlide key={`article-${item.title}-${index}`}>
                <article className="justify-self-center flex flex-col justify-between bg-white rounded-lg p-5 items-center">
                  <Image
                    width={365}
                    height={242}
                    src={item.img}
                    alt={item.title}
                    className="justify-self-center rounded-lg object-cover"
                    priority={index < 3}
                  />
                  <h3 className="text-black text-xl text-center font-semibold font-clash leading-tight mt-4">
                    {item.title}
                  </h3>
                  <button className="text-primary text-base p-2 rounded-md hover:bg-gray-50 transition-colors">
                    {t("ReadMore")}
                  </button>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="relative mt-5 w-full flex items-center justify-between">
            <div className="flex-1 flex justify-center">
              <MainButton type="primary" title="Read All News & Articles" />
            </div>
            <div className="hidden md:flex gap-8 items-center">
              <button className="custom-swiper-button-prev bg-white border-black-dark border rounded-md p-2 hover:bg-gray-50 transition-colors">
                {PrevArrow}
              </button>
              <button className="custom-swiper-button-next bg-white border-black-dark border rounded-md p-2 hover:bg-gray-50 transition-colors">
                {NextArrow}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArticle;
