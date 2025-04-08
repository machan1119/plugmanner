import { ReviewType } from "@/libs/types/Types";
import Image from "next/image";
import React, { memo } from "react";

interface SectionWhyItemsProps {
  item: ReviewType;
}

const SectionWhyItems = memo(({ item }: SectionWhyItemsProps) => {
  return (
    <article className="bg-white border border-black-dark/50 text-black rounded-[16px] p-4 sm:p-6 flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col gap-3 mb-5">
        <p
          id={`review-title-${item.title}`}
          className="font-clash font-semibold text-[18px] sm:text-[20px] leading-[25px] animate-fade-in"
        >
          {item.title}
        </p>
        <p className="font-satoshi text-[14px] text-black leading-[21px] font-medium text-center animate-fade-in-up">
          {item.description}
        </p>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <div>
          <Image
            width={144}
            height={24}
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e55_why-choose-us_rating-img.svg"
            priority={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-satoshi text-[16px] sm:text-[18px] leading-[27px] font-medium animate-fade-in">
            {item.title}
          </p>
          <time
            dateTime={item.date}
            className="font-satoshi text-[14px] text-black leading-[21px] font-medium text-center animate-fade-in-up"
          >
            {item.date}
          </time>
        </div>
      </div>
    </article>
  );
});

SectionWhyItems.displayName = "SectionWhyItems";

export default SectionWhyItems;
