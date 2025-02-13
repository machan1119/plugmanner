import { replace_str, slugify } from "@/libs/functions";
import { ServicesType } from "@/libs/types/DataTypes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DropDownServices = ({ item }: { item: ServicesType }) => {
  return (
    <div className="inline-block group relative border-b-[1px] lg:border-none border-black-dark">
      <div className="flex gap-1 items-center cursor-pointer py-4 font-normal text-base font-satoshi">
        <Image
          src={`${process.env.BACKEND_URL}${item.data[0].icon}`}
          width={30}
          height={30}
          alt={item.type}
          className="w-8 h-8 lg:hidden"
        />
        <p className="group-hover:text-green-light">{item.type}</p>
        <Image
          width={16}
          height={16}
          className="w-auto h-auto"
          alt="down"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e87_nav_dd-icon.svg"
        />
      </div>
      <div
        className={`w-max lg:absolute hidden group-hover:block lg:bg-white bg-inherit rounded-md p-3 lg:shadow-[-2px_8px_9px_rgba(0,0,0,0.08),_-8px_15px_16px_rgba(0,0,0,0.07),_-20px_32px_24px_rgba(0,0,0,0.04),_-36px_56px_28px_rgba(0,0,0,0.01)] max-h-[70vh] overflow-y-auto ${
          item.type == "Other" || item.type == "Tools" ? "right-0" : "left-0"
        }`}
      >
        <div className="max-h-[100vh] max-w-[100vw] flex flex-col flex-wrap justify-start overflow-x-auto gap-5">
          {item.data.map((val, key) => (
            <div className="col-span-1 flex-col w-max" key={key}>
              <div className="text-lg font-semibold text-black mb-2 font-clash">
                {val.title}
              </div>
              <div className="w-full h-[1px] bg-gray-500" />
              {val.services.map((dataItem, key) => (
                <Link
                  // href={`/services/${slugify(val.title)}/${slugify(
                  //   replace_str(dataItem.name, val.title)
                  // )}`}
                  href={`/services/${dataItem.id}`}
                  className="flex gap-2 mt-2 text-[16px] hover:text-green-light items-center"
                  key={key}
                >
                  <Image
                    src={`${process.env.BACKEND_URL}${val.icon}`}
                    width={20}
                    height={20}
                    alt={val.title}
                    className="w-5 h-5"
                  />
                  <span className="text-nowrap">
                    {replace_str(dataItem.name, val.title)}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDownServices;
