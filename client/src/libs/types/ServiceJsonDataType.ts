export interface ServiceJsonDataType {
  data: {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    name: string;
    popular: number;
    type: string;
    subname: string;
    introduction: {
      id: number;
      SimpleDescription: string;
      rated: number;
      CounterOfReviews: string;
      video: string;
      FrequentlyQuestions: {
        id: number;
        Question: QuestionType[];
      };
      CustomerReviews: {
        id: number;
        title: string;
        text: string;
        rate: number;
        counterofreviews: string;
        Review: Review[];
      };
      Benefits: {
        id: number;
        title: string;
        Benefit: BenefitType[];
      };
      UpBlogs: {
        id: number;
        Blog: BlogType[];
      };
      Summary: {
        id: number;
        title: string;
        EachSummary: SummaryItem[];
      };
      HowToOrder: {
        id: number;
        description: string;
        step: HowToOrderStep[];
      };
      TopReviews: {
        id: number;
        header: string;
        rate: number;
        review: Review[];
      };
      StateOfService: {
        id: number;
        States: StateItem[];
      };
      OrderIntro: {
        id: number;
        price: number;
        unit: string;
        sentence: OrderIntroSentence[];
      };
    };
    article: Article[];
  };
  meta: Record<string, unknown>;
}

export type SummaryItem = {
  id: number;
  title: string;
  content: string;
  icon: ImageData;
};

export type HowToOrderStep = {
  id: number;
  simple: string;
  detail: string | null;
};

export type BlogType = {
  id: number;
  title: string;
  content: string;
  img: ImageData;
};

export type Review = {
  id: number;
  title: string;
  rated: number;
  content: string;
  customer: string;
  date: string;
};

export type BenefitType = {
  id: number;
  tabname: string;
  title: string;
  content: string;
  Button: null;
  button_api: null;
  img: ImageData;
};

export type StateItem = {
  id: number;
  counters: string;
  character: string;
};

export type OrderIntroSentence = {
  id: number;
  text: string;
};

export type Article = {
  id: number;
  documentId: string;
  title: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  author_name: string;
  main_img: ImageData[];
};

export type QuestionType = {
  id: number;
  question: string;
  answer: string;
};

type ImageData = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: {
    small: ImageFormat;
    medium?: ImageFormat;
    thumbnail: ImageFormat;
  };
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
};

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
};
