import { SEOType } from "./ListTypes";
import {
  BenefitType,
  BlogType,
  Header,
  ParagraphType,
  QuestionType,
} from "./ServiceJsonDataType";

interface IconFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface IconFormats {
  thumbnail?: IconFormat;
  [key: string]: IconFormat | undefined;
}

export interface Icon {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: IconFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface FreeTool {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  popular: number;
  icon: Icon;
}

interface OrderIntro {
  id: number;
  price: number;
  unit: string;
}

interface SubserviceIntroduction {
  id: number;
  rated: number;
  CounterOfReviews: string;
  video: string | null;
  video_title: string | null;
  OrderIntro: OrderIntro;
}

export interface Subservice {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  header: Header;
  name: string;
  popular: string;
  ordernow: string;
  recommend: string | null;
  introduction: SubserviceIntroduction;
}

interface Order {
  id: number;
  Title: string;
  subservice: Subservice;
}

export interface HowToOrderStep {
  id: number;
  simple: string;
  detail: string | null;
}

interface HowToOrder {
  id: number;
  step: HowToOrderStep[];
  title: ParagraphType;
  description: ParagraphType;
}

interface SummaryItem {
  id: number;
  title: string;
  content: string;
  icon: string;
}

interface Summary {
  id: number;
  EachSummary: SummaryItem[];
  title: ParagraphType;
  description: string | null;
}

interface UpBlog {
  id: number;
  title?: ParagraphType;
  Blog: BlogType[];
}

interface DownBlogs {
  id: number;
  title?: ParagraphType;
  Blog: BlogType[];
}

export interface FreeToolsJsonDataType {
  id: number;
  documentId: string;
  name: string;
  popular: number;
  free_tool: FreeTool;
  Header: ParagraphType;
  SimpleDescription: ParagraphType;
  Orders: Order[];
  HowToOrder: HowToOrder;
  Summary: Summary;
  UpBlog: UpBlog;
  DownBlogs: DownBlogs;
  Benefits: {
    id: number;
    title: ParagraphType;
    Benefit: BenefitType[];
  };
  FAQ: {
    id: number;
    header: ParagraphType;
    Question: QuestionType[];
  };
  icon: Icon;
  order_icon: Icon;
  seo: SEOType;
}
