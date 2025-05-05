import React, { memo } from "react";
import MainButton from "@/components/Buttons";
import { StrapiText } from "@/components/StrapiComponents";
import RatingStar from "@/components/RatingStar";
import { useTranslations } from "next-intl";
import { useFreeServices } from "@/providers/FreeServicesProvider";
import ReviewItem from "../../Services/ServiceReview/ReviewItem";

interface Review {
  title: string;
  rated: number;
  content: string;
  customer: string;
  date: string;
}

const FreeServicesTopReview = () => {
  const { freeServiceItem } = useFreeServices();
  const t = useTranslations("ServiceItem");
  if (!freeServiceItem?.top_reviews) {
    return null;
  }

  return (
    <section className="w-full py-8 md:py-14 lg:py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] w-full flex flex-col gap-8 items-center px-10">
        <div className="flex flex-col gap-4 items-center">
          <h2 id="reviews-heading" className="font-h1">
            <StrapiText
              data={freeServiceItem.top_reviews.header.text}
              customClassName="font-h1"
            />
          </h2>
          <div>
            <RatingStar rating={freeServiceItem.top_reviews.rate} />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
          {freeServiceItem.top_reviews.review.map(
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
          link={`${freeServiceItem.order_btn.api}`}
        />
      </div>
    </section>
  );
};

FreeServicesTopReview.displayName = "FreeServicesTopReview";

export default memo(FreeServicesTopReview);
