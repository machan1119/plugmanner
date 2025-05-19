import { StrapiText } from "@/components/StrapiComponents";
import { useFreeServices } from "@/providers/FreeServicesProvider";
import Image from "next/image";
import React, { memo } from "react";

interface summaryItem {
  title: string;
  content: string;
  icon: string;
}

const FreeServicesSummary = () => {
  const { freeServiceItem } = useFreeServices();
  if (!freeServiceItem?.summary) {
    return null;
  }
  const totalCount = freeServiceItem.summary.EachSummary.length;
  const getGridColsClass = (count: number) => {
    if (count === 1) return "md:grid-cols-1 lg:grid-cols-1";
    if (count === 2) return "md:grid-cols-2 lg:grid-cols-2";
    if (count === 3) return "md:grid-cols-3 lg:grid-cols-3";
    return "md:grid-cols-3 lg:grid-cols-4";
  };
  return (
    <section className="w-full py-6 md:py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-dark">
      <div className="max-w-[1366px] w-full flex flex-col items-center px-4 md:px-10">
        <h2 className="font-h1 w-[80%] lg:w-[50%] text-wrap">
          <StrapiText data={freeServiceItem.summary.title.text} />
        </h2>
        <Image
          width={300}
          height={25}
          alt=""
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6403637940112104f075f0c2_underline1.svg"
          className="mt-2 mb-5"
          priority={false}
        />
        <div
          className={`w-full flex flex-col gap-6 md:grid items-stretch mt-8 ${getGridColsClass(
            totalCount
          )}`}
        >
          {freeServiceItem.summary.EachSummary.map(
            (item: summaryItem, index: number) => (
              <div className="w-full" key={index}>
                <div className="relative mt-[25px] flex flex-col h-[calc(100%-25px)] gap-2 px-6 pb-6 pt-10 cursor-pointer border border-black-normal hover:border-primary rounded-md transition-all duration-500">
                  <Image
                    width={50}
                    height={50}
                    alt=""
                    src={item.icon}
                    className="absolute top-[-25px] left-5"
                    priority={false}
                  />
                  <p className="font-h2 !text-left mt-3 !text-[#1b2d45]">
                    {item.title}
                  </p>
                  <p className="font-service-text text-[18px]">
                    {item.content}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

FreeServicesSummary.displayName = "FreeServicesSummary";

export default memo(FreeServicesSummary);
