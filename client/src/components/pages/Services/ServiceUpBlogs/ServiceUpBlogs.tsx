import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React from "react";

const ServiceUpBlogs = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) return <div className="">no data</div>;
  return (
    <div className="w-full py-[80px] border-b-[1px] border-black-normal">
      <div className="flex flex-col gap-20 max-w-[1366px] justify-self-center px-10">
        {serviceItems.introduction.UpBlogs.Blog.map((item, index) => (
          <div
            className={`w-[95%] flex gap-[10%] items-start ${
              index % 2 != 0 && "flex-row-reverse"
            }`}
            key={index}
          >
            <Image
              width={500}
              height={500}
              alt={item.title}
              src={`${process.env.BACKEND_URL}${item.img.url}`}
              className=""
            />
            <div className="flex flex-col gap-5">
              <p className="font-h1 !text-left">{item.title}</p>
              <p className="font-main text-[#686889] text-[20px]">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceUpBlogs;
