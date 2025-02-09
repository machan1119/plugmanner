"use client";
import { BlogItems } from "@/libs/data/BlogItems";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "@/libs/consts/MySvg";
import MainButton from "@/components/Buttons";

const BlogSlide = () => {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const settings = {
    dots: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  };
  return (
    <div className="border-white w-full h-max">
      <Slider
        {...settings}
        className="w-full pb-4 px-10 justify-center h-max"
        ref={(slider: Slider | null) => {
          setSliderRef(slider);
        }}
      >
        {BlogItems.map((item, index) => (
          <div key={index} className="flex px-5">
            <div className="h-[450px] flex flex-col justify-between bg-white rounded-lg p-5 items-center">
              <Image
                width={365}
                height={242}
                src={item.icon}
                alt={item.title}
                className="justify-self-center w-auto h-auto"
              />
              <h3 className="text-black text-[20px] text-center font-semibold font-clash leading-[25px]">
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
          </div>
        ))}
      </Slider>
      <div className="relative mt-[20px] w-full items-base">
        <div className="justify-self-center">
          <MainButton type="green-main" title="Read All News & Articles" />
        </div>
        <div className="hidden md:block absolute top-0 right-5">
          <button
            className="bg-white border-black-dark border-[1px] rounded-md"
            onClick={() => sliderRef?.slickPrev()}
          >
            {PrevArrow}
          </button>
          <button
            className="mx-8 bg-white border-black-dark border-[1px] rounded-md"
            onClick={() => sliderRef?.slickNext()}
          >
            {NextArrow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSlide;
