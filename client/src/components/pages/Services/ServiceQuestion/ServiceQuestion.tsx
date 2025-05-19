import React, { memo } from "react";
import { useServices } from "@/providers/ServicesProvider";
import { StrapiText } from "@/components/StrapiComponents";
import ServiceQuestionItem from "./ServiceQuestionItem";
import { QuestionType } from "@/libs/types/ServiceJsonDataType";

const ServiceQuestion = memo(() => {
  const { serviceItems } = useServices();

  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.FrequentlyQuestions) {
    return null;
  }
  const maxLength =
    serviceItems.introduction.FrequentlyQuestions.Question.length;
  let middleValue = maxLength / 2;
  if (maxLength % 2 == 1) middleValue += 1;
  return (
    <section className="flex flex-col pt-6 md:pt-14 lg:pt-[80px] items-center bg-white w-full animate-fade-in">
      <div className="max-w-[1366px] w-full px-4 md:px-10">
        <h2 id="faq-heading" className="font-h1 mb-8 md:mb-12 animate-fade-in">
          <StrapiText
            data={serviceItems.introduction.FrequentlyQuestions.header.text}
            customClassName="font-h1 mb-8 md:mb-12 animate-fade-in"
          />
        </h2>
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-5 sm:w-[50%] w-full">
            {serviceItems.introduction.FrequentlyQuestions.Question.slice(
              0,
              middleValue
            ).map((item: QuestionType, index: number) => (
              <div key={index}>
                <ServiceQuestionItem item={item} />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 sm:w-[50%] w-full">
            {serviceItems.introduction.FrequentlyQuestions.Question.slice(
              middleValue,
              maxLength
            ).map((item: QuestionType, index: number) => (
              <div key={index}>
                <ServiceQuestionItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceQuestion.displayName = "ServiceQuestion";

export default ServiceQuestion;
