import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import React from "react";

const ServiceGoodPoints = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction.GoodPoints) return "";
  return (
    <div className="py-[80px] flex flex-col items-center px-10 border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] flex flex-col gap-7 w-full items-center mb-8">
        {serviceItems.introduction.GoodPoints?.chapter.map(
          (chapterItem, index) => (
            <div className="flex flex-col gap-5 justify-start" key={index}>
              <StrapiText
                data={chapterItem.title.text}
                customClassName="font-h1 !text-left"
              />
              {chapterItem.section.map((sectionItem, index) => (
                <div className="flex" key={index}>
                  <StrapiParagraph
                    paragraph={sectionItem.content}
                    customClassName="font-main text-[#686889] text-[20px]"
                  />
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ServiceGoodPoints;
