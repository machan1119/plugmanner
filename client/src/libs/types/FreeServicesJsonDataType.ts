import { SEOType } from "./ListTypes";
import {
  BenefitType,
  BlogType,
  ParagraphType,
  QuestionType,
  Review,
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

interface Icon {
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

interface FreeService {
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

interface Subservice {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
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

interface Blogs {
  id: number;
  title?: ParagraphType;
  Blog: BlogType[];
}

export interface FreeServicesJsonDataType {
  id: number;
  documentId: string;
  name: string;
  title: string;
  title_color: string;
  hero_imgs: {
    bg_img: string;
    left_img: string;
    center_img: string;
    right_img: string;
    bridge_color: string;
  };
  platform_config: {
    formId: string;
    platform: string;
    socialPlatform: string;
    inputPlaceholder: string;
    buttonText: string;
    verificationText: string;
    successText: string;
    inputLabel: string;
    timerImage: string;
    emailImage: string;
    checkImage: string;
    primaryColor: string;
    primaryColorHover: string;
  };
  top_reviews: {
    id: number;
    rate: number;
    header: ParagraphType;
    review: Review[];
  };
  order_btn: {
    name: string;
    api: string;
  };
  how_to_order: HowToOrder;
  summary: Summary;
  benefits: {
    id: number;
    title: ParagraphType;
    Benefit: BenefitType[];
  };
  customer_reviews: {
    id: number;
    rate: number;
    counterofreviews: string;
    title: ParagraphType;
    text: ParagraphType[];
    Review: Review[];
  };
  service_status: {
    status_1: string;
    status_2: string;
    status_3: string;
  };
  free_service: FreeService;
  SimpleDescription: string;
  Orders: Order[];
  Blogs: Blogs;
  FAQ: {
    id: number;
    header: ParagraphType;
    Question: QuestionType[];
  };
  seo: SEOType;
}
