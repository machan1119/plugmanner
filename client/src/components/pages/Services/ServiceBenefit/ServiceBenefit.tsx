import MainButton from "@/components/Buttons";
import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { useState, memo, useCallback } from "react";
import { BenefitType } from "@/libs/types/ServiceJsonDataType";

interface ServiceBenefitProps {
  className?: string;
}

const ServiceBenefit = memo(({ className = "" }: ServiceBenefitProps) => {
  const { serviceItems } = useServices();
  const [currentStep, setCurrentStep] = useState(0);

  const handleTabClick = useCallback((index: number) => {
    setCurrentStep(index);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleTabClick(index);
      }
    },
    [handleTabClick]
  );

  if (!serviceItems?.introduction.Benefits) {
    return null;
  }
  if (!serviceItems?.introduction.Benefits.title) {
    return null;
  }

  return (
    <section
      className={`
        w-full py-[80px] bg-[#14141b] bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/64030a7b422e3a3f6bb5ed7f_Vector-dark-bg.svg')] bg-right-bottom bg-no-repeat bg-auto
        ${className}
      `}
      aria-labelledby="benefits-heading"
    >
      <div className="max-w-[1366px] w-full justify-self-center px-10 items-center">
        <StrapiText
          data={serviceItems.introduction.Benefits.title?.text}
          customClassName="font-h1 !text-white"
        />
        <div className="w-full flex flex-col items-center">
          <div
            className="w-full flex flex-col sm:flex-row gap-4 justify-between my-8"
            role="tablist"
            aria-label="Benefit categories"
          >
            {serviceItems.introduction.Benefits.Benefit.map(
              (item: BenefitType, index: number) => (
                <button
                  key={`benefit-${item.title.text[0].content
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  onClick={() => handleTabClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-full py-2 bg-transparent font-clash lg:text-[18px] !text-center !font-semibold border-b-[2px] ${
                    currentStep === index
                      ? "border-green-light !text-green-light"
                      : "border-black-dark !text-black-dark hover:border-white hover:!text-white"
                  }`}
                  role="tab"
                  aria-selected={currentStep === index}
                  aria-controls={`benefit-panel-${index}`}
                  tabIndex={currentStep === index ? 0 : -1}
                >
                  {item.tabname}
                </button>
              )
            )}
          </div>
          {serviceItems.introduction.Benefits.Benefit.map(
            (currentBenefit, index) => (
              <div
                role="tabpanel"
                className={`w-full flex flex-col lg:flex-row gap-8 items-center ${
                  index !== currentStep && "hidden"
                }`}
                key={index}
              >
                <div className="w-full lg:w-[50%] items-center justify-center flex">
                  <img
                    width={500}
                    height={500}
                    alt={`${currentBenefit.title.text[0].content} illustration`}
                    src={currentBenefit.img}
                    className="object-cover"
                  />
                </div>
                <div className="w-full lg:w-[50%] flex flex-col gap-5">
                  <StrapiText
                    data={currentBenefit.title.text}
                    customClassName="font-h1 !text-white !text-left"
                  />
                  <StrapiParagraph
                    paragraph={currentBenefit.paragraph}
                    customClassName="font-main text-[#686889] lg:text-[20px]"
                  />
                  {currentBenefit.Button && (
                    <MainButton
                      type="primary"
                      title={currentBenefit.Button}
                      aria-label={`Learn more about ${currentBenefit.title.text[0].content}`}
                      customClass="w-[30%]"
                    />
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
});

ServiceBenefit.displayName = "ServiceBenefit";

export default ServiceBenefit;
