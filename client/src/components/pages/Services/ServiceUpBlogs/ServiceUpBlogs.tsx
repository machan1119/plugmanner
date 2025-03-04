import MainButton from "@/components/Buttons";
import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { memo, useCallback } from "react";
import { BlogType } from "@/libs/types/ServiceJsonDataType";

interface ServiceUpBlogsProps {
  className?: string;
}

const ServiceUpBlogs = memo(({ className = "" }: ServiceUpBlogsProps) => {
  const { serviceItems } = useServices();

  const handleButtonClick = useCallback((title: string) => {
    // Add any button click handling if needed
    console.log(`Read more about ${title}`);
  }, []);

  if (!serviceItems?.introduction.UpBlogs) {
    return null;
  }

  return (
    <section
      className={`
        w-full py-[80px] border-b-[1px] border-black-normal
        ${className}
      `}
      aria-labelledby="blogs-heading"
    >
      <div className="flex flex-col gap-20 max-w-[1366px] justify-self-center items-center px-10">
        {serviceItems.introduction.UpBlogs.title?.text && (
          <h2 id="blogs-heading" className="font-h1 w-[50%] text-wrap">
            <StrapiText
              data={serviceItems.introduction.UpBlogs.title.text}
              customClassName="font-h1 w-[50%] text-wrap"
            />
          </h2>
        )}
        <div
          className="w-full flex flex-col gap-10"
          role="list"
          aria-label="Blog articles"
        >
          {serviceItems.introduction.UpBlogs.Blog.map(
            (item: BlogType, index: number) => (
              <article
                className={`w-[95%] flex lg:flex-row flex-col gap-[60px] items-center ${
                  index % 2 !== 0 && "lg:flex-row-reverse flex-col-reverse"
                }`}
                key={`blog-${item.title.text[0].content
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                role="listitem"
              >
                <Image
                  width={500}
                  height={500}
                  alt={`${item.title.text[0].content} illustration`}
                  src={item.img}
                  className="object-cover"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                />
                <div className="flex flex-col gap-5">
                  <h3 className="font-h1 !text-left">
                    <StrapiText
                      data={item.title.text}
                      customClassName="font-h1 !text-left"
                    />
                  </h3>
                  <StrapiParagraph
                    paragraph={item.paragraph}
                    customClassName="font-main text-[#686889] lg:text-[20px] !justify-start"
                  />
                  {item.button && (
                    <MainButton
                      type="primary"
                      title={item.button}
                      aria-label={`Read more about ${item.title.text[0].content}`}
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

ServiceUpBlogs.displayName = "ServiceUpBlogs";

export default ServiceUpBlogs;
