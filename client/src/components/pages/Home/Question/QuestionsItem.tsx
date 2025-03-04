"use client";
import { QuestionsItemType } from "@/libs/types/Types";
import Image from "next/image";
import React, { useState, useCallback } from "react";

const QuestionsItem = ({ item }: { item: QuestionsItemType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className="inline-block relative bg-black-medium border-[1px] border-[rgb(224,_224,_224)] rounded-[12px] p-4 w-full h-max cursor-pointer transition-all duration-300 hover:border-gray-400"
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
      <div className="flex justify-between items-center">
        <span className="text-black text-[16px] md:text-[20px] font-semibold font-clash">
          {item.question}
        </span>
        <button
          className="rounded-[4px] bg-white border-[1px] border-[rgb(224,_224,_224)] p-2 transition-transform duration-300 hover:bg-gray-50"
          aria-label={isExpanded ? "Collapse answer" : "Expand answer"}
        >
          <Image
            width={12}
            height={8}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
            className={`transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
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
          <div className="text-gray-600">{item.answer}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(QuestionsItem);
