import { FreeToolsListType } from "@/libs/types/ListTypes";
import { fetchAPI } from "./fetch-api";
import { generate_item_url_from_name } from "./functions";
import { getLocale } from "next-intl/server";
import { FreeToolsItem } from "@/libs/types/FreeToolsItemsMapping";
import { fetchAllFreeToolsList } from "./fetch-all-free-tools-list";

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
      fields: ["name", "popular"],
      populate: [
        "free_tool.icon",
        "Header.text",
        "SimpleDescription.text",
        "Orders.subservice.introduction.OrderIntro",
        "Orders.subservice.header.text",
        "HowToOrder.step",
        "HowToOrder.title.text",
        "HowToOrder.description.text",
        "Summary.title.text",
        "Summary.EachSummary",
        "Benefits",
        "Benefits.title.text",
        "Benefits.Benefit.paragraph.text",
        "Benefits.Benefit.title.text",
        "UpBlog.Blog",
        "UpBlog.title.text",
        "UpBlog.Blog.paragraph.text",
        "UpBlog.Blog.title.text",
        "DownBlogs.Blog",
        "DownBlogs.title.text",
        "DownBlogs.Blog.paragraph.text",
        "DownBlogs.Blog.title.text",
        "FAQ.header.text",
        "FAQ.Question",
        "icon",
        "order_icon",
      ],
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

export async function fetchFreeToolsMetaData(name: string) {
  const locale = await getLocale();
  const allData: FreeToolsListType[] =
    (await fetchAllFreeToolsList(locale)) ?? [];
  const freeTool = allData.find(
    (sub) => generate_item_url_from_name(sub.name) == name
  );
  let itemId: string = "";
  if (freeTool) {
    itemId = freeTool.id;
    try {
      const path = `/sub-free-tools/${itemId}`;
      const urlParamsObject = {
        fields: ["name", "locale"],
        populate: {
          seo: {
            populate: ["openGraph"],
          },
          localizations: {
            fields: ["name", "locale"],
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
