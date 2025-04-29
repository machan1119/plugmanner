import { LocalizedServiceItem } from "./ServiceItemsMapping";

export interface Subservice {
  id: number;
  recommend?: boolean;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  header: {
    text: [{ content: string }];
  };
  popular: string;
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

export interface ToolsRawData {
  id: number;
  documentId: string;
  name: string;
  popular: string;
  icon: {
    id: number;
    documentId: string;
    url: string;
  };
}

export interface ListType {
  type: string;
  data: ServicesDataType[];
  popular: string;
}

export interface ServicesDataType {
  title: string;
  icon: string;
  services: {
    name: string;
    id: string;
    icon: Icon;
    header: {
      text: [{ content: string }];
    };
    recommend?: boolean;
    popular: string;
  }[];
}

export interface ServicesListType {
  popular: string;
  title: string;
  icon: string;
  services: {
    name: string;
    id: string;
    icon: Icon;
    header: {
      text: [{ content: string }];
    };
    recommend?: boolean;
    popular: string;
  }[];
}

export interface SubserviceDataType {
  name: string;
  id: string;
  icon: Icon;
  header: {
    text: { content: string }[];
  };
  recommend?: boolean;
  popular: string;
}

export interface ProcessedListType {
  data_1: ListType[];
  data_2: ServicesListType[];
  data_3: SubserviceDataType[];
}

export interface FreeToolsListType {
  name: string;
  id: string;
  icon: string;
  popular: string;
}

export interface ServiceMetadataType {
  seo: SEOType;
  locale: string;
  header: {
    text: [{ content: string }];
  };
  localizations: LocalizedServiceItem[];
}

export interface SEOType {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  metaRobots?: string;
  metaViewport: string;
  structuredData?: string;
  metaImage?: string;
  metaSocial: [
    {
      socialNetwork: string;
      title: string;
      description: string;
      image: string;
    }
  ];
  openGraph: {
    ogtitle?: string;
    ogdescription?: string;
    ogurl?: string;
    ogtype?: string;
    ogimage?: string;
  };
}
