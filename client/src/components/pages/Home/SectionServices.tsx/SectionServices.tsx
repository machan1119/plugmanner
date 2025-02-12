"use client";
import React, { useState } from "react";
import { SwitchButton } from "@/components/Buttons";
import ServicesItem from "./ServicesItem";
import { useData } from "@/providers/DataProvider";

const SectionServices = () => {
  const { data } = useData();
  const [status, setStatus] = useState("Services");
  const [filter, setFilter] = useState("popular");
  return (
    <div className="flex flex-col items-center m-[5%] justify-self-center relative max-w-[1366px]">
      <h2 className="font-h1-md lg:font-h1-lg mb-12">All Marketing Services</h2>
      <div className="flex items-end mb-5">
        <SwitchButton status={status} setStatus={setStatus} />
        <div className="absolute right-0 border-[1px] border-black-dark flex rounded-[10px]">
          <div className="hidden md:block bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e53_flowbite_sort-outline.svg')] bg-[4px_center] bg-no-repeat bg-auto border-r-[1px] border-black-dark text-black text-[12px] lg:text-[16px] font-satoshi leading-6 pl-8 p-2 bg-black-light rounded-l-[10px]">
            Sort by:
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-30 lg:w-40 p-2 cursor-pointer bg-inherit text-[12px] lg:text-[16px]"
          >
            <option value="popular">Popular</option>
            <option value="AToZ">Sort from A-Z</option>
            <option value="ZToA">Sort from Z-A</option>
          </select>
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((item, index) =>
          item.data.map((val, innerIndex) => (
            <ServicesItem serviceData={val} key={`${index}-${innerIndex}`} />
          ))
        )}
      </div>
    </div>
  );
};

export default SectionServices;
