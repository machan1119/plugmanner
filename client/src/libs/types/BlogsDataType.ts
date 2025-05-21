import { Text } from "./ServiceJsonDataType";

export interface SocialLink {
  id: number;
  link: string;
  img: string;
}

export interface Author {
  id: number;
  name: string;
  introduction: string;
  avatar: string;
  social: SocialLink[];
}

// export interface RichText {
//   id: number;
//   content: string;
//   bold: boolean;
//   link: string | null;
//   color: string | null;
//   underline: boolean;
// }

export interface Header {
  id: number;
  icon: string | null;
  text: Text[];
}

export interface Level2ListItem {
  id: number;
  text: Text[];
}

export interface Level1ListItem {
  id: number;
  Level2: Level2ListItem[];
  text: Text[];
}

export interface ParagraphList {
  id: number;
  numberlist: boolean;
  Level1: Level1ListItem[];
}

export interface Sentence {
  id: number;
  icon: string | null;
  text: Text[];
}

export interface Paragraph {
  id: number;
  img: string | null;
  Sentence: Sentence;
  List: ParagraphList[];
}

export interface Subsection {
  id: number;
  img: string | null;
  Paragraph: Paragraph[];
  Header: Header | null;
}

export interface Section {
  id: number;
  img: string | null;
  Header: Header | null;
  Subsection: Subsection[];
}

export interface Chapter {
  id: number;
  img: string | null;
  Section: Section[];
  Header: Header | null;
}

export interface Content {
  id: number;
  Chapter: Chapter[];
}

export interface ArticleCategory {
  id: number;
  documentId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  date: string; // ISO date string
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
  publishedAt: string; // ISO datetime string
  locale: string;
  img: string;
  simpleDescription: string;
  updated: boolean;
  readTime: string;
  Author: Author;
  article_category: ArticleCategory;
  Content?: Content;
}
