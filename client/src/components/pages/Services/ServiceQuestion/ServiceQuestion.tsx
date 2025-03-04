import { useServices } from "@/providers/ServicesProvider";
import React from "react";
import { StrapiText } from "@/components/StrapiComponents";
import ServiceQuestionItem from "./ServiceQuestionItem";

const ServiceQuestion = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction.FrequentlyQuestions) {
    return "";
  }
  return (
    <div className="flex flex-col py-[80px] items-center bg-white w-full border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] justify-self-center px-10">
        <StrapiText
          data={serviceItems.introduction.FrequentlyQuestions.header.text}
          customClassName="font-h1-md lg:font-h1-lg mb-12"
        />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5">
          {serviceItems.introduction.FrequentlyQuestions.Question.map(
            (item, index) => (
              <ServiceQuestionItem item={item} key={index} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceQuestion;
