import { FreeServicesItem } from "@/libs/types/FreeServicesItemsMapping";
import { fetchFreeServicesItemMappings } from "@/utils/fetch-free-services-data";
import { generate_item_url_from_name } from "@/utils/functions";

export async function initFreeServicesItemMappings(currentLocale: string) {
  const freeServicesItems: FreeServicesItem[] =
    await fetchFreeServicesItemMappings(currentLocale);
  const mappings: Record<string, Record<string, string>> = {};
  freeServicesItems.forEach((item) => {
    const currentItem =
      item.locale === currentLocale
        ? item
        : item.localizations.find((l) => l.locale === currentLocale);
    if (!currentItem) return;
    const currentSlug = generate_item_url_from_name(currentItem.name);
    if (!mappings[currentSlug]) {
      mappings[currentSlug] = {};
    }
    mappings[currentSlug][item.locale] = generate_item_url_from_name(item.name);
    if (item.localizations && item.localizations) {
      item.localizations.forEach((localization) => {
        mappings[currentSlug][localization.locale] =
          generate_item_url_from_name(localization.name);
      });
    }
  });
  return mappings;
}

export async function getLocalizedFreeServicesItem(
  item: string,
  currentLocale: string,
  nextLocale: string
): Promise<string> {
  const mappings = await initFreeServicesItemMappings(currentLocale);
  if (!mappings[item]) {
    return item;
  }
  return mappings[item][nextLocale];
}

const Locales = ["en", "es-ES", "de", "pt-BR"];

export async function getOriginalFreeServicesItem(
  localizedItem: string,
  locale: string
): Promise<string> {
  const mappings = await initFreeServicesItemMappings(locale);
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
