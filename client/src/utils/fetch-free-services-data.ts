import { ProcessedListType } from "@/libs/types/ListTypes";
import { fetchAPI } from "./fetch-api";
import { generate_item_url } from "./functions";
import { fetchAllServiceList } from "./fetch-all-service-list";
import { getLocale } from "next-intl/server";
import { FreeToolsItem } from "@/libs/types/FreeToolsItemsMapping";

export async function fetchFreeServicesItemMappings(currentLocale: string) {
  try {
    let i = 1;
    let pageCount = 1;
    let data: FreeToolsItem[] = [];
    while (true) {
      const path = "/sub-free-services";
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

export async function fetchFreeServicesData(itemId: string, locale: string) {
  try {
    const path = `/sub-free-services/${itemId}`;
    const urlParamsObject = {
      fields: ["name", "popular", "SimpleDescription", "title", "title_color"],
      populate: [
        "order_btn",
        "hero_imgs",
        "platform_config",
        "Orders.subservice.introduction.OrderIntro",
        "Orders.subservice.header.text",
        "free_service.icon",
        "top_reviews",
        "top_reviews.review",
        "top_reviews.header",
        "top_reviews.header.text",
        "customer_reviews",
        "customer_reviews.Review",
        "customer_reviews.title",
        "customer_reviews.title.text",
        "customer_reviews.text",
        "customer_reviews.text.text",
        "how_to_order.step",
        "how_to_order.title.text",
        "how_to_order.description.text",
        "summary.title.text",
        "summary.EachSummary",
        "benefits",
        "benefits.title.text",
        "benefits.Benefit.paragraph.text",
        "benefits.Benefit.title.text",
        "Blogs.Blog",
        "Blogs.title.text",
        "Blogs.Blog.paragraph.text",
        "Blogs.Blog.title.text",
        "service_status",
        "FAQ.header.text",
        "FAQ.Question",
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

export async function fetchFreeServicesMetaData(name: string) {
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
