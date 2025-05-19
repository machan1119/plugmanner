import MainButton from "@/components/Buttons";
import { StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { memo } from "react";

interface Step {
  simple: string;
  detail: string;
}

const ServiceHowTo = () => {
  const { serviceItems } = useServices();
  const t = useTranslations("ServiceItem");
  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction.HowToOrder) {
    return null;
  }

  return (
    <section className="w-full py-6 md:py-14 lg:py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] w-full flex flex-col items-center px-4 md:px-10">
        <h2 className="font-h1 sm:80% lg:w-[50%] text-wrap justify-center">
          <StrapiText data={serviceItems.introduction.HowToOrder.title.text} />
        </h2>
        <div className="sm:80% md:w-[70%] lg:w-[40%]">
          <StrapiText
            data={serviceItems.introduction.HowToOrder.description.text}
            customClassName="font-service-text text-[16px] my-5 !text-center"
          />
        </div>
        <div className="relative w-full flex flex-col gap-12 sm:grid sm:grid-cols-3 items-center my-10">
          {serviceItems.introduction.HowToOrder.step.map(
            (item: Step, index: number) => (
              <div
                className="flex flex-col items-center gap-5 h-full text-center"
                key={`step-${index + 1}`}
              >
                <div className="flex items-center justify-center bg-[rgb(20,_20,_27)] text-white border border-black rounded-md w-[50px] h-[50px] font-clash text-2xl font-semibold leading-7">
                  {index + 1}
                </div>
                <p className="font-h2 !text-black w-[70%]">{item.simple}</p>
                <p className="font-service-text !text-center">{item.detail}</p>
              </div>
            )
          )}
          <Image
            width={260}
            height={55}
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6400d6caf94166be7ca4de87_6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
            className="absolute self-start top-[20px] left-[22%] w-[20%] hidden md:flex"
            priority={false}
          />
          <Image
            width={260}
            height={55}
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6400d6caf94166be7ca4de87_6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
            className="absolute self-start top-[20px] right-[22%] w-[20%] hidden md:flex"
            priority={false}
          />
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

ServiceHowTo.displayName = "ServiceHowTo";

export default memo(ServiceHowTo);
