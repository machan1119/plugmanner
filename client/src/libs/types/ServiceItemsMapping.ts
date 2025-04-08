export interface LocalizedServiceItem {
  id: number;
  name: string;
  header: {
    text: [{ content: string }];
  };
  locale: "en" | "es-ES" | "de" | "pt-BR";
}

export interface ServiceItem {
  id: number;
  name: string;
  locale: string;
  header: {
    text: [{ content: string }];
  };
  localizations: LocalizedServiceItem[];
}
