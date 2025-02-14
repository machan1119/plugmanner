import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceVideo = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) return "";
  return (
    <div className="w-full h-full py-[80px] border-b-[1px] border-black-normal">
      <div className="justify-self-center pb-56.25 overflow-hidden my-8 w-[1200px] h-[680px] max-w-[1366px] bg-[url('https://d3e54v103j8qbb.cloudfront.net/static/youtube-placeholder.2b05e7d68d.svg')] bg-center bg-cover rounded-lg">
        <iframe
          title={serviceItems.name}
          src={serviceItems.introduction.video}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default ServiceVideo;
