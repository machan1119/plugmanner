import Image from "next/image";
import Link from "next/link";
import React from "react";

const Services = [
  {
    title: "Twitter",
    icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e4f_Frame%201000003869.svg",
    services: [
      "Twitter follows",
      "Twitter USA follows",
      "Twitter likes",
      "Twitter comments",
    ],
  },
  {
    title: "Crypto Twitter",
    icon: "https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e4f_Frame%201000003869.svg",
    services: [
      "Crypto Twitter follows",
      "Crypto Twitter USA follows",
      "Crypto Twitter likes",
      "Crypto Twitter comments",
    ],
  },
];

const DropDownServices = ({ type, index }: { type: string; index: number }) => {
  return (
    <div className="inline-block group relative">
      <div className="flex gap-1 items-center cursor-pointer py-4 font-normal text-base font-['Satoshi-Variable']">
        {type}
        <Image
          width={16}
          height={16}
          alt="down"
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e87_nav_dd-icon.svg"
          className="w-4 h-4"
        />
      </div>
      <div
        className={`w-max absolute hidden group-hover:block bg-white rounded-md p-3 shadow-[-2px_8px_9px_rgba(0,0,0,0.08),_-8px_15px_16px_rgba(0,0,0,0.07),_-20px_32px_24px_rgba(0,0,0,0.04),_-36px_56px_28px_rgba(0,0,0,0.01)] ${
          index > 5 ? "right-0" : "left-0"
        }`}
      >
        <div className="grid grid-cols-2 gap-3 w-max">
          {Services.map((val, key) => (
            <div className="col-span-1 flex-col grow" key={key}>
              <div className="text-lg font-semibold text-black mb-2 font-['ClashDisplay-Variable']">
                {val.title}
              </div>
              <div className="w-full h-[1px] bg-gray-500" />
              {val.services.map((item, key) => (
                <Link
                  href="#"
                  className="flex gap-2 mt-2 text-[16px] hover:text-[green]"
                  key={key}
                >
                  <Image
                    src={val.icon}
                    width={20}
                    height={20}
                    alt={val.title}
                  />
                  <span className="text-nowrap">{item}</span>
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
