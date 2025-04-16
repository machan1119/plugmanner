import { useServices } from "@/providers/ServicesProvider";
import React, { memo } from "react";

const ServiceVideo = memo(() => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.video) {
    return null;
  }

  return (
    <section className="w-full h-full p-[50px] border-b-[1px] border-black-normal">
      <div className="max-w-[1024px] w-full h-full justify-self-center mx-auto">
        <div className="relative pt-[56.25%] overflow-hidden my-8 w-full max-w-[800px] max-h-[450px] bg-[url('https://d3e54v103j8qbb.cloudfront.net/static/youtube-placeholder.2b05e7d68d.svg')] bg-center bg-cover rounded-lg mx-auto">
          <iframe
            title={`${serviceItems.name} video`}
            src={serviceItems.introduction.video}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
});

ServiceVideo.displayName = "ServiceVideo";

export default ServiceVideo;
