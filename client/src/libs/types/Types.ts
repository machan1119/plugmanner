export interface ServicesType {
  type: string;
  data: {
    title: string;
    icon: string;
    services: string[];
  }[];
}

export interface ServicesDataType {
  title: string;
  icon: string;
  services: string[];
}

export interface ReviewType {
  title: string;
  description: string;
  name: string;
  date: string;
}

export interface WhyChooseThisType {
  icon: string;
  title: string;
  description: string;
}

export interface HowToOrderItemType {
  icon: string;
  title: string;
  description: string;
}

export interface QuestionsItemType {
  question: string;
  answer: string;
}

export interface OurPartnersItemType {
  name: string;
  icon: string;
  host: string;
  alt: string;
}
