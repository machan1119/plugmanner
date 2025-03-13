import React, { memo } from "react";
import { Questions } from "@/libs/data/Questions";
import QuestionsItem from "./QuestionsItem";
import MainButton from "@/components/Buttons";

interface QuestionProps {
  className?: string;
}

const Question = memo(({ className = "" }: QuestionProps) => {
  return (
    <section
      className={`flex flex-col py-12 md:py-16 lg:py-[80px] items-center bg-black-light w-full ${className}`}
    >
      <div className="max-w-[1366px] justify-self-center px-4 sm:px-6 md:px-8 lg:px-10">
        <h2
          id="faq-title"
          className="font-h1-md lg:font-h1-lg mb-8 sm:mb-12 animate-fade-in"
        >
          Your Questions <span className="text-green-light">Answered</span>
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {Questions.map((item, index) => (
            <QuestionsItem
              item={item}
              key={item.question}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between bg-black-medium border-[1px] border-[rgb(224,_224,_224)] rounded-[12px] p-6 w-full h-max hover:shadow-lg transition-all duration-300 animate-fade-in-up">
          <div className="flex flex-col gap-2 mb-4 sm:mb-0">
            <h3 className="text-black text-[16px] md:text-[20px] font-semibold font-clash leading-[25px]">
              Still have questions?
            </h3>
            <p className="text-[rgba(0,0,0,0.5)] text-[14px] md:text-[18px]">
              Can&apos;t find the answer you&apos;re looking for? Please chat to
              our friendly team.
            </p>
          </div>
          <MainButton type="primary" title="Get in touch" />
        </div>
      </div>
    </section>
  );
});

Question.displayName = "Question";

export default Question;
