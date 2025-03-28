export interface LocalizedServiceItem {
  id: number;
  name: string;
  locale: string;
}

export interface ServiceItem {
  id: number;
  name: string;
  locale: string;
  localizations: LocalizedServiceItem[];
}
