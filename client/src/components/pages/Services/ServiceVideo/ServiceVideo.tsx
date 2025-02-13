import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceVideo = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) return <div className="">no data</div>;
  return (
    <div className="w-full py-[80px] border-b-[1px] border-black-normal">
      <div className="justify-self-center relative pb-56.25 h-72 lg:h-[450px] overflow-hidden my-8 w-full max-w-[1366px]">
        <iframe
          title="video"
          src={serviceItems.introduction.video}
          width={"100%"}
          height={"100%"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default ServiceVideo;
