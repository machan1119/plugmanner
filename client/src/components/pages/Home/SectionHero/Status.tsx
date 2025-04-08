import React, { memo } from "react";
import StatusItem from "./StatusItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";
interface StatusData {
  count: number;
  type: string;
  time: number;
}

const Status = memo(() => {
  const t = useTranslations("Home");
  const statusData: StatusData[] = [
    { count: 12751, type: t("hero.Status.follows"), time: 8 },
    { count: 1580, type: t("hero.Status.likes"), time: 28 },
    { count: 6557, type: t("hero.Status.subscribers"), time: 38 },
  ];
  return (
    <div className="border-white size-full">
      <Swiper
        slidesPerView={"auto"}
        speed={1000}
        direction="vertical"
        autoHeight
        allowTouchMove={false}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        loop={true}
        modules={[Autoplay, Navigation]}
        className="status-swiper"
      >
        {statusData.map((item, index) => (
          <SwiperSlide key={index}>
            <StatusItem count={item.count} type={item.type} time={item.time} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

Status.displayName = "Status";

export default Status;
