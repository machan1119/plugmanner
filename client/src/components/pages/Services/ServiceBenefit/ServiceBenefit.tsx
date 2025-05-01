import MainButton from "@/components/Buttons";
import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import React, { useState, memo, useCallback } from "react";
import { BenefitType } from "@/libs/types/ServiceJsonDataType";
import Image from "next/image";

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
  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.Benefits) {
    return null;
  }
  if (!serviceItems.introduction.Benefits?.title) {
    return null;
  }

  return (
    <section
      className={`
        w-full py-8 md:py-[80px] bg-[#14141b] bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/64030a7b422e3a3f6bb5ed7f_Vector-dark-bg.svg')] bg-right-bottom bg-no-repeat bg-auto
        ${className}
      `}
    >
      <div className="max-w-[1366px] w-full justify-self-center px-10 items-center">
        <h2>
          <StrapiText
            data={serviceItems.introduction.Benefits.title?.text}
            customClassName="font-h1 !text-white"
          />
        </h2>
        <div className="w-full flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row justify-between my-8">
            {serviceItems.introduction.Benefits.Benefit.map(
              (item: BenefitType, index: number) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`w-full px-6 py-4 bg-transparent font-clash lg:text-[18px] !text-center leading-4 !font-semibold border-b-[2px] ${
                    currentStep === index
                      ? "border-primary !text-primary"
                      : "border-black-dark !text-black-dark hover:border-white hover:!text-white"
                  }`}
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
                className={`w-full flex flex-col lg:flex-row gap-8 items-center ${
                  index !== currentStep && "hidden"
                }`}
                key={index}
              >
                <div className="w-full lg:w-[50%] items-center justify-center flex">
                  <Image
                    width={500}
                    height={500}
                    loading="eager"
                    priority
                    alt={`illustration`}
                    src={currentBenefit.img}
                    className="lg:w-[80%] w-[60%]"
                  />
                </div>
                <div className="w-full lg:w-[50%] flex flex-col gap-5">
                  <h2>
                    <StrapiText
                      data={currentBenefit.title.text}
                      customClassName="font-h1 !text-white !text-left"
                    />
                  </h2>
                  <StrapiParagraph
                    paragraph={currentBenefit.paragraph}
                    customClassName="font-satoshi !text-[18px] text-black-steel"
                  />
                  {currentBenefit.Button && (
                    <MainButton
                      type="primary"
                      title={currentBenefit.Button}
                      customClass="w-max !border-none mt-10"
                      customChildClass="px-12 py-4"
                      link={`${serviceItems.ordernow}`}
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
