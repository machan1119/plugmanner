export interface ServiceJsonDataType {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  recommend?:boolean;
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
    rated: number;
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
      rate: number;
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
      title?: ParagraphType;
      id: number;
      Blog: BlogType[];
    };
    Benefits: {
      id: number;
      title: ParagraphType;
      Benefit: BenefitType[];
    };
    DownBlogs: {
      title?: ParagraphType;
      id: number;
      Blog: BlogType[];
    };
    Summary: {
      id: number;
      title: ParagraphType;
      EachSummary: EachSummaryType[];
    };
    Summary2: {
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
      header: ParagraphType;
      Question: QuestionType[];
    };
    GoodPoints: {
      id?: number;
      list_img: string;
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
  rated: number;
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
  img: string;
};

export type ParagraphType = {
  id?: number;
  icon: string;
  text: Text[];
};

export type BenefitType = {
  id?: number;
  tabname: string;
  Button?: string;
  button_api: null;
  title: {
    id?: number;
    text: Text[];
  };
  paragraph: ParagraphType[];
  img: string;
};

export type EachSummaryType = {
  id?: number;
  title: string;
  content: string;
  icon: string;
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
  img: string;
  title: ParagraphType;
  section: GoodPointsChapterSectionType[];
};

export type GoodPointsChapterSectionType = {
  id?: number;
  img: string;
  title: ParagraphType;
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
  img: string;
};

// type string = {
//   id?: number;
//   documentId: string;
//   name: string;
//   alternativeText: string;
//   caption: string;
//   width: number;
//   height: number;
//   formats: {
//     small: ImageFormat;
//     medium?: ImageFormat;
//     thumbnail: ImageFormat;
//   };
//   hash: string;
//   ext: string;
//   mime: string;
//   size: number;
//   url: string;
//   previewUrl: null;
//   provider: string;
//   provider_metadata: null;
//   createdAt: string;
//   updatedAt: string;
//   publishedAt: string;
// };

// type ImageFormat = {
//   ext: string;
//   url: string;
//   hash: string;
//   mime: string;
//   name: string;
//   path: null;
//   size: number;
//   width: number;
//   height: number;
// };
