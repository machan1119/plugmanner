import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import Image from "next/image";
import React, { memo } from "react";
import { BlogType } from "@/libs/types/ServiceJsonDataType";
import { useFreeTools } from "@/providers/FreeToolsProvider";

const FreeToolsDownBlogs = memo(() => {
  const { freeToolItem } = useFreeTools();
  if (!freeToolItem?.DownBlogs) {
    return null;
  }

  return (
    <section className="w-full py-6 md:py-[80px] border-b-[1px] border-black-normal">
      <div className="flex flex-col gap-20 max-w-[1366px] justify-self-center items-center md:px-10 px-4">
        {freeToolItem.DownBlogs.title?.text && (
          <h2
            id="blogs-heading"
            className="font-h1 w-full md:w-[90%] lg:w-[50%] text-wrap"
          >
            <StrapiText
              data={freeToolItem.DownBlogs.title.text}
              customClassName="font-h1 text-wrap"
            />
          </h2>
        )}
        <div className="w-full flex flex-col gap-20">
          {freeToolItem.DownBlogs.Blog.map((item: BlogType, index: number) => (
            <article
              className={`w-[100%] flex md:flex-row flex-col gap-5 md:justify-between items-center ${
                index % 2 !== 0
                  ? "md:flex-row-reverse flex-col-reverse lg:pl-16"
                  : "lg:pr-16"
              }`}
              key={index}
            >
              <Image
                width={500}
                height={500}
                alt={`illustration`}
                src={item.img}
                className="lg:w-[40%] md:w-[50%] sm:w-[60%] w-full"
                priority={index < 2}
                loading={index < 2 ? "eager" : "lazy"}
              />
              <div className="flex flex-col gap-5 lg:w-[50%]">
                <h3 className="font-h1 !text-left">
                  <StrapiText
                    data={item.title.text}
                    customClassName="font-h1 !text-left"
                  />
                </h3>
                <StrapiParagraph
                  paragraph={item.paragraph}
                  customClassName="font-satoshi text-[#686889] text-[18px]"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

FreeToolsDownBlogs.displayName = "FreeToolsDownBlogs";

export default FreeToolsDownBlogs;
