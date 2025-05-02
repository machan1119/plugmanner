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

  return (
    <section className="flex flex-col py-6 md:py-14 lg:py-[80px] items-center bg-white w-full animate-fade-in">
      <div className="max-w-[1366px] w-full px-4 md:px-10">
        <h2 id="faq-heading" className="font-h1 mb-8 md:mb-12 animate-fade-in">
          <StrapiText
            data={serviceItems.introduction.FrequentlyQuestions.header.text}
            customClassName="font-h1 mb-8 md:mb-12 animate-fade-in"
          />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5">
          {serviceItems.introduction.FrequentlyQuestions.Question.map(
            (item: QuestionType, index: number) => (
              <div key={index}>
                <ServiceQuestionItem item={item} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
});

ServiceQuestion.displayName = "ServiceQuestion";

export default ServiceQuestion;
