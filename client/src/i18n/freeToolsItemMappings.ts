import { FreeToolsItem } from "@/libs/types/FreeToolsItemsMapping";
import { fetchFreeToolsItemMappings } from "@/utils/fetch-free-tools-data";
import { generate_item_url } from "@/utils/functions";

export async function initFreeToolsItemMappings(currentLocale: string) {
  const freeToolsItems: FreeToolsItem[] = await fetchFreeToolsItemMappings(
    currentLocale
  );
  const mappings: Record<string, Record<string, string>> = {};
  freeToolsItems.forEach((item) => {
    const currentItem =
      item.locale === currentLocale
        ? item
        : item.localizations.find((l) => l.locale === currentLocale);
    if (!currentItem) return;
    const currentSlug = generate_item_url(currentItem.header.text);
    if (!mappings[currentSlug]) {
      mappings[currentSlug] = {};
    }
    mappings[currentSlug][item.locale] = generate_item_url(item.header.text);
    if (item.localizations && item.localizations) {
      item.localizations.forEach((localization) => {
        mappings[currentSlug][localization.locale] = generate_item_url(
          localization.header.text
        );
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
  const mappings = await initFreeToolsItemMappings(currentLocale);
  if (!mappings[item]) {
    return item;
  }
  return mappings[item][nextLocale];
}

const Locales = ["en", "es-ES", "de", "pt-BR"];

export async function getOriginalFreeToolsItem(
  localizedItem: string,
  locale: string
): Promise<string> {
  const mappings = await initFreeToolsItemMappings(locale);
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
