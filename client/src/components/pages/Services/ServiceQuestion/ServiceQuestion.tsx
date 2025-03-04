import React, { memo } from "react";
import { useServices } from "@/providers/ServicesProvider";
import { StrapiText } from "@/components/StrapiComponents";
import ServiceQuestionItem from "./ServiceQuestionItem";
import { QuestionType } from "@/libs/types/ServiceJsonDataType";

interface ServiceQuestionProps {
  className?: string;
}

const ServiceQuestion = memo(({ className = "" }: ServiceQuestionProps) => {
  const { serviceItems } = useServices();

  if (!serviceItems?.introduction.FrequentlyQuestions) {
    return null;
  }

  return (
    <section
      className={`
        flex flex-col py-16 md:py-20
        items-center 
        bg-white 
        w-full 
        border-b border-black-normal
        animate-fade-in
        ${className}
      `}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-[1366px] w-full px-4 md:px-10">
        <h2
          id="faq-heading"
          className="
            font-h1-md lg:font-h1-lg 
            mb-8 md:mb-12
            text-center
            animate-fade-in
          "
        >
          <StrapiText
            data={serviceItems.introduction.FrequentlyQuestions.header.text}
            customClassName="
              font-h1-md lg:font-h1-lg 
              mb-8 md:mb-12
              text-center
              animate-fade-in
            "
          />
        </h2>
        <div
          className="
            grid grid-cols-1 xl:grid-cols-2 
            gap-4 md:gap-6 
            mb-5
            animate-fade-in
          "
          style={{ animationDelay: "200ms" }}
          role="list"
          aria-label="Frequently asked questions"
        >
          {serviceItems.introduction.FrequentlyQuestions.Question.map(
            (item: QuestionType, index: number) => (
              <div
                key={`faq-${index + 1}`}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
                role="listitem"
              >
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
