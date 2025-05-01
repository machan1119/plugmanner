import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { useState, memo, useCallback } from "react";
import ReviewItem from "../ServiceReview/ReviewItem";
import MainButton from "@/components/Buttons";
import { StrapiText } from "@/components/StrapiComponents";
import { Review } from "@/libs/types/ServiceJsonDataType";
import { useTranslations } from "next-intl";

const INITIAL_COUNT = 10;
const COUNT_INCREMENT = 5;

const ServiceCustomerReview = () => {
  const { serviceItems } = useServices();
  const t = useTranslations("ServiceItem");
  const [count, setCount] = useState(INITIAL_COUNT);

  const handleShowMore = useCallback(() => {
    setCount((prev) => prev + COUNT_INCREMENT);
  }, []);

  const handleShowLess = useCallback(() => {
    setCount(INITIAL_COUNT);
  }, []);

  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.CustomerReviews) {
    return null;
  }
  const maxCount = serviceItems.introduction.CustomerReviews.Review.length;

  const showMoreButton = count < maxCount;
  const showLessButton = count > INITIAL_COUNT && count >= maxCount;

  return (
    <section className="py-6 md:py-16 lg:py-[80px] flex flex-col items-center">
      <div className="max-w-[1366px] px-10 flex flex-col gap-7 w-full items-center mb-8">
        <div className="flex flex-col gap-5 items-center w-full">
          <h2>
            <StrapiText
              data={serviceItems.introduction.CustomerReviews.title.text}
              customClassName="font-h1 text-wrap"
            />
          </h2>
          <StrapiText
            data={serviceItems.introduction.CustomerReviews.text[0].text}
            customClassName="font-service-text text-[16px] w-[70%] lg:w-[50%] !text-center"
          />
          <div className="flex items-center mt-6">
            <Image
              width={24}
              height={24}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/63ff4056e10165cf63568681_Star-icon-2.svg"
              alt=""
              className="mr-1"
            />
            <span className="font-clash text-[#686889] text-[16px] leading-[25px] font-medium">
              {t("Rated")}
              <span className="text-primary font-semibold">
                {serviceItems.introduction.CustomerReviews.rate}/5
              </span>
              {t("FromOver")}
              {serviceItems.introduction.CustomerReviews.counterofreviews}
              {t("Reviews")}
            </span>
          </div>
        </div>
        <div className="relative overflow-hidden mt-6 min-h-[500px] w-full">
          <div className="w-full columns-[300px] gap-5 h-max">
            {serviceItems.introduction.CustomerReviews.Review.slice(
              0,
              count
            ).map((item: Review, index: number) => (
              <ReviewItem
                title={item.title}
                rating={item.rated}
                comment={item.content}
                customerName={item.customer}
                date={item.date}
                key={index}
              />
            ))}
            <div className="absolute z-20 bg-[linear-gradient(rgb(0,0,0,0),rgb(255,255,255))] h-[200px] w-full bottom-0 left-0" />
          </div>
        </div>
      </div>
      {showMoreButton && (
        <MainButton
          type="white-main"
          title={t("ShowMore")}
          customClass="w-[278px]"
          customChildClass="py-4"
          handleClick={handleShowMore}
        />
      )}
      {showLessButton && (
        <MainButton
          type="white-main"
          title={t("ShowLess")}
          customClass="w-[278px]"
          handleClick={handleShowLess}
        />
      )}
    </section>
  );
};

ServiceCustomerReview.displayName = "ServiceCustomerReview";

export default memo(ServiceCustomerReview);
