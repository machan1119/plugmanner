import { StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { memo } from "react";

const ServiceAdvantage = memo(() => {
  const { serviceItems } = useServices();

  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction?.Quality) {
    return null;
  }

  return (
    <div className="mt-[40px] lg:mt-0 w-max xs:w-full sm:w-max px-4 py-3 flex sm:flex-row flex-col items-start gap-4 lg:items-center bg-[#f6faff] border-[1px] border-black-medium rounded-lg">
      <div className="flex flex-col gap-2 xs:flex-row md:gap-4 items-start">
        {serviceItems.introduction.Quality.list?.map((item, index) => (
          <div className="flex gap-2 items-center" key={index}>
            {item.icon && (
              <div className="relative flex-shrink-0 w-[16px] h-[16px]">
                <Image
                  width={16}
                  height={16}
                  src={item.icon}
                  alt="checkmark icon"
                  className="w-[16px] h-[16px] absolute"
                />
              </div>
            )}
            <StrapiText
              data={item.text}
              customClassName={
                "flex font-service-text text-[14px] leading-[18px]"
              }
            />
          </div>
        ))}
        {/* <StrapiParagraph
        paragraph={serviceItems.introduction.Quality.list}
        customClassName="flex font-service-text text-[14px] leading-[14px]"
        customParentClassName="xs:flex-row"
        /> */}
      </div>
    </div>
  );
});

ServiceAdvantage.displayName = "ServiceAdvantage";

export default ServiceAdvantage;
