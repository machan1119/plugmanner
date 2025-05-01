import { useEffect, useState } from "react";
import Image from "next/image";
import { useServices } from "@/providers/ServicesProvider";

export default function ServiceVideo() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const { serviceItems } = useServices();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );

    const videoElement = document.querySelector(".video-container");
    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => observer.disconnect();
  }, []);
  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.video) {
    return null;
  }

  return (
    <section className="w-full h-full p-[60px] lg:py-[80px]">
      <div className="max-w-[1220px] w-full h-full justify-self-center mx-auto">
        <div className="video-container relative pt-[56.25%] overflow-hidden w-full max-w-[1220px] max-h-[450px] bg-[#f5f5f5] bg-center bg-cover rounded-lg mx-auto">
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/youtube-placeholder.svg"
                alt="Video placeholder"
                width={800}
                height={450}
                className="object-cover"
                priority
              />
            </div>
          )}
          {isIntersecting && (
            <iframe
              title={`${serviceItems.name} video`}
              src={`${serviceItems.introduction.video}?autoplay=0&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
              loading="lazy"
              onLoad={() => setIsVideoLoaded(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
