import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import React, { useState, memo, useCallback } from "react";
import { BenefitType } from "@/libs/types/ServiceJsonDataType";
import Image from "next/image";
import { useFreeServices } from "@/providers/FreeServicesProvider";

const FreeServicesBenefit = memo(() => {
  const { freeServiceItem } = useFreeServices();
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
  if (!freeServiceItem?.benefits) {
    return null;
  }
  if (!freeServiceItem.benefits?.title) {
    return null;
  }

  return (
    <section className="w-full py-6 md:py-16 lg:py-[80px] bg-[#14141b] bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/64030a7b422e3a3f6bb5ed7f_Vector-dark-bg.svg')] bg-right-bottom bg-no-repeat bg-auto">
      <div className="max-w-[1366px] w-full justify-self-center px-10 items-center">
        <h2>
          <StrapiText
            data={freeServiceItem.benefits.title?.text}
            customClassName="font-h1 !text-white"
          />
        </h2>
        <div className="w-full flex flex-col gap-5 items-center">
          <div className="w-full flex flex-col sm:gap-3 sm:flex-row justify-between my-8">
            {freeServiceItem.benefits.Benefit.map(
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
          {freeServiceItem.benefits.Benefit.map((currentBenefit, index) => (
            <div
              className={`w-full flex flex-col md:flex-row gap-8 items-center ${
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
                  className="md:w-full w-[60%]"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FreeServicesBenefit.displayName = "FreeServicesBenefit";

export default FreeServicesBenefit;
