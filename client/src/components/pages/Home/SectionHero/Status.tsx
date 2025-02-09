import React from "react";
import StatusItem from "./StatusItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  vertical: true,
};

const Status = () => {
  return (
    <Slider
      {...settings}
      className="w-[450px] pb-4 px-10 justify-center h-[46px] overflow-hidden"
    >
      <StatusItem count={12751} type="follows" time={8} />
      <StatusItem count={1580} type="likes" time={28} />
      <StatusItem count={6557} type="subscribers" time={38} />
    </Slider>
  );
};

export default Status;
