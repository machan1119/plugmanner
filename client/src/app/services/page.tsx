import SectionServices from "@/components/pages/Home/SectionServices.tsx/SectionServices";
import { HowTo } from "@/libs/data/HowToOrder";
import Image from "next/image";
import React from "react";

const AllServices = () => {
  return (
    <div className="">
      <SectionServices />
      <div className="w-full py-[100px] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal">
        <div className="max-w-[1366px] w-full flex flex-col gap-8 items-center px-10">
          <h1 className="font-h1 w-[50%] text-wrap">How to Place an Order</h1>
          <p className="font-service-text text-[18px] my-5">
            Here&#39;s a quick rundown of how You can place an order for our
            social media services.
          </p>
          <div className="relative w-full grid grid-cols-3 items-center my-5">
            {HowTo.map((item, index) => (
              <div
                className="flex flex-col items-center gap-3 h-full text-center"
                key={index}
              >
                <div className="flex items-center justify-center bg-black text-white border border-black rounded-md w-[50px] h-[50px] text-xl font-semibold leading-7 mb-4">
                  {index + 1}
                </div>
                <h2 className="font-h2">{item.title}</h2>
                <p className="font-service-text w-[70%] !text-center">
                  {item.description}
                </p>
              </div>
            ))}
            <Image
              width={260}
              height={55}
              alt="how to order inline"
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6400d6caf94166be7ca4de87_6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
              className="absolute self-start top-[10px] left-[20%] w-[25%]"
            />
            <Image
              width={260}
              height={55}
              alt="how to order inline"
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6400d6caf94166be7ca4de87_6110b1396056a5e6b0bd01f9_Dot%20Wave.svg"
              className="absolute self-start top-[10px] right-[20%] w-[25%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
