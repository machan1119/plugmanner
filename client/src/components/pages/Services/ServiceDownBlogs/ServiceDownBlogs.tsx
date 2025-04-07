import MainButton from "@/components/Buttons";
import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { memo, useCallback } from "react";
import { BlogType } from "@/libs/types/ServiceJsonDataType";

interface ServiceDownBlogsProps {
  className?: string;
}

const ServiceDownBlogs = memo(({ className = "" }: ServiceDownBlogsProps) => {
  const { serviceItems } = useServices();

  const handleButtonClick = useCallback((title: string) => {
    // Add any button click handling if needed
    console.log(`Read more about ${title}`);
  }, []);

  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.DownBlogs) {
    return null;
  }

  return (
    <section
      className={`
        w-full py-[80px] border-b-[1px] border-black-normal
        ${className}
      `}
    >
      <div className="flex flex-col gap-10 max-w-[1366px] justify-self-center items-center px-10">
        {serviceItems.introduction.DownBlogs.title?.text && (
          <StrapiText
            data={serviceItems.introduction.DownBlogs.title.text}
            customClassName="font-h1 w-[50%] text-wrap"
          />
        )}
        <div className="w-full flex flex-col gap-10">
          {serviceItems.introduction.DownBlogs.Blog.map(
            (item: BlogType, index: number) => (
              <article
                className={`w-[100%] flex lg:flex-row flex-col gap-[80px]  items-center ${
                  index % 2 !== 0 && "lg:flex-row-reverse flex-col-reverse"
                }`}
                key={index}
              >
                <Image
                  width={500}
                  height={500}
                  alt={`illustration`}
                  src={item.img}
                  className="lg:w-[35%] md:w-[50%] w-[70%]"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="flex flex-col gap-5 lg:w-[55%]">
                  <h2 className="font-h1 !text-left">
                    <StrapiText
                      data={item.title.text}
                      customClassName="font-h1 !text-left"
                    />
                  </h2>
                  <StrapiParagraph
                    paragraph={item.paragraph}
                    customClassName="font-satoshi text-[#686889] text-[18px]"
                  />
                  {item.button && (
                    <MainButton
                      type="primary"
                      title={item.button}
                      customClass="w-[50%]"
                      handleClick={() =>
                        handleButtonClick(item.title.text[0].content)
                      }
                    />
                  )}
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
});

ServiceDownBlogs.displayName = "ServiceDownBlogs";

export default ServiceDownBlogs;
