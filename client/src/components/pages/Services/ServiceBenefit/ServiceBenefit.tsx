import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { useState } from "react";

const ServiceBenefit = () => {
  const { serviceItems } = useServices();
  const [currentStep, setCurrentStep] = useState(0);
  if (!serviceItems?.introduction.Benefits) return "";
  return (
    <div className="w-full py-[80px] bg-[#14141b] bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/64030a7b422e3a3f6bb5ed7f_Vector-dark-bg.svg')] bg-right-bottom bg-no-repeat bg-auto">
      <div className="max-w-[1366px] justify-self-center px-10">
        <h1 className="font-h1 !text-white">
          <StrapiText
            data={serviceItems.introduction.Benefits.title?.text}
            customClassName="font-h1 !text-white"
          />
        </h1>
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex gap-4 justify-between my-8">
            {serviceItems.introduction.Benefits.Benefit.map((item, index) =>
              currentStep == index ? (
                <div
                  key={index}
                  className="w-full py-2 bg-transparent font-clash text-[18px] !text-center !font-semibold border-b-[2px] border-green-light !text-green-light"
                >
                  {item.tabname}
                </div>
              ) : (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className="w-full py-2 bg-transparent font-clash text-[18px] !text-center !font-semibold border-b-[2px] border-black-dark !text-black-dark hover:border-white hover:!text-white"
                >
                  {item.tabname}
                </button>
              )
            )}
          </div>
          <div className="w-[95%] flex gap-[10%] items-center">
            <Image
              width={500}
              height={500}
              alt={
                serviceItems.introduction.Benefits.Benefit[currentStep].tabname
              }
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${serviceItems.introduction.Benefits.Benefit[currentStep].img.url}`}
              className=""
            />
            <div className="flex flex-col gap-5">
              <StrapiText
                data={
                  serviceItems.introduction.Benefits.Benefit[currentStep].title
                    .text
                }
                customClassName="font-h1 !text-white !text-left"
              />
              <StrapiParagraph
                paragraph={
                  serviceItems.introduction.Benefits.Benefit[currentStep]
                    .paragraph
                }
                customClassName="font-main text-black-steel text-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBenefit;
