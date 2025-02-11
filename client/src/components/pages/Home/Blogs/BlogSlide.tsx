import { BlogItems } from "@/libs/data/BlogItems";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import MainButton from "@/components/Buttons";
import { NextArrow, PrevArrow } from "@/libs/consts/MySvg";

const BlogSlide = () => {
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
            <div className="flex flex-col justify-between bg-white rounded-lg p-5 items-center">
              <Image
                width={365}
                height={242}
                src={item.icon}
                alt={item.title}
                className="justify-self-center w-[365px] h-[242px]"
              />
              <h3 className="text-black text-[20px] text-center font-semibold font-clash leading-[25px] mt-4">
                {item.title}
              </h3>
              <div className="flex gap-2 mt-10">
                <div className="flex bg-black-light border-black-dark border-[1px] p-2 rounded-md">
                  <p className="text-black text-[16px] text-center">
                    {item.type}
                  </p>
                  <div className="w-[1px] bg-black h-full mx-2" />
                  <p className="text-black-dark text-[16px] text-center">
                    {item.date}
                  </p>
                </div>
                <button className="text-green-light text-[16px] p-2 rounded-md">
                  Read More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative mt-[20px] w-full items-base">
        <div className="justify-self-center">
          <MainButton type="green-main" title="Read All News & Articles" />
        </div>
        <div className="hidden md:block absolute top-0 right-5">
          <button className="custom-swiper-button-prev bg-white border-black-dark border-[1px] rounded-md">
            {PrevArrow}
          </button>
          <button className="custom-swiper-button-next mx-8 bg-white border-black-dark border-[1px] rounded-md">
            {NextArrow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSlide;
