import { ServiceItem } from "@/libs/types/ServiceItemsMapping";
import { fetchServiceItemMappings } from "../utils/fetchServiceItemMappings";
import { generate_item_url } from "@/utils/functions";

export async function initServiceItemMappings(currentLocale: string) {
  const serviceItems: ServiceItem[] = await fetchServiceItemMappings(
    currentLocale
  );
  const mappings: Record<string, Record<string, string>> = {};
  serviceItems.forEach((item) => {
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

export async function getLocalizedServiceItem(
  item: string,
  currentLocale: string,
  nextLocale: string
): Promise<string> {
  const mappings = await initServiceItemMappings(currentLocale);
  if (!mappings[item]) {
    return item;
  }
  return mappings[item][nextLocale];
}

const Locales = ["en", "es-ES", "de", "pt-BR"];

export async function getOriginalServiceItem(
  localizedItem: string,
  locale: string
): Promise<string> {
  const mappings = await initServiceItemMappings(locale);
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
