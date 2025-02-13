export interface ServiceItemsType {
  info: {
    type: string;
    name: string;
    description: string;
    rate: string;
    reviews: string;
    detail: {
      base_price: string;
      type: string;
      features: string[];
    };
  };
  state: {
    type: string;
    number: string;
  }[];
  review: {
    title: string;
    comment: string;
    customerName: string;
    date: string;
  }[];
  howTo: {
    title: string;
    description: string;
    steps: {
      name: string;
      detail: string;
    }[];
  };
  whyBuyThis: {
    title: string;
    data: {
      icon: string;
      name: string;
      comment: string;
    }[];
  };
  benefit: {
    title: string;
    data: {
      icon: string;
      name: string;
      subName: string;
      comment: string;
    }[];
  };
  method: {
    icon: string;
    title: string;
    comment: string;
  }[];
  customerReview: {
    title: string;
    comment: string;
    customerName: string;
    date: string;
  }[];
  question: {
    title: string;
    answer: string;
  }[];
  article: {
    icon: string;
    title: string;
  }[];
}

export interface ServiceItemsCurrentType {
  name: string;
  type: string;
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
        detail: null;
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
