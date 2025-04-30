import { StatusType } from "@/libs/types/Types";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { memo } from "react";

const StatusItem = memo(({ count, type, time }: StatusType) => {
  const t = useTranslations("Home");
  return (
    <div className="flex flex-col gap-1 items-start sm:items-center sm:flex-row sm:justify-between font-satoshi text-base leading-6 px-4 pt-2 pb-1 bg-[rgb(215_249_235)] rounded-lg shadow-[rgb(187_229_218)_3px_4px_12px_0px_inset] h-max overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="flex gap-[10px] items-center">
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
        </span>
        <div className="text-primary font-satoshi font-semibold text-center leading-[16px]">
          <span className="text-secondary font-satoshi font-medium">
            {count.toLocaleString()} {type}{" "}
          </span>
          {t("hero.Status.delivered")}
        </div>
      </div>
      <div className="flex gap-[6px] items-center">
        <Image
          width={20}
          height={20}
          src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e40_Frame%201000004066.svg"
          alt="Checkmark icon"
          className="w-[15px] h-[15px] animate-fade-in mt-1 sm:ml-0 ml-[-8px]"
          priority
        />
        <div className="text-[rgb(1_118_69)] font-satoshi text-[14px] text-center font-medium leading-[12px]">
          {time} {t("hero.Status.minutes_ago")}
        </div>
      </div>
    </div>
  );
});

StatusItem.displayName = "StatusItem";

export default StatusItem;
