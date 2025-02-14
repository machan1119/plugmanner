import { useServices } from "@/providers/ServicesProvider";
import React from "react";
import QuestionsItem from "../../Home/Question/QuestionsItem";

const ServiceQuestion = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) return "";
  return (
    <div className="flex flex-col py-[80px] items-center bg-white w-full border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] justify-self-center px-10">
        <div className="font-h1-md lg:font-h1-lg mb-12">
          Frequently asked questions
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5">
          {serviceItems.introduction.FrequentlyQuestions.Question.map(
            (item, index) => (
              <QuestionsItem item={item} key={index} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceQuestion;
