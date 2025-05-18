import { StrapiText } from "@/components/StrapiComponents";
import { useFreeServices } from "@/providers/FreeServicesProvider";
import Image from "next/image";
import React, { memo } from "react";

const FreeServicesHowTo = () => {
  const { freeServiceItem } = useFreeServices();
  if (!freeServiceItem?.how_to_order) {
    return null;
  }

  return (
    <section className="w-full py-6 md:py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-dark">
      <div className="max-w-[1366px] w-full flex flex-col items-center px-4 md:px-10">
        <h2 className="font-h1 w-full text-wrap justify-center">
          <StrapiText
            data={freeServiceItem?.how_to_order.title.text}
            customClassName="sm:w-[80%] lg:w-[50%] mx-auto"
          />
        </h2>
        {freeServiceItem?.how_to_order.description && (
          <div className="sm:80% md:w-[70%] lg:w-[40%]">
            <StrapiText
              data={freeServiceItem?.how_to_order.description.text}
              customClassName="font-service-text text-[16px] my-5 !text-center"
            />
          </div>
        )}
        <div className="relative w-full flex flex-col md:gap-12 sm:grid sm:grid-cols-3 items-center my-10">
          {freeServiceItem?.how_to_order.step.map((item, index) => (
            <div
              className="flex flex-col items-center gap-5 h-full text-center"
              key={index}
            >
              <div className="flex items-center justify-center bg-[rgb(20,_20,_27)] text-white border border-black rounded-md w-[50px] h-[50px] font-clash text-2xl font-semibold leading-7">
                {index + 1}
              </div>
              <p className="font-h2 !text-black w-full lg:w-[70%]">
                {item.simple}
              </p>
              <p className="font-service-text !text-center">{item.detail}</p>
            </div>
          ))}
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
      </div>
    </section>
  );
};

FreeServicesHowTo.displayName = "FreeServicesHowTo";

export default memo(FreeServicesHowTo);
