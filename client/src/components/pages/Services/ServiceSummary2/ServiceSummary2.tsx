import { StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { memo } from "react";

interface SummaryItem {
  title: string;
  content: string;
}

const ServiceSummary2 = memo(() => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.Summary2) {
    return null;
  }

  const { title, EachSummary } = serviceItems.introduction.Summary2;

  return (
    <section className="w-full py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] w-full flex flex-col items-center px-10">
        <h2 id="summary2-heading" className="sr-only">
          {title.text[0].content}
        </h2>
        <StrapiText
          data={title.text}
          customClassName="font-h1 w-[50%] text-wrap"
        />
        <Image
          width={300}
          height={25}
          alt=""
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6403637940112104f075f0c2_underline1.svg"
          className="my-5"
          priority={false}
        />
        <div className="w-full flex flex-col gap-5 md:grid md:grid-cols-3 items-stretch mt-8">
          {EachSummary.map((item: SummaryItem, index: number) => (
            <div className="w-full" key={index}>
              <div className="relative mt-[25px] flex flex-col h-[calc(100%-25px)] gap-5 px-5 pb-5 pt-10 cursor-pointer border border-black-normal hover:border-primary rounded-md transition-all duration-500">
                <h3 className="font-h2 !text-left">{item.title}</h3>
                <p className="font-service-text lg:text-[18px]">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

ServiceSummary2.displayName = "ServiceSummary2";

export default ServiceSummary2;
