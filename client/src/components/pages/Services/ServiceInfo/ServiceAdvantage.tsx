import { StrapiParagraph } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import React, { memo } from "react";

const ServiceAdvantage = memo(() => {
  const { serviceItems } = useServices();

  if (!serviceItems?.introduction.Quality) {
    return null;
  }

  return (
    <div
      className="w-max px-4 py-3 flex sm:flex-row flex-col items-start gap-4 lg:items-center bg-[#f6faff] border-[1px] border-black-medium rounded-lg"
      role="complementary"
      aria-label="Service advantages"
    >
      <StrapiParagraph
        paragraph={serviceItems.introduction.Quality.list}
        customClassName="flex font-service-text text-[14px] leading-[28px]"
        customParentClassName="sm:flex-row"
      />
    </div>
  );
});

ServiceAdvantage.displayName = "ServiceAdvantage";

export default ServiceAdvantage;
