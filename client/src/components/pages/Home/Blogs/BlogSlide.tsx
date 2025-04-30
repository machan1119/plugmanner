import React, { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import MainButton from "@/components/Buttons";
import { NextArrow, PrevArrow } from "@/libs/consts/MySvg";
import { useTranslations } from "next-intl";

const BlogSlide = memo(() => {
  const t = useTranslations("Home");
  const BlogItems = [
    {
      icon: "https://cdn.prod.website-files.com/62c20e5d5008626d5073c19a/67a3dbe518269ae4c5428a5b_How-to-Get-More-Followers-on-Facebook-Proven-Strategies-for-Growing-Your-Online-Presence-p-500.jpg",
      title: t("Blogs.BlogItems.0.title"),
      type: t("Blogs.BlogItems.0.type"),
      date: t("Blogs.BlogItems.0.date"),
    },
    {
      icon: "https://cdn.prod.website-files.com/62c20e5d5008626d5073c19a/67a3d6dad95b35f98fd71744_How-to-Make-Money-on-Facebook-Reels-in-2025-p-500.jpg",
      title: t("Blogs.BlogItems.1.title"),
      type: t("Blogs.BlogItems.1.type"),
      date: t("Blogs.BlogItems.1.date"),
    },
    {
      icon: "https://cdn.prod.website-files.com/62c20e5d5008626d5073c19a/67a3dbe518269ae4c5428a5b_How-to-Get-More-Followers-on-Facebook-Proven-Strategies-for-Growing-Your-Online-Presence-p-500.jpg",
      title: t("Blogs.BlogItems.2.title"),
      type: t("Blogs.BlogItems.2.type"),
      date: t("Blogs.BlogItems.2.date"),
    },
    {
      icon: "https://cdn.prod.website-files.com/62c20e5d5008626d5073c19a/67a3d6dad95b35f98fd71744_How-to-Make-Money-on-Facebook-Reels-in-2025-p-500.jpg",
      title: t("Blogs.BlogItems.3.title"),
      type: t("Blogs.BlogItems.3.type"),
      date: t("Blogs.BlogItems.3.date"),
    },
    {
      icon: "https://cdn.prod.website-files.com/62c20e5d5008626d5073c19a/67a3dbe518269ae4c5428a5b_How-to-Get-More-Followers-on-Facebook-Proven-Strategies-for-Growing-Your-Online-Presence-p-500.jpg",
      title: t("Blogs.BlogItems.4.title"),
      type: t("Blogs.BlogItems.4.type"),
      date: t("Blogs.BlogItems.4.date"),
    },
  ];

  return (
    <div className="border-white size-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={true}
        autoHeight
        grabCursor={true}
        speed={1000}
        navigation={{
          prevEl: ".custom-swiper-button-prev",
          nextEl: ".custom-swiper-button-next",
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Navigation]}
      >
        {BlogItems.map((item, index) => (
          <SwiperSlide key={index}>
            <article className="flex flex-col w-full justify-between bg-white rounded-lg p-5 items-center hover:shadow-lg transition-all duration-300">
              <div className="w-full aspect-[365/242] overflow-hidden rounded-lg">
                <img
                  width={365}
                  height={242}
                  src={item.icon}
                  alt={`${item.title} thumbnail`}
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-black text-[20px] text-left font-semibold font-clash leading-[25px] mt-4 hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <div className="flex flex-wrap w-full justify-between gap-2 mt-6">
                <div className="flex bg-black-light border-black-dark border-[1px] p-2 rounded-md hover:bg-black-dark transition-colors duration-300">
                  <p className="text-black text-[14px] text-center font-satoshi font-medium">
                    {item.type}
                  </p>
                  <div className="w-[1px] bg-black h-full mx-2" />
                  <time
                    dateTime={item.date}
                    className="text-black/60 text-[14px] text-center font-satoshi font-medium"
                  >
                    {item.date}
                  </time>
                </div>
                <button className="text-primary font-semibold text-[16px] p-2 rounded-md hover:bg-primary/10 transition-colors duration-300">
                  {t("Blogs.ReadMore")}
                </button>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative mt-[20px] w-full items-base">
        <div className="justify-self-center">
          <MainButton type="primary" title="Read All News & Articles" />
        </div>
        <div className="hidden md:block absolute top-0 right-5">
          <button className="custom-swiper-button-prev bg-white border-black-dark border-[1px] rounded-md hover:bg-black-dark hover:text-white transition-colors duration-300">
            {PrevArrow}
          </button>
          <button className="custom-swiper-button-next mx-8 bg-white border-black-dark border-[1px] rounded-md hover:bg-black-dark hover:text-white transition-colors duration-300">
            {NextArrow}
          </button>
        </div>
      </div>
    </div>
  );
});

BlogSlide.displayName = "BlogSlide";

export default BlogSlide;
