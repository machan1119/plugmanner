import MainButton from "@/components/Buttons";
import { StrapiParagraph } from "@/components/StrapiComponents";
import { PackageType } from "@/libs/types/ServiceJsonDataType";
import { useTranslations } from "next-intl";
import React, { memo } from "react";

const ServicePackageItem = ({
  level,
  price,
  popular,
  unit,
  list,
  link,
}: PackageType) => {
  const t = useTranslations("ServiceItem");
  return (
    <article
      className={`w-full flex flex-col justify-between border border-black-normal rounded-lg px-5 py-8 bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/6403335aa2b65391e848a999_socialplug-pricingbox-illustration-sm-light.svg')] bg-right-bottom bg-no-repeat bg-auto ${
        popular && "bg-black"
      }`}
    >
      <div className="flex w-full justify-between">
        <h3
          id={`package-title-${level}`}
          className={`font-h2 ${!popular ? "!text-primary" : "!text-white"}`}
        >
          {level}
        </h3>
        {popular && (
          <div className="px-2 py-1 bg-primary font-clash text-black rounded-md">
            {t("Popular")}
          </div>
        )}
      </div>
      <div className="flex mb-5 items-center">
        <span className={`font-h1 ${!popular ? "!text-black" : "!text-white"}`}>
          {price}
        </span>
        {unit && (
          <span className="font-clash text-[16px] text-black-steel !font-semibold">
            {"  "}/ {unit}
          </span>
        )}
      </div>
      <StrapiParagraph
        paragraph={list}
        customClassName="font-clash text-[16px] text-[#686889] font-normal"
      />
      <div className="w-full h-[1px] bg-black-normal my-5" />
      <MainButton
        type="primary"
        title={`${t("OrderNow")} >`}
        customClass="w-full"
        link={link}
      />
    </article>
  );
};

ServicePackageItem.displayName = "ServicePackageItem";

export default memo(ServicePackageItem);
