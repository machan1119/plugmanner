"use client";
import { QuestionsItemType } from "@/libs/types/Types";
import Image from "next/image";
import React, { useState, useCallback } from "react";

const ServiceQuestionItem = ({ item }: { item: QuestionsItemType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className="inline-block relative bg-white border rounded-lg border-gray-200 w-full h-max cursor-pointer p-2"
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleToggle();
        }
      }}
      aria-expanded={isExpanded}
      aria-controls={`answer-${item.question}`}
    >
      <div className="flex justify-between items-center p-4 hover:bg-gray-50 transition-colors font-clash">
        <span className="text-gray-800 text-base md:text-[20px] font-semibold">
          {item.question}
        </span>
        <Image
          width={16}
          height={16}
          alt="expand"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
          className={`transform transition-transform duration-300 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div
        id={`answer-${item.question}`}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? "1000px" : "0",
          opacity: isExpanded ? "1" : "0",
        }}
      >
        <div className="py-2 px-4">
          <div className="text-gray-600">{item.answer}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServiceQuestionItem);
