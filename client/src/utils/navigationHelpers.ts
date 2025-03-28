"use client";

import { useRouter } from "next/navigation";
import { getLocalizedServiceItem } from "../i18n/serviceItemMappings";

// Helper to navigate to a service item page with proper localization
export function useServiceNavigation() {
  const router = useRouter();
  const navigateToService = async (
    serviceItem: string,
    currentLocale: string,
    nextLocale: string
  ) => {
    const localizedItem = await getLocalizedServiceItem(
      serviceItem,
      currentLocale,
      nextLocale
    );
    let basePath = "/services";
    if (nextLocale === "es-ES") basePath = "/servicios";
    else if (nextLocale === "de") basePath = "/dienstleistungen";
    else if (nextLocale === "pt-BR") basePath = "/serviços";

    router.push(`${basePath}/${localizedItem}`);
  };

  return { navigateToService };
}
