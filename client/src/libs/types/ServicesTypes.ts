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
  feature: {
    title: string;
    data: {
      name: string;
      comment: string;
    }[];
  };
  tip: {
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
