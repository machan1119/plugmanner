import { useServices } from "@/providers/ServicesProvider";
import React, { memo } from "react";
import ReviewItem from "./ReviewItem";
import MainButton from "@/components/Buttons";
import { StrapiText } from "@/components/StrapiComponents";
import RatingStar from "@/components/RatingStar";
import { useTranslations } from "next-intl";

interface Review {
  title: string;
  rated: number;
  content: string;
  customer: string;
  date: string;
}

const ServiceReview = () => {
  const { serviceItems } = useServices();
  const t = useTranslations("ServiceItem");
  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.TopReviews) {
    return null;
  }

  return (
    <section className="w-full py-8 md:py-14 lg:py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] w-full flex flex-col gap-8 items-center px-10">
        <div className="flex flex-col gap-4 items-center">
          <h2 id="reviews-heading" className="font-h1">
            <StrapiText
              data={serviceItems.introduction.TopReviews.header.text}
              customClassName="font-h1"
            />
          </h2>
          <div>
            <RatingStar rating={serviceItems.introduction.TopReviews.rate} />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {serviceItems.introduction.TopReviews.review.map(
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
        </div>
        <MainButton
          type="primary"
          title={`${t("OrderNow")} >`}
          customClass="sm:w-[45%] xl:w-[20%] w-full"
          customChildClass="py-4"
          link={`${serviceItems.ordernow}`}
        />
      </div>
    </section>
  );
};

ServiceReview.displayName = "ServiceReview";

export default memo(ServiceReview);
