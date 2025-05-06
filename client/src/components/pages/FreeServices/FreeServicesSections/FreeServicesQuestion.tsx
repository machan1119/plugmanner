import React, { memo } from "react";
import { StrapiText } from "@/components/StrapiComponents";
import { QuestionType } from "@/libs/types/ServiceJsonDataType";
import ServiceQuestionItem from "../../Services/ServiceQuestion/ServiceQuestionItem";
import { useFreeServices } from "@/providers/FreeServicesProvider";

const FreeServicesQuestion = memo(() => {
  const { freeServiceItem } = useFreeServices();
  if (!freeServiceItem?.FAQ) {
    return null;
  }
  const maxLength = freeServiceItem.FAQ.Question.length;
  let middleValue = maxLength / 2;
  if (maxLength % 2 == 1) middleValue += 1;
  return (
    <section className="flex flex-col py-6 md:py-14 lg:py-[80px] items-center bg-white w-full animate-fade-in">
      <div className="max-w-[1366px] w-full px-4 md:px-10">
        <h2 id="faq-heading" className="font-h1 mb-8 md:mb-12 animate-fade-in">
          <StrapiText
            data={freeServiceItem.FAQ.header.text}
            customClassName="font-h1 mb-8 md:mb-12 animate-fade-in"
          />
        </h2>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-5 w-[50%] sm:w-full">
            {freeServiceItem.FAQ.Question.slice(0, middleValue).map(
              (item: QuestionType, index: number) => (
                <div key={index}>
                  <ServiceQuestionItem item={item} />
                </div>
              )
            )}
          </div>
          <div className="flex flex-col gap-5 w-[50%] sm:w-full">
            {freeServiceItem.FAQ.Question.slice(middleValue, maxLength).map(
              (item: QuestionType, index: number) => (
                <div key={index}>
                  <ServiceQuestionItem item={item} />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

FreeServicesQuestion.displayName = "FreeServicesQuestion";

export default FreeServicesQuestion;
