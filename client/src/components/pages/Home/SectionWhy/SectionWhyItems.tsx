import { ReviewType } from "@/libs/types/Types";
import Image from "next/image";
import React, { memo } from "react";

interface SectionWhyItemsProps {
  item: ReviewType;
  className?: string;
  style?: React.CSSProperties;
}

const SectionWhyItems = memo(
  ({ item, className = "", style }: SectionWhyItemsProps) => {
    return (
      <article
        className={`bg-white border-black-dark text-black rounded-[16px] p-4 sm:p-6 flex flex-col justify-between text-center hover:shadow-lg transition-all duration-300 ${className}`}
        style={style}
        aria-labelledby={`review-title-${item.title}`}
      >
        <div className="flex flex-col gap-3 mb-5">
          <h3 
            id={`review-title-${item.title}`}
            className="font-clash font-semibold text-[18px] sm:text-[20px] leading-[25px] animate-fade-in"
          >
            {item.title}
          </h3>
          <p className="font-satoshi text-[14px] text-black leading-[21px] font-medium text-center animate-fade-in-up">
            {item.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div aria-hidden="true">
            <Image
              width={144}
              height={24}
              alt=""
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e55_why-choose-us_rating-img.svg"
              className="animate-fade-in"
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
  }
);

SectionWhyItems.displayName = "SectionWhyItems";

export default SectionWhyItems;
