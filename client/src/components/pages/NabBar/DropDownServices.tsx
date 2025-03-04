import { replace_str } from "@/utils/functions";
import { ListType } from "@/libs/types/ListTypes";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";

interface ServiceItemProps {
  dataItem: {
    id: string;
    name: string;
  };
  icon: string;
  title: string;
}

const ServiceItem = React.memo(
  ({ dataItem, icon, title }: ServiceItemProps) => (
    <Link
      href={`/home/services/${dataItem.id}`}
      className="flex items-center gap-3 py-2 px-4 hover:bg-gray-50 transition-colors w-full text-gray-600 hover:text-green-light"
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${icon}`}
        width={20}
        height={20}
        alt={title}
        className="w-5 h-5 opacity-80 group-hover:opacity-100"
      />
      <span className="text-[15px] font-medium">
        {replace_str(dataItem.name, title)}
      </span>
    </Link>
  )
);
ServiceItem.displayName = "ServiceItem";

const ServiceCategory = React.memo(({ val }: { val: ListType["data"][0] }) => (
  <div className="w-full break-inside-avoid-column">
    <div className="text-base font-semibold text-gray-800 px-4 py-2">
      {val.title}
    </div>
    <div className="w-full h-[1px] bg-gray-100" />
    <div className="py-1">
      {val.services.map((dataItem, key) => (
        <ServiceItem
          key={key}
          dataItem={dataItem}
          icon={val.icon}
          title={val.title}
        />
      ))}
    </div>
  </div>
));
ServiceCategory.displayName = "ServiceCategory";

const DropDownServices = ({ item }: { item: ListType }) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      const dropdown = document.querySelector(".dropdown-menu");
      if (dropdown) {
        dropdown.classList.add("hidden");
      }
    }
  }, []);

  return (
    <div className="inline-block group relative">
      <div
        className="flex gap-1 items-center cursor-pointer py-4 font-normal text-base font-satoshi"
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded="false"
      >
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
        className={`dropdown-menu absolute hidden group-hover:block bg-white rounded-lg shadow-lg py-2 ${
          item.type === "Other" || item.type === "Tools" ? "right-0" : "left-0"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-button"
      >
        {item.type === "Other" ? (
          <div className="w-[50vw] max-h-[80vh] overflow-y-auto p-4">
            <div className="columns-[150px] w-full gap-6">
              {item.data.map((val, index) => (
                <ServiceCategory key={index} val={val} />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-h-[60vh] max-w-[50vw] overflow-auto p-1">
            <div className="flex w-max gap-6">
              {item.data.map((val, index) => (
                <ServiceCategory key={index} val={val} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(DropDownServices);
