import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React from "react";
import ReviewItem from "./ReviewItem";
import MainButton from "@/components/Buttons";

const ServiceReview = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.introduction) return <div className="">no data</div>;
  return (
    <div className="w-full py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] w-full flex flex-col gap-10 items-center px-10">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="font-h1">Trusted by 100k+ customers</h1>
          <Image
            width={144}
            height={24}
            alt="5stars"
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e55_why-choose-us_rating-img.svg"
          />
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2">
          {serviceItems.introduction.TopReviews.review.map((item, index) => (
            <ReviewItem
              title={item.title}
              comment={item.content}
              customerName={item.customer}
              date={item.date}
              key={index}
            />
          ))}
        </div>
        <MainButton
          type="green-main"
          title="Order Now >"
          customClass="w-[20%]"
        />
      </div>
    </div>
  );
};

export default ServiceReview;
