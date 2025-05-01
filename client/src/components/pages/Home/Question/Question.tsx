import React, { memo } from "react";
import QuestionsItem from "./QuestionsItem";
import MainButton from "@/components/Buttons";
import { useTranslations } from "next-intl";

const Question = memo(() => {
  const t = useTranslations("Home");
  const Questions = [
    {
      question: t("Question.Questions.0.question"),
      answer: t("Question.Questions.0.answer"),
    },
    {
      question: t("Question.Questions.1.question"),
      answer: t("Question.Questions.1.answer"),
    },
    {
      question: t("Question.Questions.2.question"),
      answer: t("Question.Questions.2.answer"),
    },
    {
      question: t("Question.Questions.3.question"),
      answer: t("Question.Questions.3.answer"),
    },
  ];

  return (
    <section className="flex flex-col py-12 md:py-16 lg:py-[80px] items-center bg-black-light w-full">
      <div className="max-w-[1366px] justify-self-center px-4 sm:px-6 md:px-8 lg:px-10">
        <h2 id="faq-title" className="font-h1 mb-8 sm:mb-12 animate-fade-in">
          {t("Question.title_1")}
          <span className="text-primary">{t("Question.title_2")}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 sm:mb-6">
          {Questions.map((item) => (
            <QuestionsItem item={item} key={item.question} />
          ))}
        </div>
        <div className="flex flex-col gap-5 sm:flex-row justify-between bg-black-medium border-[1px] border-[rgb(224,_224,_224)] rounded-[12px] p-8 w-full h-max hover:shadow-lg transition-all duration-300 animate-fade-in-up">
          <div className="flex flex-col gap-2 mb-4 sm:mb-0">
            <h3 className="text-black text-[16px] md:text-[20px] font-[650] font-clash leading-[25px]">
              {t("Question.Still_have_questions.title")}
            </h3>
            <p className="text-[rgba(0,0,0,0.5)] text-[14px] md:text-[18px]">
              {t("Question.Still_have_questions.description")}
            </p>
          </div>
          <MainButton
            type="primary"
            title={t("Question.Still_have_questions.button")}
          />
        </div>
      </div>
    </section>
  );
});

Question.displayName = "Question";

export default Question;
