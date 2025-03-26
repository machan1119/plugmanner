import { ServiceItem } from "@/libs/types/ServiceItemsMapping";
import { fetchAPI } from "./fetch-api";

export async function fetchServiceItemMappings(currentLocale: string) {
  try {
    let i = 1;
    let pageCount = 1;
    let data: ServiceItem[] = [];
    while (true) {
      const path = "/subservices";
      const urlParamsObject = {
        populate: "localizations",
        pagination: {
          page: i,
          pageSize: 100,
        },
        locale: currentLocale,
      };
      const response = await fetchAPI(path, urlParamsObject, "");
      if (i == 1) {
        pageCount = response.meta.pagination.pageCount;
      }
      const tempData = response.data;
      data = [...data, ...tempData];
      i += 1;
      if (i > pageCount) {
        break;
      }
    }
    return data;
  } catch (error) {
    console.error("Error fetching service item mappings:", error);
    return [];
  }
}
