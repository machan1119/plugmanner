"use client";
import React, { useState, memo, useEffect } from "react";
import { SwitchButton } from "@/components/Buttons";
import ServicesItem from "./ServicesItem";
import { useList } from "@/providers/ListProvider";
import { ServicesListType } from "@/libs/types/ListTypes";

interface SectionServicesProps {
  className?: string;
}

type FilterType = "popular" | "AToZ" | "ZToA";

const SectionServices = memo(({ className = "" }: SectionServicesProps) => {
  const { serviceList } = useList();
  const [status, setStatus] = useState<"Services" | "Tools">("Services");
  const [filter, setFilter] = useState<FilterType>("popular");
  const [filteredList, setFilteredList] = useState<ServicesListType[]>([]);
  useEffect(() => {
    const filteredList = [...serviceList].sort((a, b) => {
      if (filter === "AToZ") {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      }
      if (filter === "ZToA") {
        return b.title.toLowerCase().localeCompare(a.title.toLowerCase());
      }
      return Number(b.popular) - Number(a.popular);
    });
    setFilteredList(filteredList);
  }, [filter, serviceList]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterType);
  };

  return (
    <section
      className={`flex flex-col items-center m-[5%] justify-self-center relative w-full px-[5%] ${className}`}
      aria-label="Marketing Services Section"
    >
      <h2 className="font-h1-md lg:font-h1-lg mb-12 animate-fade-in">
        All Marketing Services
      </h2>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-center items-end mb-5 w-full relative">
        <SwitchButton
          status={status}
          setStatus={setStatus}
          customClass="lg:w-fit w-full"
        />
        <div className="lg:absolute right-[5%] border-[1px] border-black-dark flex rounded-[10px] shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e53_flowbite_sort-outline.svg')] bg-[4px_center] bg-no-repeat bg-auto border-r-[1px] border-black-dark text-black text-[12px] lg:text-[16px] font-satoshi leading-6 pl-8 p-2 bg-black-light rounded-l-[10px]">
            Sort by:
          </div>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="w-30 lg:w-40 p-2 cursor-pointer bg-inherit text-[12px] lg:text-[16px] focus:outline-none focus:ring-2 focus:ring-green-light rounded-r-[10px] transition-all duration-300"
            aria-label="Sort services by"
          >
            <option value="popular">Popular</option>
            <option value="AToZ">Sort from A-Z</option>
            <option value="ZToA">Sort from Z-A</option>
          </select>
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredList.map((item, index) =>
          <ServicesItem
            serviceData={item}
            key={index}
            className="animate-fade-in-up"
          />
        )}
      </div>
    </section>
  );
});

SectionServices.displayName = "SectionServices";

export default SectionServices;
