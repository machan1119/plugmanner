export interface ServiceItemsCurrentType {
  name: string;
  type: string;
  subname: string;
  introduction: {
    SimpleDescription: string;
    rated: number;
    CounterOfReviews: string;
    video: string;
    CustomerReviews: {
      title: string;
      text: string;
      rate: number;
      counterofreviews: string;
      Review: {
        title: string;
        rated: number;
        content: string;
        customer: string;
        date: string;
      }[];
    };
    Benefits: {
      title?: string;
      Benefit: {
        tabname: string;
        title: string;
        content: string;
        img: {
          url: string;
        };
      }[];
    };
    UpBlogs: {
      Blog: {
        title: string;
        content: string;
        img: {
          url: string;
        };
      }[];
    };
    Summary: {
      title: string;
      EachSummary: {
        id: number;
        title: string;
        content: string;
      }[];
    };
    HowToOrder: {
      description: string;
      step: {
        simple: string;
        detail: string | null;
      }[];
    };
    TopReviews: {
      header: string;
      rate: number;
      review: {
        title: string;
        rated: number;
        content: string;
        customer: string;
        date: string;
      }[];
    };
    StateOfService: {
      States: {
        counters: string;
        character: string;
      }[];
    };
    OrderIntro: {
      price: number;
      unit: string;
      sentence: {
        text: string;
      }[];
    };
    FrequentlyQuestions: {
      Question: {
        question: string;
        answer: string;
      }[];
    };
  };
  article: {
    title: string;
    main_img: {
      url: string;
    };
  }[];
}
