import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ReviewItem from "../ServiceReview/ReviewItem";
import MainButton from "@/components/Buttons";

const ServiceCustomerReview = () => {
  const { serviceItems, isLoading } = useServices();
  const [readHeight, setReadHeight] = useState<number | undefined>(400);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(0);
  const readRef = useRef<HTMLDivElement>(null);
  const maxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReadHeight(readRef?.current?.clientHeight);
    setMaxHeight(maxRef?.current?.clientHeight);
  });

  console.log(readHeight);
  if (!serviceItems?.customerReview) return <div className="">no data</div>;
  return (
    <div className="py-[80px] flex flex-col items-center px-10 border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] flex flex-col gap-7 w-full items-center mb-8">
        <div className="flex flex-col gap-5 items-center w-full">
          <h1 className="font-h1 text-wrap">Customer Reviews</h1>
          <div className="font-service-text text-[18px] w-[50%] !text-center">
            Read what our customers think about this service. We take your
            feedback seriously - help us improve by{" "}
            <span className="text-green-light underline">leaving a review</span>
            .
          </div>
          <div className="flex items-center mt-2">
            <Image
              width={24}
              height={24}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/63ff4056e10165cf63568681_Star-icon-2.svg"
              alt="checkmark icon"
              className="mr-1"
            />
            <span className="font-clash text-[#686889] text-[16px] leading-[25px] font-medium">
              Rated{" "}
              <span className="text-green-light font-semibold">
                {serviceItems.info.rate}/5
              </span>{" "}
              from over {serviceItems.info.reviews}reviews
            </span>
          </div>
        </div>
        <div
          className="relative overflow-hidden mt-6 h-[500px]"
          ref={readRef}
          style={{ height: readHeight }}
        >
          <div className="w-full columns-[300px] gap-5 h-max" ref={maxRef}>
            {serviceItems.customerReview.map((item, index) => (
              <ReviewItem
                title={item.title}
                comment={item.comment}
                customerName={item.customerName}
                date={item.date}
                key={index}
              />
            ))}
            <div className="absolute z-[50] bg-[linear-gradient(rgb(0,0,0,0),rgb(255,255,255))] h-[200px] w-full bottom-0 left-0" />
          </div>
        </div>
      </div>
      {readHeight &&
        maxHeight &&
        (readHeight <= maxHeight ? (
          <MainButton
            type="white-main"
            title="Show More +"
            customClass="w-[30%]"
            handleClick={() => setReadHeight(readHeight + 200)}
          />
        ) : (
          <MainButton
            type="white-main"
            title="Show Less -"
            customClass="w-[30%]"
            handleClick={() => setReadHeight(500)}
          />
        ))}
    </div>
  );
};

export default ServiceCustomerReview;
