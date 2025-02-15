export interface ServiceJsonDataType {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  popular: number;
  header: Header;
  simpledescription: {
    id: number;
    text: Text[];
  };
  introduction: {
    id: number;
    rated: string;
    CounterOfReviews: string;
    video: string;
    OrderIntro: {
      id: number;
      price: string;
      unit: string;
      list: ParagraphType[];
    };
    CustomerReviews: {
      id: number;
      rate: string;
      counterofreviews: string;
      title: ParagraphType;
      text: ParagraphType[];
      Review: Review[];
    };
    ChoosePackage: {
      id: number;
      package: PackageType[];
    };
    UpBlogs: {
      id: number;
      Blog: BlogType[];
    };
    Benefits: {
      id: number;
      title: ParagraphType;
      Benefit: BenefitType[];
    };
    DownBlogs: {
      id: number;
      Blog: BlogType[];
    };
    Summary: {
      id: number;
      title: ParagraphType;
      EachSummary: EachSummaryType[];
    };
    HowToOrder: {
      id: number;
      title: ParagraphType;
      description: ParagraphType;
      step: HowToOrderStep[];
    };
    TopReviews: {
      id: number;
      rate: number;
      header: ParagraphType;
      review: Review[];
    };
    StateOfService: {
      id: number;
      States: StateItem[];
    };

    Quality: {
      id: number;
      list: ParagraphType[];
    };
    FrequentlyQuestions: {
      id: number;
      Question: QuestionType[];
    };
    GoodPoints: {
      id?: number;
      list_img: ImageData;
      chapter: GoodPointsChapterType[];
    };
  };
  article: Article[];
}

export type Header = {
  id?: number;
  text: Text[];
};

export type Text = {
  id?: number;
  content: string;
  bold: boolean;
  link: string;
  color: string;
  underline: boolean;
};

export type Review = {
  id?: number;
  title: string;
  rated: string;
  content: string;
  customer: string;
  date: string;
};

export type PackageType = {
  id?: number;
  level: string;
  price: string;
  unit: string;
  popular: number;
  list: ParagraphType[];
};

export type BlogType = {
  id?: number;
  button: string;
  button_api: string;
  paragraph: ParagraphType[];
  title: ParagraphType;
  img: ImageData;
};

export type ParagraphType = {
  id?: number;
  icon: ImageData;
  text: Text[];
};

export type BenefitType = {
  id?: number;
  tabname: string;
  Button: null;
  button_api: null;
  title: {
    id?: number;
    text: Text[];
  };
  paragraph: ParagraphType[];
  img: ImageData;
};

export type EachSummaryType = {
  id?: number;
  title: string;
  content: string;
  icon: ImageData;
};

export type HowToOrderStep = {
  id?: number;
  simple: string;
  detail: string;
};

export type StateItem = {
  id?: number;
  counters: string;
  character: string;
};

export type QuestionType = {
  id?: number;
  question: string;
  answer: string;
};

export type GoodPointsChapterType = {
  id?: number;
  img: ImageData;
  title: ParagraphType;
  section: GoodPointsChapterSectionType[];
};

export type GoodPointsChapterSectionType = {
  id?: number;
  img: ImageData;
  title: Text[];
  content: ParagraphType[];
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

type ImageData = {
  id?: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
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
