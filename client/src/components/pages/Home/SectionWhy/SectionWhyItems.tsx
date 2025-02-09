import { ReviewType } from "@/libs/types/Types";
import Image from "next/image";
import React from "react";

const SectionWhyItems = ({ item }: { item: ReviewType }) => {
  return (
    <div className="bg-white border-black-dark text-black rounded-[16px] p-6 flex flex-col justify-between text-center">
      <div className="flex flex-col gap-3 mb-5">
        <h2 className="font-clash font-semibold text-[20px] leading-[25px]">
          {item.title}
        </h2>
        <p className="font-main">{item.description}</p>
      </div>
      <div className="flex flex-col gap-3 items-center">
        <Image
          width={144}
          height={24}
          className="w-auto h-auto"
          alt=""
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e55_why-choose-us_rating-img.svg"
        />
        <div className="flex flex-col gap-2">
          <span className="font-satoshi text-[18px] leading-[27px] font-medium">
            {item.title}
          </span>
          <span className="font-main">{item.date}</span>
        </div>
      </div>
    </div>
  );
};

export default SectionWhyItems;
