import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import ReviewItem from "../ServiceReview/ReviewItem";
import MainButton from "@/components/Buttons";
import { StrapiText } from "@/components/StrapiComponents";
import { Review } from "@/libs/types/ServiceJsonDataType";

const INITIAL_HEIGHT = 400;
const HEIGHT_INCREMENT = 200;

const ServiceCustomerReview = () => {
  const { serviceItems } = useServices();
  const [readHeight, setReadHeight] = useState<number | undefined>(
    INITIAL_HEIGHT
  );
  const [maxHeight, setMaxHeight] = useState<number | undefined>(0);
  const readRef = useRef<HTMLDivElement>(null);
  const maxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReadHeight(readRef?.current?.clientHeight);
    setMaxHeight(maxRef?.current?.clientHeight);
  }, []);

  const handleShowMore = useCallback(() => {
    setReadHeight((prev) => prev && prev + HEIGHT_INCREMENT);
  }, []);

  const handleShowLess = useCallback(() => {
    setReadHeight(INITIAL_HEIGHT);
  }, []);

  if (!serviceItems?.introduction.CustomerReviews) {
    return null;
  }

  const showMoreButton = readHeight && maxHeight && readHeight < maxHeight;
  const showLessButton = readHeight && maxHeight && readHeight >= maxHeight;

  return (
    <section className="py-[80px] flex flex-col items-center border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] px-10 flex flex-col gap-7 w-full items-center mb-8">
        <div className="flex flex-col gap-5 items-center w-full">
          <StrapiText
            data={serviceItems.introduction.CustomerReviews.title.text}
            customClassName="font-h1 text-wrap"
          />
          <StrapiText
            data={serviceItems.introduction.CustomerReviews.text[0].text}
            customClassName="font-service-text text-[18px] lg:w-[50%] !text-center"
          />
          <div className="flex items-center mt-2">
            <Image
              width={24}
              height={24}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/63ff4056e10165cf63568681_Star-icon-2.svg"
              alt=""
              className="mr-1"
            />
            <span className="font-clash text-[#686889] text-[16px] leading-[25px] font-medium">
              Rated{" "}
              <span className="text-primary font-semibold">
                {serviceItems.introduction.CustomerReviews.rate}/5
              </span>{" "}
              from over{" "}
              {serviceItems.introduction.CustomerReviews.counterofreviews}
              reviews
            </span>
          </div>
        </div>
        <div
          className="relative overflow-hidden mt-6 min-h-[500px] w-full"
          ref={readRef}
          style={{ height: readHeight }}
        >
          <div className="w-full columns-[300px] gap-5 h-max" ref={maxRef}>
            {serviceItems.introduction.CustomerReviews.Review.map(
              (item: Review, index: number) => (
                <ReviewItem
                  title={item.title}
                  rating={item.rated}
                  comment={item.content}
                  customerName={item.customer}
                  date={item.date}
                  key={index}
                />
              )
            )}
            <div className="absolute z-20 bg-[linear-gradient(rgb(0,0,0,0),rgb(255,255,255))] h-[200px] w-full bottom-0 left-0" />
          </div>
        </div>
      </div>
      {showMoreButton && (
        <MainButton
          type="white-main"
          title="Show More +"
          customClass="w-[278px]"
          handleClick={handleShowMore}
        />
      )}
      {showLessButton && (
        <MainButton
          type="white-main"
          title="Show Less -"
          customClass="w-[278px]"
          handleClick={handleShowLess}
        />
      )}
    </section>
  );
};

ServiceCustomerReview.displayName = "ServiceCustomerReview";

export default memo(ServiceCustomerReview);
