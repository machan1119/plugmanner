import React from "react";
import StatusItem from "./StatusItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const Status = () => {
  return (
    <div className="border-white size-full">
      <Swiper
        slidesPerView={"auto"}
        // spaceBetween={10}
        // centeredSlides={true}
        grabCursor={true}
        speed={1000}
        direction="vertical"
        autoHeight
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Navigation]}
      >
        <SwiperSlide>
          <StatusItem count={12751} type="follows" time={8} />
        </SwiperSlide>
        <SwiperSlide>
          <StatusItem count={1580} type="likes" time={28} />
        </SwiperSlide>
        <SwiperSlide>
          <StatusItem count={6557} type="subscribers" time={38} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Status;
