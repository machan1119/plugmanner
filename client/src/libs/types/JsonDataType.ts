export interface JsonDataType {
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
        Question: Array<{
          id: number;
          question: string;
          answer: string;
        }>;
      };
      CustomerReviews: {
        id: number;
        title: string;
        text: string;
        rate: number;
        counterofreviews: string;
        Review: Array<{
          id: number;
          title: string;
          rated: number;
          content: string;
          customer: string;
          date: string;
        }>;
      };
      Benefits: {
        id: number;
        title: string;
        Benefit: Array<{
          id: number;
          tabname: string;
          title: string;
          content: string;
          Button: null;
          button_api: null;
          img: ImageData;
        }>;
      };
      UpBlogs: {
        id: number;
        Blog: Array<{
          id: number;
          title: string;
          content: string;
          img: ImageData;
        }>;
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
type SummaryItem = {
  id: number;
  title: string;
  content: string;
  icon: ImageData;
};

type HowToOrderStep = {
  id: number;
  simple: string;
  detail: string | null;
};

type Review = {
  id: number;
  title: string;
  rated: number;
  content: string;
  customer: string;
  date: string;
};

type StateItem = {
  id: number;
  counters: string;
  character: string;
};

type OrderIntroSentence = {
  id: number;
  text: string;
};

type Article = {
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
