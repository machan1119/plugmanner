import MainButton from "@/components/Buttons";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React from "react";
import ServiceAdvantage from "./ServiceAdvantage";
import { StrapiParagraph, StrapiText } from "@/components/StrapiComponents";

const ServiceInfo = () => {
  const { serviceItems } = useServices();
  if (!serviceItems?.header) return "";
  return (
    <div className="flex flex-col w-full m-auto items-center">
      <div className="flex gap-20 px-[3%] py-[80px] bg-white m-auto max-w-[1366px]">
        <div className="flex flex-col gap-7 w-[50%] text-left grow">
          <h1 className="font-service-main md:font-service-md lg:font-service-lg text-wrap !text-left">
            <StrapiText data={serviceItems.header.text} />
          </h1>
          <StrapiText
            data={serviceItems.simpledescription.text}
            customClassName="font-service-text text-[20px]"
          />
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
                {serviceItems.introduction.rated}/5
              </span>{" "}
              from over {serviceItems.introduction.CounterOfReviews}reviews
            </span>
          </div>
          <ServiceAdvantage />
        </div>
        <div className="z-20 px-8 py-9 flex flex-col gap-6 grow items-center bg-[rgb(20,_20,_27)] bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/63ff3f8c57c2b777f07afb19_socialplug-pricingbox-illustration.svg')] bg-right-top bg-no-repeat bg-auto rounded-xl">
          <div className="w-full flex flex-col items-start">
            <p className="font-service-text text-[16px] !text-black-steel">
              Starting from
            </p>
            <p className="font-service-main md:font-service-md lg:font-service-lg lg:!text-[56px] !text-white">
              ${serviceItems.introduction.OrderIntro.price}{" "}
              <span className="font-service-text text-[16px] !text-green-light">
                / {serviceItems.introduction.OrderIntro.unit}
              </span>
            </p>
          </div>
          <StrapiParagraph
            paragraph={serviceItems.introduction.OrderIntro.list}
            customClassName="font-service-text text-[16px] !text-black-steel"
          />
          <MainButton
            type="green-main"
            title="Order Now >"
            customClass="w-full"
          />
          <Image
            width={316}
            height={24}
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/66292d46e99717b0f56ae2a2_payment-icons-24.svg"
            alt="checkmark icon"
          />
        </div>
      </div>
      <div className="z-10 mt-[-150px] w-full bg-black-light py-[3%] flex flex-col items-center">
        <div className="relative max-w-[1366px] w-full flex gap-8 items-center px-10">
          {serviceItems.introduction.StateOfService.States.map(
            (item, index) => (
              <div key={index} className="text-left">
                <p className="font-service-main !text-[48px]">
                  {item.counters}
                </p>
                <p className="font-service-text text-[16px]">
                  {item.character}
                </p>
              </div>
            )
          )}
          <div className="w-full h-[1px] bg-black-normal absolute justify-self-center bottom-[-50px]" />
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
