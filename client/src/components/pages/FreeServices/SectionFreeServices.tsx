import React, { memo } from "react";
import { useList } from "@/providers/ListProvider";
import FreeServicesItem from "./FreeServicesItem";
import { GroupedFreeServicesType } from "@/libs/types/ListTypes";

const SectionFreeServices = memo(() => {
  const { freeServicesList } = useList();
  function groupBy<T>(
    array: T[],
    keyGetter: (item: T) => string
  ): Record<string, T[]> {
    return array.reduce((result, item) => {
      const key = keyGetter(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {} as Record<string, T[]>);
  }
  const groupedFreeServices = () => {
    const grouped = groupBy(freeServicesList, (item) =>
      item.free_service.trim()
    );
    return Object.entries(grouped)
      .map(([type, group]) => {
        if (group) {
          return {
            type: type,
            popular: group[0].free_service_popular,
            subservices: group,
          };
        }
        return undefined;
      })
      .filter((group): group is GroupedFreeServicesType => group !== undefined)
      .sort((a, b) => Number(b.popular) - Number(a.popular));
  };
  const groupedFreeServicesList: GroupedFreeServicesType[] =
    groupedFreeServices();
  return (
    <section className="flex flex-col items-center my-16 justify-self-center relative w-full px-[5%]">
      <div className="w-full">
        <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {groupedFreeServicesList.map((item, index) => (
            <FreeServicesItem freeServiceData={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

SectionFreeServices.displayName = "SectionFreeServices";

export default SectionFreeServices;
