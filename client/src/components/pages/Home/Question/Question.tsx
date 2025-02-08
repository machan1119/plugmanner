import React from "react";
import { Questions } from "@/libs/data/Questions";
import QuestionsItem from "./QuestionsItem";
import MainButton from "@/components/Buttons";

const Question = () => {
  return (
    <div className="flex flex-col py-[5%] px-[10%] items-center bg-black-light w-full">
      <div className="font-h1 mb-12">
        Your Questions <span className="text-green-light">Answered</span>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-5">
        {Questions.map((item, index) => (
          <QuestionsItem item={item} key={index} />
        ))}
      </div>
      <div className="flex justify-between bg-black-medium border-[1px] border-[rgb(224,_224,_224)] rounded-[12px] p-6 w-full h-max">
        <div className="flex flex-col gap-2">
          <span className="text-black text-[20px] font-semibold font-clash leading-[25px]">
            Still have questions?
          </span>
          <span className="text-[rgba(0,0,0,0.5)] text-[18px] leading-[27px]">
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </span>
        </div>
        <MainButton type="green-main" title="Get in touch" />
      </div>
    </div>
  );
};

export default Question;
