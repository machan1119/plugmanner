import Image from "next/image";
import React from "react";

interface ReviewItemType {
  title: string;
  comment: string;
  customerName: string;
  date: string;
}

const ReviewItem = ({ title, comment, customerName, date }: ReviewItemType) => {
  return (
    <div className="flex flex-col gap-2 p-6 bg-white grow rounded-xl">
      <h1 className="font-h1 !text-left">"</h1>
      <h2 className="font-h2">{title}</h2>
      <Image
        width={144}
        height={24}
        alt="5stars"
        src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e55_why-choose-us_rating-img.svg"
      />
      <p className="font-service-text text-[16px]">{comment}</p>
      <p className="font-clash text-[16px] text-[rgba(104,_104,_137,_0.5)] font-normal">
        Review submitted by{" "}
        <span className="font-semibold">{customerName}</span>
      </p>
      <p className="font-service-text text-[12px]">{date}</p>
    </div>
  );
};

export default ReviewItem;
