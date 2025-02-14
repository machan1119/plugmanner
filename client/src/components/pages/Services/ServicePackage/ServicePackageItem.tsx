import MainButton from "@/components/Buttons";
import { StarIcon } from "@/libs/consts/MySvg";
import React from "react";

interface PackageType {
  type: string;
  price: number;
  popular: boolean;
  detail: string[];
}

const ServicePackageItem = ({ type, price, popular, detail }: PackageType) => {
  return (
    <div className="w-full flex flex-col border border-black-normal rounded-lg">
      <div className="flex w-full justify-between max-w-[1366px] px-5 py-8">
        <div
          className={`font-h2 ${popular ? "!text-green-light" : "!text-white"}`}
        >
          {type}
        </div>
        {popular && (
          <div className="px-2 py-1 bg-green-light font-clash text-black rounded-md">
            Popular
          </div>
        )}
      </div>
      <div className="flex mb-10">
        <span className={`font-h1 ${popular ? "!text-black" : "!text-white"}`}>
          ${price}
        </span>
        <span className="font-clash text-[16px] text-black-steel">
          {" "}
          / Month
        </span>
      </div>
      {detail.map((item, index) => (
        <div className="flex flex-col gap-8" key={index}>
          <span className={`${popular ? "text-white" : "text-green-light"}`}>
            {StarIcon}
          </span>
          <span className="text-clash text-[16px] text-[#686889]"></span>
        </div>
      ))}
      <div className="w-full h-[1px] bg-black-normal mx-y" />
      <MainButton type="main-green" title="Order now" />
    </div>
  );
};

export default ServicePackageItem;
