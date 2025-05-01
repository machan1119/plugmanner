import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { memo } from "react";
import { GoodPointsChapterType } from "@/libs/types/ServiceJsonDataType";

const ServiceGoodPoints = memo(() => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.GoodPoints) {
    return null;
  }

  return (
    <section className="py-8 md:py-[80px] flex flex-col items-center border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] px-10 flex flex-col gap-7 w-full items-start mb-8">
        <div className="w-full flex flex-col gap-20">
          {serviceItems.introduction.GoodPoints.chapter.map(
            (chapterItem: GoodPointsChapterType, chapterIndex: number) => (
              <article
                className={`flex gap-5 items-center ${
                  chapterIndex % 2 === 0 && "flex-row-reverse"
                }`}
                key={chapterIndex}
              >
                <div className="flex-auto flex flex-col gap-5 justify-start">
                  <h3 className="font-h1 !text-left">
                    <StrapiText
                      data={chapterItem.title.text}
                      customClassName="font-h1 !text-left"
                    />
                  </h3>
                  <div className="flex flex-col gap-8">
                    {chapterItem.section.map((sectionItem, sectionIndex) => (
                      <div className="flex flex-col gap-4" key={sectionIndex}>
                        {sectionItem.title && (
                          <h4 className="text-black font-semibold text-[24px]">
                            <StrapiText
                              data={sectionItem.title.text}
                              customClassName="text-black font-semibold text-[24px]"
                            />
                          </h4>
                        )}
                        <StrapiParagraph
                          paragraph={sectionItem.content}
                          customClassName="text-[#686889] text-[20px]"
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
