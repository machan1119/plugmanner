import { useServices } from "@/providers/ServicesProvider";
import Image from "next/image";
import React from "react";

const ServiceWhyBuyThis = () => {
  const { serviceItems, isLoading } = useServices();
  if (!serviceItems?.whyBuyThis) return <div className="">no data</div>;
  return (
    <div className="w-full py-[80px] bg-black-light flex flex-col items-center border-b-[1px] border-black-normal">
      <div className="max-w-[1366px] w-full flex flex-col items-center px-10">
        <h1 className="font-h1 w-[50%] text-wrap">
          {serviceItems.whyBuyThis.title}
        </h1>
        <Image
          width={300}
          height={25}
          alt="why buy under"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6403637940112104f075f0c2_underline1.svg"
          className="my-5"
        />
        <div className="w-full grid justify-stretch md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {serviceItems.whyBuyThis.data.map((item, index) => (
            <div className="h-full" key={index}>
              <div className="relative mt-[25px] flex flex-col h-[calc(100%-25px)] gap-5 px-5 pb-5 pt-10 cursor-pointer border border-black-normal hover:border-green-light rounded-md transition-all duration-500">
                <Image
                  width={50}
                  height={50}
                  alt={item.name}
                  src={item.icon}
                  className="absolute top-[-25px] left-5"
                />
                <h2 className="font-h2 !text-left">{item.name}</h2>
                <p className="font-service-text text-[18px]">{item.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceWhyBuyThis;
