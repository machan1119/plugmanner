import { ProcessedListType } from "@/libs/types/ListTypes";
import { fetchAPI } from "./fetch-api";
import { generate_item_url } from "./functions";
import { fetchAllServiceList } from "./fetch-all-service-list";
import { getLocale } from "next-intl/server";
import { FreeToolsItem } from "@/libs/types/FreeToolsItemsMapping";

export async function fetchFreeToolsItemMappings(currentLocale: string) {
  try {
    let i = 1;
    let pageCount = 1;
    let data: FreeToolsItem[] = [];
    while (true) {
      const path = "/sub-free-tools";
      const urlParamsObject = {
        fields: ["name", "locale"],
        populate: {
          localizations: {
            fields: ["name", "locale"],
          },
        },
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

export async function fetchFreeToolsData(itemId: string, locale: string) {
  try {
    const path = `/sub-free-tools/${itemId}`;
    const urlParamsObject = {
      pLevel: "7",
      sort: { createdAt: "asc" },
      "[locale]": locale,
    };
    const options = "";
    const fetchedData = await fetchAPI(path, urlParamsObject, options);
    console.log(fetchedData);
    return fetchedData.data;
  } catch (error) {
    console.error(error);
  }

  return "";
}

export async function fetchFreeToolsMetaData(name: string) {
  const locale = await getLocale();
  const allData: ProcessedListType = (await fetchAllServiceList(locale)) ?? {
    data_1: [],
    data_2: [],
    data_3: [],
  };
  const freeTool = allData.data_3.find(
    (sub) => generate_item_url(sub.header.text) == name
  );
  let itemId: string = "";
  if (freeTool) {
    itemId = freeTool.id;
    try {
      const path = `/free-tools/${itemId}`;
      const urlParamsObject = {
        field: ["name"],
        populate: {
          seo: {
            populate: ["openGraph"],
          },
          localizations: {
            populate: "header.text",
          },
          header: {
            populate: "text",
          },
        },
        "[locale]": locale,
      };
      const options = "";
      const fetchedData = await fetchAPI(path, urlParamsObject, options);
      return fetchedData.data;
    } catch (error) {
      console.error(error);
    }
  }

  return "";
}
