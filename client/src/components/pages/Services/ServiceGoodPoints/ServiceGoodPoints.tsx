import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { memo } from "react";
import { GoodPointsChapterType } from "@/libs/types/ServiceJsonDataType";

interface ServiceGoodPointsProps {
  className?: string;
}

const ServiceGoodPoints = memo(({ className = "" }: ServiceGoodPointsProps) => {
  const { serviceItems } = useServices();

  if (!serviceItems?.introduction.GoodPoints) {
    return null;
  }

  return (
    <section
      className={`
        py-[80px] flex flex-col items-center border-b-[1px] border-black-normal
        ${className}
      `}
      aria-labelledby="good-points-heading"
    >
      <div className="max-w-[1366px] px-10 flex flex-col gap-7 w-full items-start mb-8">
        <h2 id="good-points-heading" className="sr-only">
          Service Good Points
        </h2>
        <div
          className="w-full flex flex-col gap-20"
          role="list"
          aria-label="Service chapters"
        >
          {serviceItems.introduction.GoodPoints.chapter.map(
            (chapterItem: GoodPointsChapterType, chapterIndex: number) => (
              <article
                className={`flex gap-5 items-center ${
                  chapterIndex % 2 === 0 && "flex-row-reverse"
                }`}
                key={chapterIndex}
                role="listitem"
              >
                <div className="flex-auto flex flex-col gap-5 justify-start">
                  <h3 className="font-h1 !text-left">
                    <StrapiText
                      data={chapterItem.title.text}
                      customClassName="font-h1 !text-left"
                    />
                  </h3>
                  <div
                    className="flex flex-col gap-8"
                    role="list"
                    aria-label={`${chapterItem.title.text[0].content} sections`}
                  >
                    {chapterItem.section.map((sectionItem, sectionIndex) => (
                      <div
                        className="flex flex-col gap-4"
                        key={sectionIndex}
                        role="listitem"
                      >
                        {sectionItem.title && (
                          <h4 className="font-main text-black font-semibold lg:text-[24px]">
                            <StrapiText
                              data={sectionItem.title.text}
                              customClassName="font-main text-black font-semibold lg:text-[24px]"
                            />
                          </h4>
                        )}
                        <StrapiParagraph
                          paragraph={sectionItem.content}
                          customClassName="font-main text-[#686889] lg:text-[20px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {chapterItem.img && (
                  <Image
                    width={50}
                    height={445}
                    alt={`${chapterItem.title.text[0].content} illustration`}
                    src={chapterItem.img}
                    priority={chapterIndex < 2}
                    loading={chapterIndex < 2 ? "eager" : "lazy"}
                  />
                )}
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
});

ServiceGoodPoints.displayName = "ServiceGoodPoints";

export default ServiceGoodPoints;
