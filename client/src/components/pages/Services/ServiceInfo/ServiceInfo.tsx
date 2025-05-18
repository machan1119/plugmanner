import MainButton from "@/components/Buttons";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { memo } from "react";
import ServiceAdvantage from "./ServiceAdvantage";
import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";
import { useTranslations } from "next-intl";

interface ServiceState {
  counters: string;
  character: string;
}

const ServiceInfo = memo(() => {
  const { serviceItems } = useServices();
  const t = useTranslations("ServiceItem");
  if (!serviceItems?.header) {
    return null;
  }
  return (
    <section className="flex flex-col w-full m-auto items-center">
      <div
        rel="preload"
        className="flex lg:flex-row lg:items-start lg:gap-[130px] items-center flex-col gap-[35px] pt-[40px] lg:pt-[80px] w-full max-w-[1366px] px-4 md:px-10 bg-[linear-gradient(#fffffff5,#fff),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat"
      >
        <div className="flex flex-col gap-4 lg:gap-7 lg:w-[50%] lg:items-start items-center lg:text-left grow">
          <h1>
            <StrapiText
              data={serviceItems.header.text}
              customClassName="!font-service text-wrap !text-center lg:!text-left"
            />
          </h1>
          <StrapiText
            data={serviceItems.simpledescription.text}
            customClassName="font-service-text !text-[20px] !text-center lg:!text-left w-[70%]"
          />
          <div className="flex items-center mt-2 gap-2 w-max">
            <Image
              width={24}
              height={24}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/63ff4056e10165cf63568681_Star-icon-2.svg"
              alt=""
              className="mr-1"
            />
            <p className="font-clash text-[#686889] text-[16px] leading-[25px] font-medium">
              {t("Rated")}
              <span className="text-primary font-semibold">
                {serviceItems.introduction.rated}/5
              </span>
              {t("FromOver")} {serviceItems.introduction.CounterOfReviews}
              {t("Reviews")}
            </p>
          </div>
          <ServiceAdvantage />
        </div>
        <div className="z-20 px-8 py-10 flex w-full md:w-[450px] flex-col gap-2 items-center bg-[rgb(20,_20,_27)] bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/63ff3f8c57c2b777f07afb19_socialplug-pricingbox-illustration.svg')] bg-right-top bg-no-repeat bg-auto rounded-2xl">
          <div className="w-full flex flex-col items-start">
            <p className="font-service-card-text text-[16px] !text-black-steel mb-1">
              {t("Starting")}
            </p>
            <p className="font-clash text-[56px] font-semibold text-left leading-[56px] !text-white">
              ${serviceItems.introduction.OrderIntro.price}{" "}
              <span className="font-service-text text-[16px] !font-bold !text-primary">
                / {serviceItems.introduction.OrderIntro.unit}
              </span>
            </p>
          </div>
          <StrapiParagraph
            paragraph={serviceItems.introduction.OrderIntro.list}
            variant="list"
            customClassName="font-service-card-text text-[16px] !text-black-steel mb-2"
          />
          <MainButton
            type="primary"
            title={`${t("OrderNow")} >`}
            customClass="w-full my-4 border-none"
            customChildClass="py-4"
            link={`${serviceItems.ordernow}`}
          />
          <div>
            <Image
              width={316}
              height={24}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67e406c79c42638b4a1576ab_payment-icons-apple.svg"
              alt="payments methods"
              priority={false}
              className="w-full px-4"
            />
          </div>
        </div>
      </div>
      <div className="z-10 mt-[-50px] w-full bg-black-light pt-[100px] flex flex-col items-center gap-[50px]">
        <div className="max-w-[1366px] px-4 md:px-10 w-full flex gap-12 items-center">
          {serviceItems.introduction.StateOfService.States.map(
            (item: ServiceState) => (
              <div
                key={item.character}
                className="text-left flex flex-col gap-2"
              >
                <p className="font-clash text-[36px] md:text-[48px] font-semibold text-left leading-[48px]">
                  {item.counters}
                </p>
                <p className="font-service-text text-[16px] md:text-[18px]">
                  {item.character}
                </p>
              </div>
            )
          )}
        </div>
        <div className="w-full h-[1px] bg-black-normal justify-self-center bottom-[-50px]" />
      </div>
    </section>
  );
});

ServiceInfo.displayName = "ServiceInfo";

export default ServiceInfo;
