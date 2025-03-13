import RatingStar from "@/components/RatingStar";
import React, { memo } from "react";

interface ReviewItemProps {
  title: string;
  comment: string;
  customerName: string;
  date: string;
  rating: number;
}

const ReviewItem = ({
  title,
  comment,
  customerName,
  date,
  rating,
}: ReviewItemProps) => {
  return (
    <article className="mb-5 flex flex-col gap-2 p-6 bg-white grow rounded-xl border border-[#e2e2e2] break-inside-avoid">
      <div className="font-h1 !text-left">&#34;</div>
      <h3 id={`review-title-${customerName}`} className="font-h2">
        {title}
      </h3>
      <div>
        <RatingStar rating={rating} />
      </div>
      <p className="font-service-text text-[16px] text-wrap">{comment}</p>
      <p className="font-clash text-[16px] text-[rgba(104,_104,_137,_0.5)] font-normal">
        Review submitted by{" "}
        <span className="font-semibold">{customerName}</span>
      </p>
      <time dateTime={date} className="font-service-text text-[12px]">
        {date}
      </time>
    </article>
  );
};

ReviewItem.displayName = "ReviewItem";

export default memo(ReviewItem);
