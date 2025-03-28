"use client";
import { QuestionsItemType } from "@/libs/types/Types";
import Image from "next/image";
import React, { useState, useCallback, memo } from "react";

interface QuestionsItemProps {
  item: QuestionsItemType;
}

const QuestionsItem = memo(({ item }: QuestionsItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <div
      className="inline-block relative bg-black-medium border-[1px] border-[rgb(224,_224,_224)] rounded-[12px] p-4 sm:p-6 w-full h-max cursor-pointer transition-all duration-300 hover:border-gray-400 hover:shadow-md"
      onClick={handleToggle}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-black text-[16px] md:text-[20px] font-semibold font-clash animate-fade-in">
          {item.question}
        </h3>
        <div className="rounded-[4px] bg-white border-[1px] border-[rgb(224,_224,_224)] p-2 transition-all duration-300 hover:bg-gray-50">
          <Image
            width={12}
            height={8}
            className={`w-auto h-auto transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
            priority={false}
          />
        </div>
      </div>
      <div
        id={`answer-${item.question}`}
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100 mt-5"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-gray-600 animate-fade-in-up">{item.answer}</div>
        </div>
      </div>
    </div>
  );
});

QuestionsItem.displayName = "QuestionsItem";

export default QuestionsItem;
