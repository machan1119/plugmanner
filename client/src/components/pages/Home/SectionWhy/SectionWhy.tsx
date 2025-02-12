import Link from "next/link";
import React from "react";
import { Reviews } from "@/libs/data/Reviews";
import SectionWhyItems from "./SectionWhyItems";

const SectionWhy = () => {
  return (
    <div className="flex flex-col py-[80px] items-center bg-black-light w-full bg-cover bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ea7_hero_background-pattern.webp')] bg-center bg-no-repeat overflow-hidden border-black-dark border-t-[1px] border-b-[1px]">
      <div className="max-w-[1366px] justify-self-center px-10">
        <div className="mb-12 flex flex-col gap-3 items-center">
          <div className="font-h1-md lg:font-h1-lg">
            Why Customers <span className="text-green-light">Choose Us</span>
          </div>
          <span className="text-black text-[16px] leading-6 text-center font-satoshi w-[75%]">
            Read what our customers think about this service. We take your
            feedback seriously - help us improve by{" "}
            <Link className="text-green-light underline" href={"#"}>
              leaving a review.
            </Link>
          </span>
        </div>
        <div className="flex flex-col gap-8 items-center w-full">
          <div className="flex bg-white border-black-dark rounded-[16px] py-6 relative w-[90%] items-center">
            <div className="flex flex-col grow gap-2 items-center">
              <h1 className="font-h1-main md:font-h1-md lg:font-h1-lg">
                100k+
              </h1>
              <p className="text-black-dark text-[12px] md:text-[16px] lg:text-[18px] font-satoshi text-center">
                Happy Customers
              </p>
            </div>
            <div className="bg-gradient-to-b from-white via-black-dark to-white w-[1px] h-[75px]" />
            <div className="flex flex-col grow gap-2 items-center">
              <h1 className="font-h1-main md:font-h1-md lg:font-h1-lg">
                1.7 Billion+
              </h1>
              <p className="text-black-dark text-[12px] md:text-[16px] lg:text-[18px] font-satoshi text-center">
                Population Reached
              </p>
            </div>
            <div className="bg-gradient-to-b from-white via-black-dark to-white w-[1px] h-[75px]" />
            <div className="flex flex-col grow gap-2 items-center">
              <h1 className="font-h1-main md:font-h1-md lg:font-h1-lg">4.8</h1>
              <p className="text-black-dark text-[12px] md:text-[16px] lg:text-[18px] font-satoshi text-center">
                Review Rate
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {Reviews.map((item, index) => (
              <SectionWhyItems item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWhy;
