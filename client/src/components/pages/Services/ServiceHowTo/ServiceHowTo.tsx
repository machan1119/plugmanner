import MainButton from "@/components/Buttons";
import { StrapiText } from "@/components/StrapiComponents";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React, { memo } from "react";

interface Step {
  simple: string;
  detail: string;
}

const ServiceHowTo = () => {
  const { serviceItems } = useServices();

  if (!serviceItems?.introduction) {
    return null;
  }
  if (!serviceItems.introduction.HowToOrder) {
    return null;
  }

  return (
    <section className="w-full py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] w-full flex flex-col items-center px-10">
        <StrapiText
          data={serviceItems.introduction.HowToOrder.title.text}
          customClassName="font-h1 w-[50%] text-wrap justify-center"
        />
        <StrapiText
          data={serviceItems.introduction.HowToOrder.description.text}
          customClassName="font-service-text text-[18px] my-5 !text-center"
        />
        <div className="relative w-full flex flex-col gap-5 md:grid md:grid-cols-3 items-center my-5">
          {serviceItems.introduction.HowToOrder.step.map(
            (item: Step, index: number) => (
              <div
                className="flex flex-col items-center gap-5 h-full text-center"
                key={`step-${index + 1}`}
              >
                <div className="flex items-center justify-center bg-black text-white border border-black rounded-md w-[50px] h-[50px] text-xl font-semibold leading-7">
                  {index + 1}
                </div>
                <h3 className="font-h2">{item.simple}</h3>
                <p className="font-service-text !text-center">{item.detail}</p>
              </div>
            )
          )}
          <Image
            width={260}
            height={55}
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6400d6caf94166be7ca4de87_6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
            className="absolute self-start top-[10px] left-[20%] w-[25%] hidden lg:flex"
            priority={false}
          />
          <Image
            width={260}
            height={55}
            alt=""
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6400d6caf94166be7ca4de87_6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
            className="absolute self-start top-[10px] right-[20%] w-[25%] hidden lg:flex"
            priority={false}
          />
        </div>
        <MainButton
          type="primary"
          title="Order Now >"
          customClass="md:w-[20%] w-full"
        />
      </div>
    </section>
  );
};

ServiceHowTo.displayName = "ServiceHowTo";

export default memo(ServiceHowTo);
