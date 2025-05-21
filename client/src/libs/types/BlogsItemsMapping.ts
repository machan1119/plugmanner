export interface LocalizedBlogsItem {
  id: number;
  title: string;
  locale: "en" | "es-ES" | "pt-BR";
}

export interface BlogsItem {
  id: number;
  title: string;
  locale: string;
  localizations: LocalizedBlogsItem[];
}
