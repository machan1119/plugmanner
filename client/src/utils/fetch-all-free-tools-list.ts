import { ToolsRawData } from "@/libs/types/ListTypes";
import { fetchAPI } from "./fetch-api";

export async function fetchAllFreeToolsList(locale: string) {
  let pageCount = 1;
  let rawData: ToolsRawData[] = [];
  try {
    let i = 1;
    while (true) {
      const path = "/sub-free-tools";
      const urlParamsObject = {
        fields: ["documentId", "popular", "name"],
        populate: ["icon", "free_tool", "free_tool.icon"],
        free_tool: { fields: ["name", "popular"] },
        icon: { fields: ["url"] },
        sort: [{ popular: "desc" }],
        "[locale]": locale,
        pagination: {
          page: i,
          pageSize: 100,
        },
      };
      const responseData = await fetchAPI(path, urlParamsObject, "");
      if (!responseData.data) break;
      const tempRawData: ToolsRawData[] = responseData.data;
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
      icon: String(item.free_tool?.icon?.url || ""),
      popular: String(item?.popular),
      free_tool: String(item.free_tool?.name),
      free_tool_popular: String(item.free_tool?.popular),
    }));
    return processedList;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Failed to fetch data");
    console.error("Error fetching services:", error);
  }
}
