import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceVideo = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction.video) return "";
  return (
    <div className="w-full h-full p-[50px] border-b-[1px] border-black-normal">
      <div className="max-w-[1024px] w-full h-full justify-self-center ">
        <div className="relative pt-[56.25%] overflow-hidden  my-8 w-full h-full bg-[url('https://d3e54v103j8qbb.cloudfront.net/static/youtube-placeholder.2b05e7d68d.svg')] bg-center bg-cover rounded-lg">
          <iframe
            title={serviceItems.name}
            src={serviceItems.introduction.video}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full absolute top-0 left-0"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceVideo;
