export interface LocalizedFreeServicesItem {
  id: number;
  name: string;
  header: {
    text: [{ content: string }];
  };
  locale: "en" | "es-ES" | "de" | "pt-BR";
}

export interface FreeServicesItem {
  id: number;
  name: string;
  locale: string;
  localizations: LocalizedFreeServicesItem[];
}
