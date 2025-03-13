import { StatusType } from "@/libs/types/Types";
import Image from "next/image";
import React, { memo } from "react";

interface StatusItemProps extends StatusType {
  className?: string;
}

const StatusItem = memo(
  ({ count, type, time, className = "" }: StatusItemProps) => {
    return (
      <div
        className={`flex justify-between font-satoshi text-base leading-6 px-4 py-3 bg-[rgb(215_249_235)] rounded-lg shadow-[rgb(187_229_218)_3px_4px_12px_0px_inset] h-[46px] overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <div className="flex gap-[10px] items-center">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-light opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-green-light"></span>
          </span>
          <div className="text-green-light font-satoshi font-semibold text-center leading-[16px]">
            <span className="text-green-dark font-satoshi font-medium">
              {count.toLocaleString()} {type}{" "}
            </span>
            delivered
          </div>
        </div>
        <div className="flex gap-[6px] items-center">
          <Image
            width={20}
            height={20}
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e40_Frame%201000004066.svg"
            alt="Checkmark icon"
            className="w-[20px] h-[20px] animate-fade-in"
            priority
          />
          <div className="text-[rgb(1_118_69)] font-satoshi text-[14px] text-center font-medium leading-[12px]">
            {time} mins ago
          </div>
        </div>
      </div>
    );
  }
);

StatusItem.displayName = "StatusItem";

export default StatusItem;
