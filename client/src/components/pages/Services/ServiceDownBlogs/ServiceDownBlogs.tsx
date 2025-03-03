import MainButton from "@/components/Buttons";
import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React from "react";

const ServiceDownBlogs = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction.DownBlogs) return "";
  return (
    <div className="w-full py-[80px] border-b-[1px] border-black-normal">
      <div className="flex flex-col gap-10 max-w-[1366px] justify-self-center items-center px-10">
        {serviceItems.introduction.DownBlogs.title?.text && (
          <StrapiText
            data={serviceItems?.introduction.DownBlogs.title!.text}
            customClassName="font-h1 w-[50%] text-wrap"
          />
        )}
        {serviceItems.introduction.DownBlogs.Blog.map((item, index) => (
          <div
            className={`w-[95%] flex lg:flex-row flex-col gap-[60px] items-center ${
              index % 2 != 0 && "lg:flex-row-reverse flex-col-reverse"
            }`}
            key={index}
          >
            <Image
              width={500}
              height={500}
              alt=""
              src={`${item.img}`}
              className=""
            />
            <div className="flex flex-col gap-5">
              <StrapiText
                data={item.title.text}
                customClassName="font-h1 !text-left"
              />
              <StrapiParagraph
                paragraph={item.paragraph}
                customClassName="font-main text-[#686889] lg:text-[20px]"
              />
              {item.button && (
                <MainButton type="green-main" title={item.button} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDownBlogs;
