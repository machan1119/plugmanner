import MainButton from "@/components/Buttons";
import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React from "react";

const ServiceHowTo = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.howTo) return <div className="">no data</div>;
  return (
    <div className="w-full px-[15%] py-[5%] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal">
      <h1 className="font-h1 w-[50%] text-wrap">{serviceItems.howTo.title}</h1>
      <p className="font-service-text text-[18px] my-8">
        {serviceItems.howTo.description}
      </p>
      <div className="relative w-full grid grid-cols-3 items-center">
        {serviceItems.howTo.steps.map((item, index) => (
          <div
            className="flex flex-col items-center gap-5 h-full text-center"
            key={index}
          >
            <div className="flex items-center justify-center bg-black text-white border border-black rounded-md w-[50px] h-[50px] text-xl font-semibold leading-7">
              {index + 1}
            </div>
            <h2 className="font-h2">{item.name}</h2>
            <p className="font-service-text">{item.detail}</p>
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
      <MainButton type="green-main" title="Order Now >" customClass="w-[20%]" />
    </div>
  );
};

export default ServiceHowTo;
