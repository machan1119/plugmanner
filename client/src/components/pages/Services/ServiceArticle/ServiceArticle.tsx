import MainButton from "@/components/Buttons";
import { NextArrow, PrevArrow } from "@/libs/consts/MySvg";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ServiceArticle = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.article) return "";
  return (
    <div className="flex flex-col py-[80px] items-center bg-white w-full border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] w-full justify-self-center px-10">
        <div className="font-h1-md lg:font-h1-lg mb-12">Related Articles</div>
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
                spaceBetween: 2,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            modules={[Autoplay, Navigation]}
          >
            {serviceItems.article.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="justify-self-center flex flex-col justify-between bg-white rounded-lg p-5 items-center">
                  <Image
                    width={365}
                    height={242}
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${item.main_img[0].url}`}
                    alt={item.title}
                    className="justify-self-center w-[365px] h-[242px] rounded-lg"
                  />
                  <h3 className="text-black text-[20px] text-center font-semibold font-clash leading-[25px] mt-4">
                    {item.title}
                  </h3>
                  <button className="text-green-light text-[16px] p-2 rounded-md">
                    Read More
                  </button>
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
      </div>
    </div>
  );
};

export default ServiceArticle;
