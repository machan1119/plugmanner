"use client";
import { QuestionsItemType } from "@/libs/types/Types";
import Image from "next/image";
import React, { useState } from "react";

const QuestionsItem = ({ item }: { item: QuestionsItemType }) => {
  const [status, setStatus] = useState(false);

  return (
    <div
      className="inline-block relative bg-black-medium border-[1px] border-[rgb(224,_224,_224)] rounded-[12px] p-4 w-full h-max cursor-pointer"
      onClick={() => setStatus(!status)}
    >
      <div className="flex justify-between items-center">
        <span className="text-black text-[16px] md:text-[20px] font-semibold font-clash">
          {item.title}
        </span>
        <button className="rounded-[4px] bg-white border-[1px] border-[rgb(224,_224,_224)] p-2">
          <Image
            width={12}
            height={8}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e52_marketing-services_dd%20(Stroke).svg"
            className={`${status ? "arrow-expend" : "allow-collapse"}`}
          />
        </button>
      </div>
      <div
        className={`max-h-0 ${
          status ? "max-h-[500px]" : "max-h-0"
        } overflow-hidden transition-height duration-700 ease-in-out`}
      >
        <div className="mt-5" />
        {item.answer}
      </div>
    </div>
  );
};

export default QuestionsItem;
