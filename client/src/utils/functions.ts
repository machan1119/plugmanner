import {
  Article,
  BenefitType,
  BlogType,
  HowToOrderStep,
  JsonDataType,
  OrderIntroSentence,
  QuestionType,
  Review,
  StateItem,
  SummaryItem,
} from "../libs/types/JsonDataType";
import { ServiceItemsCurrentType } from "../libs/types/ServicesTypes";

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function slugify_reverse(slug: string[]): string {
  return slug.join("-");
}
export function replace_str(s1: string, s2: string): string {
  s1 = s1.replaceAll(s2, "");
  return s1;
}

export function transformData(json: JsonDataType): ServiceItemsCurrentType {
  const input = json.data;
  return {
    name: input.name,
    subname: input.subname,
    type: input.type,
    introduction: {
      SimpleDescription: input.introduction.SimpleDescription,
      rated: input.introduction.rated,
      CounterOfReviews: input.introduction.CounterOfReviews,
      video: input.introduction.video,
      CustomerReviews: {
        title: input.introduction.CustomerReviews.title,
        text: input.introduction.CustomerReviews.text,
        rate: input.introduction.CustomerReviews.rate,
        counterofreviews: input.introduction.CustomerReviews.counterofreviews,
        Review: input.introduction.CustomerReviews.Review.map(
          (review: Review) => ({
            title: review.title,
            rated: review.rated,
            content: review.content,
            customer: review.customer,
            date: review.date,
          })
        ),
      },
      Benefits: {
        title: input.introduction.Benefits.title,
        Benefit: input.introduction.Benefits.Benefit.map(
          (benefit: BenefitType) => ({
            tabname: benefit.tabname,
            title: benefit.title,
            content: benefit.content,
            img: {
              url: benefit.img.url,
            },
          })
        ),
      },
      UpBlogs: {
        Blog: input.introduction.UpBlogs.Blog.map((blog: BlogType) => ({
          title: blog.title,
          content: blog.content,
          img: {
            url: blog.img.url,
          },
        })),
      },
      Summary: {
        title: input.introduction.Summary.title,
        EachSummary: input.introduction.Summary.EachSummary.map(
          (eachSummary: SummaryItem) => ({
            id: eachSummary.id,
            title: eachSummary.title,
            content: eachSummary.content,
          })
        ),
      },
      HowToOrder: {
        description: input.introduction.HowToOrder.description,
        step: input.introduction.HowToOrder.step.map(
          (stepItem: HowToOrderStep) => ({
            simple: stepItem.simple,
            detail: stepItem?.detail,
          })
        ),
      },
      TopReviews: {
        header: input.introduction.TopReviews.header,
        rate: input.introduction.TopReviews.rate,
        review: input.introduction.TopReviews.review.map(
          (reviewItem: Review) => ({
            title: reviewItem.title,
            rated: reviewItem.rated,
            content: reviewItem.content,
            customer: reviewItem.customer,
            date: reviewItem.date,
          })
        ),
      },
      StateOfService: {
        States: input.introduction.StateOfService.States.map(
          (states: StateItem) => ({
            counters: states.counters,
            character: states.character,
          })
        ),
      },
      OrderIntro: {
        price: input.introduction.OrderIntro.price,
        unit: input.introduction.OrderIntro.unit,
        sentence: input.introduction.OrderIntro.sentence.map(
          (sentenceItem: OrderIntroSentence) => ({
            text: sentenceItem.text,
          })
        ),
      },
      FrequentlyQuestions: {
        Question: input.introduction.FrequentlyQuestions.Question.map(
          (questionItem: QuestionType) => ({
            question: questionItem.question,
            answer: questionItem.answer,
          })
        ),
      },
    },
    article: input.article.map((articlesItem: Article) => ({
      title: articlesItem.title,
      main_img: {
        url: articlesItem.main_img[0].url,
      },
    })),
  };
}
