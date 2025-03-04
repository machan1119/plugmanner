import { useServices } from "@/providers/ServicesProvider";
import React, { memo } from "react";
import ReviewItem from "./ReviewItem";
import MainButton from "@/components/Buttons";
import { StrapiText } from "@/components/StrapiComponents";
import RatingStar from "@/components/RatingStar";

interface Review {
  title: string;
  rated: number;
  content: string;
  customer: string;
  date: string;
}

const ServiceReview = () => {
  const { serviceItems } = useServices();

  if (!serviceItems?.introduction.TopReviews) {
    return null;
  }

  return (
    <section
      className="w-full py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal"
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-[1366px] w-full flex flex-col gap-10 items-center px-10">
        <div className="flex flex-col gap-4 items-center">
          <h2 id="reviews-heading" className="font-h1">
            <StrapiText
              data={serviceItems.introduction.TopReviews.header.text}
              customClassName="font-h1"
            />
          </h2>
          <div
            aria-label={`Rating: ${serviceItems.introduction.TopReviews.rate} stars`}
          >
            <RatingStar rating={serviceItems.introduction.TopReviews.rate} />
          </div>
        </div>
        <div
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2"
          role="list"
          aria-label="Customer reviews"
        >
          {serviceItems.introduction.TopReviews.review.map((item: Review) => (
            <ReviewItem
              title={item.title}
              rating={item.rated}
              comment={item.content}
              customerName={item.customer}
              date={item.date}
              key={`${item.customer}-${item.date}`}
            />
          ))}
        </div>
        <MainButton
          type="primary"
          title="Order Now >"
          customClass="md:w-[20%] w-full"
          aria-label="Order service now"
        />
      </div>
    </section>
  );
};

ServiceReview.displayName = "ServiceReview";

export default memo(ServiceReview);
