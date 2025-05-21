export interface LocalizedFreeToolsItem {
  id: number;
  name: string;
  header: {
    text: [{ content: string }];
  };
  locale: "en" | "es-ES" | "pt-BR";
}

export interface FreeToolsItem {
  id: number;
  name: string;
  locale: string;
  header: {
    text: [{ content: string }];
  };
  localizations: LocalizedFreeToolsItem[];
}
