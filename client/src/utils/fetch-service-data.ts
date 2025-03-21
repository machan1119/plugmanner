import { ProcessedListType } from "@/libs/types/ListTypes";
import { fetchAPI } from "./fetch-api";
import { generate_slug, getCookie } from "./functions";
import { fetchAllServiceList } from "./fetch-all-service-list";

export async function fetchServiceData(itemId: string) {
  const locale = getCookie("NEXT_LOCALE");
  try {
    const path = `/subservices/${itemId}`;
    const urlParamsObject = {
      pLevel: "7",
      sort: { createdAt: "asc" },
      "[locale]": locale,
    };
    const options = "";
    const fetchedData = await fetchAPI(path, urlParamsObject, options);
    return fetchedData.data;
  } catch (error) {
    console.error(error);
  }

  return "";
}

export async function fetchServiceMetaData(name: string) {
  const allData: ProcessedListType = (await fetchAllServiceList()) ?? {
    data_1: [],
    data_2: [],
    data_3: [],
  };
  const subservice = allData.data_3.find(
    (sub) => generate_slug(sub.name) == name
  );
  let itemId: string = "";
  if (subservice) {
    itemId = subservice.id;
    const locale = getCookie("NEXT_LOCALE");
    try {
      const path = `/subservices/${itemId}`;
      const urlParamsObject = {
        field: ["name"],
        populate: {
          seo: {
            populate: ["openGraph"],
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
