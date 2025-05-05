import { FreeServicesRawData } from "@/libs/types/ListTypes";
import { fetchAPI } from "./fetch-api";

export async function fetchAllFreeServicesList(locale: string) {
  let pageCount = 1;
  let rawData: FreeServicesRawData[] = [];
  try {
    let i = 1;
    while (true) {
      const path = "/sub-free-services";
      const urlParamsObject = {
        fields: ["documentId", "popular", "name"],
        populate: ["free_service", "free_service.icon"],
        sort: [{ popular: "desc" }],
        "[locale]": locale,
        pagination: {
          page: i,
          pageSize: 100,
        },
      };
      const responseData = await fetchAPI(path, urlParamsObject, "");
      if (!responseData.data) break;
      const tempRawData: FreeServicesRawData[] = responseData.data;
      rawData = [...rawData, ...tempRawData];
      if (i == 1) {
        pageCount = responseData.meta.pagination.pageCount;
      }
      i += 1;
      if (i > pageCount) {
        break;
      }
    }
    const processedList = rawData.map((item) => ({
      name: String(item.name),
      id: String(item.documentId),
      icon: String(item.free_service?.icon?.url || ""),
      popular: String(item.popular),
      free_service: String(item.free_service?.name),
      free_service_popular: String(item.free_service?.popular),
    }));
    return processedList;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Failed to fetch data");
    console.error("Error fetching services:", error);
  }
}
