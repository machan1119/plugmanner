import React, { memo } from "react";
import StatusItem from "./StatusItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

interface StatusProps {
  className?: string;
}

interface StatusData {
  count: number;
  type: "follows" | "likes" | "subscribers";
  time: number;
}

const statusData: StatusData[] = [
  { count: 12751, type: "follows", time: 8 },
  { count: 1580, type: "likes", time: 28 },
  { count: 6557, type: "subscribers", time: 38 },
];

const Status = memo(({ className = "" }: StatusProps) => {
  return (
    <div
      className={`border-white size-full ${className}`}
      role="region"
      aria-label="Live delivery status"
    >
      <Swiper
        slidesPerView={"auto"}
        // grabCursor={true}
        speed={1000}
        direction="vertical"
        autoHeight
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        loop={true}
        modules={[Autoplay, Navigation]}
        className="status-swiper"
      >
        {statusData.map((item, index) => (
          <SwiperSlide key={`${item.type}-${index}`}>
            <StatusItem
              count={item.count}
              type={item.type}
              time={item.time}
              className="animate-fade-in-up"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

Status.displayName = "Status";

export default Status;
