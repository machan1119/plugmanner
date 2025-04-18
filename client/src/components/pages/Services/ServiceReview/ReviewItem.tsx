import RatingStar from "@/components/RatingStar";
import { useTranslations } from "next-intl";
import Image from "next/image";
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
  const t = useTranslations("ServiceItem");
  return (
    <article className="mb-5 flex flex-col gap-2 p-6 bg-white grow rounded-xl border border-[#e2e2e2] break-inside-avoid">
      <Image
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/642aa24862a9ec01de9afae0_quotes-fill.svg"
        alt="review"
        width={25}
        height={25}
      />
      <p id={`review-title-${customerName}`} className="font-h2 !text-black">
        {title}
      </p>
      <div>
        <RatingStar rating={rating} />
      </div>
      <p className="font-service-text text-[16px] text-wrap">{comment}</p>
      <p className="font-clash text-[16px] text-[rgba(104,_104,_137,_0.5)] font-normal">
        {t("ReviewSubmit")}
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
