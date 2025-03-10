export interface Subservice {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  popular: null | string;
  icon: Icon;
}

export interface Icon {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface RawData {
  id: number;
  documentId: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  popular: string;
  icon: Icon;
  subservices: Subservice[];
}

export interface ListType {
  type: string;
  data: ServicesDataType[];
  popular: string;
}

export interface ServicesDataType {
  title: string;
  icon: string;
  services: { name: string; id: string; icon: Icon }[];
}
