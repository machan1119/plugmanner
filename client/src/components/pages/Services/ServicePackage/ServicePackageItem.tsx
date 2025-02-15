import MainButton from "@/components/Buttons";
import { StrapiParagraph } from "@/components/StrapiComponents";
import { PackageType } from "@/libs/types/ServiceJsonDataType";
import React from "react";

const ServicePackageItem = ({
  level,
  price,
  popular,
  unit,
  list,
}: PackageType) => {
  return (
    <div
      className={`w-full flex flex-col border border-black-normal rounded-lg px-5 py-8 ${
        popular && "bg-black"
      }`}
    >
      <div className="flex w-full justify-between">
        <div
          className={`font-h2 ${
            !popular ? "!text-green-light" : "!text-white"
          }`}
        >
          {level}
        </div>
        {popular && (
          <div className="px-2 py-1 bg-green-light font-clash text-black rounded-md">
            Popular
          </div>
        )}
      </div>
      <div className="flex mb-10 items-center">
        <span className={`font-h1 ${!popular ? "!text-black" : "!text-white"}`}>
          {price}
        </span>
        <span className="font-clash text-[16px] text-black-steel">
          {" "}
          / {unit}
        </span>
      </div>
      <StrapiParagraph
        paragraph={list}
        customClassName="text-clash text-[16px] text-[#686889]"
      />
      <div className="w-full h-[1px] bg-black-normal mx-y" />
      <MainButton type="main-green" title="Order now" />
    </div>
  );
};

export default ServicePackageItem;
