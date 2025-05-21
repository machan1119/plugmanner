import { FreeServicesListType } from "@/libs/types/ListTypes";
import { fetchAPI } from "./fetch-api";
import { generate_item_url_from_name } from "./functions";
import { getLocale } from "next-intl/server";
import { fetchAllFreeServicesList } from "./fetch-all-free-services-list";
import { BlogsItem } from "@/libs/types/BlogsItemsMapping";

export async function fetchBlogsItemMappings(currentLocale: string) {
  try {
    let i = 1;
    let pageCount = 1;
    let data: BlogsItem[] = [];
    while (true) {
      const path = "/articles";
      const urlParamsObject = {
        fields: ["title", "locale"],
        populate: {
          localizations: {
            fields: ["title", "locale"],
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

export async function fetchBlogsData(itemId: string, locale: string) {
  try {
    const path = `/articles/${itemId}`;
    const urlParamsObject = {
      populate: [
        "Author",
        "Author.social",
        "article_category",
        "Content.Chapter.Header.text",
        "Content.Chapter.Section.Header.text",
        "Content.Chapter.Section.Subsection.Header.text",
        "Content.Chapter.Section.Subsection.Paragraph.Sentence.text",
        "Content.Chapter.Section.Subsection.Paragraph.List.Level1.Level2.text",
        "Content.Chapter.Section.Subsection.Paragraph.List.Level1.text",
        // "seo",
        // "seo.openGraph",
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

export async function fetchBlogsMetaData(name: string) {
  const locale = await getLocale();
  const allData: FreeServicesListType[] =
    (await fetchAllFreeServicesList(locale)) ?? [];
  const freeTool = allData.find(
    (sub) => generate_item_url_from_name(sub.name) == name
  );
  let itemId: string = "";
  if (freeTool) {
    itemId = freeTool.id;
    try {
      const path = `/sub-free-services/${itemId}`;
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
