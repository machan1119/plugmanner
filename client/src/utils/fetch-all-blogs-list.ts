import { Article } from "@/libs/types/BlogsDataType";
import { fetchAPI } from "./fetch-api";

export async function fetchAllBlogsList(locale: string) {
  let pageCount = 1;
  let rawData: Article[] = [];
  try {
    let i = 1;
    while (true) {
      const path = "/articles";
      const urlParamsObject = {
        populate: ["Author", "article_category"],
        sort: [{ date: "desc" }],
        "[locale]": locale,
        pagination: {
          page: i,
          pageSize: 100,
        },
      };
      const responseData = await fetchAPI(path, urlParamsObject, "");
      if (!responseData.data) break;
      const tempRawData: Article[] = responseData.data;
      rawData = [...rawData, ...tempRawData];
      if (i == 1) {
        pageCount = responseData.meta.pagination.pageCount;
      }
      i += 1;
      if (i > pageCount) {
        break;
      }
    }
    return rawData;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Failed to fetch data");
    console.error("Error fetching services:", error);
  }
}
