import { LottieAnimation } from "@/libs/consts/MySvg";
import Image from "next/image";
import React from "react";

const Status = () => {
  return (
    <div className="bg-[rgb(215_249_235)] rounded-lg shadow-[rgb(187_229_218)_3px_4px_12px_0px_inset] h-[46px] overflow-hidden px-1">
      <div className="home-status">
        <div className="flex gap-6 font-satoshi text-base leading-6 px-2 py-3">
          <div className="flex gap-[6px] leading-[21px] font-satoshi items-center">
            <LottieAnimation />
            <div className="text-green-light font-satoshi font-semibold">
              <span className="text-green-dark font-satoshi font-medium">
                12,751 followers{" "}
              </span>
              delivered
            </div>
          </div>
          <div className="flex gap-[6px] items-center">
            <Image
              width={20}
              height={20}
              loading="lazy"
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e40_Frame%201000004066.svg"
              alt="checkmark icon"
              className="home_stats-icon"
            />
            <div className="text-[rgb(1_118_69)] font-satoshi text-[14px] font-medium">
              8 mins ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
