import { BlogsItem } from "@/libs/types/BlogsItemsMapping";
import { fetchBlogsItemMappings } from "@/utils/fetch-blogs-data";
import { generate_item_url_from_blog_title } from "@/utils/functions";

export async function initBlogsItemMappings(currentLocale: string) {
  const blogsItems: BlogsItem[] = await fetchBlogsItemMappings(currentLocale);
  const mappings: Record<string, Record<string, string>> = {};
  blogsItems.forEach((item) => {
    const currentItem =
      item.locale === currentLocale
        ? item
        : item.localizations.find((l) => l.locale === currentLocale);
    if (!currentItem) return;
    const currentSlug = generate_item_url_from_blog_title(currentItem.title);
    if (!mappings[currentSlug]) {
      mappings[currentSlug] = {};
    }
    mappings[currentSlug][item.locale] = generate_item_url_from_blog_title(
      item.title
    );
    if (item.localizations && item.localizations) {
      item.localizations.forEach((localization) => {
        mappings[currentSlug][localization.locale] =
          generate_item_url_from_blog_title(localization.title);
      });
    }
  });
  return mappings;
}

export async function getLocalizedFreeToolsItem(
  item: string,
  currentLocale: string,
  nextLocale: string
): Promise<string> {
  const mappings = await initBlogsItemMappings(currentLocale);
  if (!mappings[item]) {
    return item;
  }
  return mappings[item][nextLocale];
}

const Locales = ["en", "es-ES", "de", "pt-BR"];

export async function getOriginalBlogsItem(
  localizedItem: string,
  locale: string
): Promise<string> {
  const mappings = await initBlogsItemMappings(locale);
  for (const [originalItem, translations] of Object.entries(mappings)) {
    if (translations[locale] === localizedItem) {
      return originalItem;
    }
    for (let i = 0; i < Locales.length; i++) {
      if (translations[Locales[i]] === localizedItem) {
        return translations[locale];
      }
    }
  }
  return "";
}
