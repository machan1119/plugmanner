import type { Schema, Struct } from '@strapi/strapi';

export interface ArticleAbstract extends Struct.ComponentSchema {
  collectionName: 'components_article_abstracts';
  info: {
    displayName: 'Abstract';
  };
  attributes: {
    img: Schema.Attribute.String;
  };
}

export interface ArticleArticleChapter extends Struct.ComponentSchema {
  collectionName: 'components_article_article_chapters';
  info: {
    description: '';
    displayName: 'articleChapter';
  };
  attributes: {
    Header: Schema.Attribute.Component<'general.list', false>;
    img: Schema.Attribute.String;
    Section: Schema.Attribute.Component<'article.article-section', true>;
  };
}

export interface ArticleArticleSection extends Struct.ComponentSchema {
  collectionName: 'components_article_article_sections';
  info: {
    displayName: 'articleSection';
  };
  attributes: {
    Header: Schema.Attribute.Component<'general.list', false>;
    img: Schema.Attribute.String;
    Subsection: Schema.Attribute.Component<'article.article-subsection', true>;
  };
}

export interface ArticleArticleSubsection extends Struct.ComponentSchema {
  collectionName: 'components_article_article_subsections';
  info: {
    displayName: 'articleSubsection';
  };
  attributes: {
    Header: Schema.Attribute.Component<'general.list', false>;
    img: Schema.Attribute.String;
    Paragraph: Schema.Attribute.Component<'article.paragraph', true>;
  };
}

export interface ArticleAuthor extends Struct.ComponentSchema {
  collectionName: 'components_article_authors';
  info: {
    description: '';
    displayName: 'author';
    icon: 'alien';
  };
  attributes: {
    avatar: Schema.Attribute.String;
    introduction: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    social: Schema.Attribute.Component<'general.social-link', true>;
  };
}

export interface ArticleChapter extends Struct.ComponentSchema {
  collectionName: 'components_article_chapters';
  info: {
    description: '';
    displayName: 'chapter';
    icon: 'store';
  };
  attributes: {
    img: Schema.Attribute.Text;
    section: Schema.Attribute.Component<'article.section', true>;
    title: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface ArticleContent extends Struct.ComponentSchema {
  collectionName: 'components_article_contents';
  info: {
    description: '';
    displayName: 'Content';
  };
  attributes: {
    Chapter: Schema.Attribute.Component<'article.article-chapter', true>;
  };
}

export interface ArticleLevel1 extends Struct.ComponentSchema {
  collectionName: 'components_article_level1s';
  info: {
    displayName: 'Level1';
  };
  attributes: {
    Level2: Schema.Attribute.Component<'article.level2', true>;
    text: Schema.Attribute.Component<'general.sentence', true>;
  };
}

export interface ArticleLevel2 extends Struct.ComponentSchema {
  collectionName: 'components_article_level2s';
  info: {
    displayName: 'Level2';
  };
  attributes: {
    text: Schema.Attribute.Component<'general.sentence', true>;
  };
}

export interface ArticleList extends Struct.ComponentSchema {
  collectionName: 'components_article_lists';
  info: {
    displayName: 'list';
  };
  attributes: {
    Level1: Schema.Attribute.Component<'article.level1', true>;
    numberlist: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface ArticleParagraph extends Struct.ComponentSchema {
  collectionName: 'components_article_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
  };
  attributes: {
    img: Schema.Attribute.String;
    List: Schema.Attribute.Component<'article.list', true>;
    Sentence: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface ArticleSection extends Struct.ComponentSchema {
  collectionName: 'components_article_sections';
  info: {
    description: '';
    displayName: 'section';
    icon: 'bulletList';
  };
  attributes: {
    content: Schema.Attribute.Component<'general.list', true>;
    img: Schema.Attribute.Text;
    title: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface GeneralBtn extends Struct.ComponentSchema {
  collectionName: 'components_general_btns';
  info: {
    displayName: 'btn';
  };
  attributes: {
    api: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface GeneralHeroImgs extends Struct.ComponentSchema {
  collectionName: 'components_general_hero_imgs';
  info: {
    description: '';
    displayName: 'hero_imgs';
  };
  attributes: {
    bg_img: Schema.Attribute.String;
    bridge_color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    center_img: Schema.Attribute.String;
    left_img: Schema.Attribute.String;
    right_img: Schema.Attribute.String;
  };
}

export interface GeneralInputFields extends Struct.ComponentSchema {
  collectionName: 'components_general_input_fields';
  info: {
    description: '';
    displayName: 'input_fields';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    checkImage: Schema.Attribute.String;
    emailImage: Schema.Attribute.String;
    formId: Schema.Attribute.String;
    inputLabel: Schema.Attribute.String;
    inputPlaceholder: Schema.Attribute.String;
    platform: Schema.Attribute.String;
    primaryColor: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#01C573'>;
    primaryColorHover: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#5ef5b6'>;
    socialPlatform: Schema.Attribute.String;
    successText: Schema.Attribute.Text;
    timerImage: Schema.Attribute.String;
    verificationText: Schema.Attribute.Text;
  };
}

export interface GeneralList extends Struct.ComponentSchema {
  collectionName: 'components_general_lists';
  info: {
    description: '';
    displayName: 'List';
    icon: 'bulletList';
  };
  attributes: {
    icon: Schema.Attribute.Text;
    text: Schema.Attribute.Component<'general.sentence', true>;
  };
}

export interface GeneralParameter extends Struct.ComponentSchema {
  collectionName: 'components_general_parameters';
  info: {
    displayName: 'parameter';
    icon: 'bulletList';
  };
  attributes: {
    character: Schema.Attribute.String & Schema.Attribute.Required;
    counters: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GeneralSentence extends Struct.ComponentSchema {
  collectionName: 'components_general_sentences';
  info: {
    description: '';
    displayName: 'sentence';
    icon: 'bulletList';
  };
  attributes: {
    bold: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    content: Schema.Attribute.Text;
    link: Schema.Attribute.String;
    underline: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface GeneralSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_general_social_links';
  info: {
    description: '';
    displayName: 'social_link';
    icon: 'feather';
  };
  attributes: {
    img: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface GeneralStatus extends Struct.ComponentSchema {
  collectionName: 'components_general_statuses';
  info: {
    displayName: 'status';
  };
  attributes: {
    status_1: Schema.Attribute.String;
    status_2: Schema.Attribute.String;
    status_3: Schema.Attribute.String;
  };
}

export interface OrderOrderIntro extends Struct.ComponentSchema {
  collectionName: 'components_order_order_intros';
  info: {
    description: '';
    displayName: 'OrderIntro';
    icon: 'archive';
  };
  attributes: {
    list: Schema.Attribute.Component<'general.list', true>;
    price: Schema.Attribute.Float &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    unit: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface OrderOrders extends Struct.ComponentSchema {
  collectionName: 'components_order_orders';
  info: {
    displayName: 'Orders';
  };
  attributes: {
    subservice: Schema.Attribute.Relation<
      'oneToOne',
      'api::subservice.subservice'
    >;
    Title: Schema.Attribute.String;
  };
}

export interface OrderQqq extends Struct.ComponentSchema {
  collectionName: 'components_order_qqqs';
  info: {
    description: '';
    displayName: 'OrderIntroSentence';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    description: '';
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Text;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    description: '';
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogdescription: Schema.Attribute.Text & Schema.Attribute.Required;
    ogimage: Schema.Attribute.Text;
    ogtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    ogtype: Schema.Attribute.String;
    ogurl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Text;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.Text & Schema.Attribute.Required;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SocialContactSocialLinkedin extends Struct.ComponentSchema {
  collectionName: 'components_social_contact_social_linkedins';
  info: {
    displayName: 'social_linkedin';
    icon: 'paperPlane';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    link: Schema.Attribute.Text;
    LinkedIn: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'LinkedIn'>;
  };
}

export interface SubserviceAggregateRating extends Struct.ComponentSchema {
  collectionName: 'components_subservice_aggregate_ratings';
  info: {
    displayName: 'aggregateRating';
  };
  attributes: {
    ratingCount: Schema.Attribute.Integer;
    ratingValue: Schema.Attribute.Float & Schema.Attribute.DefaultTo<4.8>;
    type: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'AggregateRating'>;
  };
}

export interface SubserviceBenefits extends Struct.ComponentSchema {
  collectionName: 'components_subservice_benefits';
  info: {
    description: '';
    displayName: 'Benefits';
  };
  attributes: {
    Benefit: Schema.Attribute.Component<'subservice.sub-benefit', true>;
    title: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface SubserviceBlogs extends Struct.ComponentSchema {
  collectionName: 'components_subservice_blogs';
  info: {
    description: '';
    displayName: 'Blogs';
    icon: 'apps';
  };
  attributes: {
    Blog: Schema.Attribute.Component<'subservice.sub-blog', true>;
    title: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface SubserviceBrand extends Struct.ComponentSchema {
  collectionName: 'components_subservice_brands';
  info: {
    description: '';
    displayName: 'brand';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.DefaultTo<'SocialPlug'>;
    type: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Brand'>;
  };
}

export interface SubserviceChoosePackage extends Struct.ComponentSchema {
  collectionName: 'components_subservice_choose_packages';
  info: {
    displayName: 'ChoosePackage';
    icon: 'heart';
  };
  attributes: {
    package: Schema.Attribute.Component<'subservice.package', true>;
  };
}

export interface SubserviceCustomerReviews extends Struct.ComponentSchema {
  collectionName: 'components_subservice_customer_reviews';
  info: {
    description: '';
    displayName: 'CustomerReviews';
    icon: 'crown';
  };
  attributes: {
    counterofreviews: Schema.Attribute.BigInteger &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'1000'>;
    rate: Schema.Attribute.Float &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<4.8>;
    Review: Schema.Attribute.Component<'subservice.review', true>;
    text: Schema.Attribute.Component<'general.list', true>;
    title: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface SubserviceEachSummary extends Struct.ComponentSchema {
  collectionName: 'components_subservice_each_summaries';
  info: {
    description: '';
    displayName: 'EachSummary';
    icon: 'dashboard';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Text;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SubserviceFrequentlyQuestions extends Struct.ComponentSchema {
  collectionName: 'components_subservice_frequently_questions';
  info: {
    description: '';
    displayName: 'FrequentlyQuestions';
    icon: 'user';
  };
  attributes: {
    header: Schema.Attribute.Component<'general.list', false>;
    Question: Schema.Attribute.Component<'subservice.question', true> &
      Schema.Attribute.Required;
  };
}

export interface SubserviceGoodPoint extends Struct.ComponentSchema {
  collectionName: 'components_subservice_good_points';
  info: {
    description: '';
    displayName: 'GoodPoint';
    icon: 'apps';
  };
  attributes: {
    chapter: Schema.Attribute.Component<'article.chapter', true>;
  };
}

export interface SubserviceHowToOrder extends Struct.ComponentSchema {
  collectionName: 'components_subservice_how_to_orders';
  info: {
    description: '';
    displayName: 'HowToOrder';
    icon: 'strikeThrough';
  };
  attributes: {
    description: Schema.Attribute.Component<'general.list', false>;
    step: Schema.Attribute.Component<'subservice.how-to-order-step', true>;
    title: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface SubserviceHowToOrderStep extends Struct.ComponentSchema {
  collectionName: 'components_subservice_how_to_order_steps';
  info: {
    description: '';
    displayName: 'HowToOrderStep';
    icon: 'bulletList';
  };
  attributes: {
    detail: Schema.Attribute.Text;
    simple: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SubserviceOffers extends Struct.ComponentSchema {
  collectionName: 'components_subservice_offers';
  info: {
    displayName: 'offers';
    icon: 'emotionUnhappy';
  };
  attributes: {
    offerCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<200>;
    price: Schema.Attribute.Float;
    priceCurrency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'USD'>;
    type: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'AggregateOffer'>;
    url: Schema.Attribute.Text;
  };
}

export interface SubservicePackage extends Struct.ComponentSchema {
  collectionName: 'components_subservice_packages';
  info: {
    description: '';
    displayName: 'package';
    icon: 'bulletList';
  };
  attributes: {
    level: Schema.Attribute.String;
    list: Schema.Attribute.Component<'general.list', true>;
    popular: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    price: Schema.Attribute.String;
    unit: Schema.Attribute.String;
  };
}

export interface SubserviceProduct extends Struct.ComponentSchema {
  collectionName: 'components_subservice_products';
  info: {
    description: '';
    displayName: 'Product';
    icon: 'alien';
  };
  attributes: {
    aggregateRating: Schema.Attribute.Component<
      'subservice.aggregate-rating',
      false
    >;
    brand: Schema.Attribute.Component<'subservice.brand', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    offers: Schema.Attribute.Component<'subservice.offers', false>;
    sku: Schema.Attribute.String;
    type: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Product'>;
    url: Schema.Attribute.Text;
  };
}

export interface SubserviceQuality extends Struct.ComponentSchema {
  collectionName: 'components_subservice_qualities';
  info: {
    description: '';
    displayName: 'Quality';
    icon: 'briefcase';
  };
  attributes: {
    list: Schema.Attribute.Component<'general.list', true>;
  };
}

export interface SubserviceQuestion extends Struct.ComponentSchema {
  collectionName: 'components_subservice_questions';
  info: {
    description: '';
    displayName: 'Question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SubserviceReview extends Struct.ComponentSchema {
  collectionName: 'components_subservice_reviews';
  info: {
    description: '';
    displayName: 'review';
    icon: 'paperPlane';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    customer: Schema.Attribute.String & Schema.Attribute.Required;
    date: Schema.Attribute.Date;
    rated: Schema.Attribute.Float &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<5>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SubserviceServiceSummary extends Struct.ComponentSchema {
  collectionName: 'components_subservice_service_summaries';
  info: {
    description: '';
    displayName: 'ServiceSummary';
    icon: 'car';
  };
  attributes: {
    description: Schema.Attribute.Component<'general.list', false>;
    EachSummary: Schema.Attribute.Component<'subservice.each-summary', true>;
    title: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface SubserviceStateOfService extends Struct.ComponentSchema {
  collectionName: 'components_subservice_state_of_services';
  info: {
    displayName: 'StateOfService';
    icon: 'brush';
  };
  attributes: {
    States: Schema.Attribute.Component<'general.parameter', true>;
  };
}

export interface SubserviceSubBenefit extends Struct.ComponentSchema {
  collectionName: 'components_subservice_sub_benefits';
  info: {
    description: '';
    displayName: 'SubBenefit';
  };
  attributes: {
    alt: Schema.Attribute.Text;
    Button: Schema.Attribute.String;
    button_api: Schema.Attribute.Text;
    img: Schema.Attribute.Text & Schema.Attribute.Required;
    paragraph: Schema.Attribute.Component<'general.list', true>;
    tabname: Schema.Attribute.String;
    title: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface SubserviceSubBlog extends Struct.ComponentSchema {
  collectionName: 'components_subservice_sub_blogs';
  info: {
    description: '';
    displayName: 'SubBlog';
    icon: 'feather';
  };
  attributes: {
    alt: Schema.Attribute.Text;
    button: Schema.Attribute.String;
    button_api: Schema.Attribute.String;
    img: Schema.Attribute.Text & Schema.Attribute.Required;
    paragraph: Schema.Attribute.Component<'general.list', true>;
    title: Schema.Attribute.Component<'general.list', false>;
  };
}

export interface SubserviceSubserviceIntroduction
  extends Struct.ComponentSchema {
  collectionName: 'components_subservice_subservice_introductions';
  info: {
    description: '';
    displayName: 'subserviceIntroduction';
    icon: 'apps';
  };
  attributes: {
    Benefits: Schema.Attribute.Component<'subservice.benefits', false>;
    ChoosePackage: Schema.Attribute.Component<
      'subservice.choose-package',
      false
    >;
    CounterOfReviews: Schema.Attribute.BigInteger &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'1000'>;
    CustomerReviews: Schema.Attribute.Component<
      'subservice.customer-reviews',
      false
    >;
    DownBlogs: Schema.Attribute.Component<'subservice.blogs', false>;
    FrequentlyQuestions: Schema.Attribute.Component<
      'subservice.frequently-questions',
      false
    >;
    GoodPoints: Schema.Attribute.Component<'subservice.good-point', false>;
    HowToOrder: Schema.Attribute.Component<'subservice.how-to-order', false>;
    OrderIntro: Schema.Attribute.Component<'order.order-intro', false> &
      Schema.Attribute.Required;
    Quality: Schema.Attribute.Component<'subservice.quality', false>;
    rated: Schema.Attribute.Float &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<4.8>;
    StateOfService: Schema.Attribute.Component<
      'subservice.state-of-service',
      false
    >;
    Summary: Schema.Attribute.Component<'subservice.service-summary', false>;
    Summary2: Schema.Attribute.Component<'subservice.service-summary', false>;
    TopReviews: Schema.Attribute.Component<'subservice.top-reviews', false>;
    UpBlogs: Schema.Attribute.Component<'subservice.blogs', false>;
    video: Schema.Attribute.Text;
    video_title: Schema.Attribute.Text;
  };
}

export interface SubserviceTopReviews extends Struct.ComponentSchema {
  collectionName: 'components_subservice_top_reviews';
  info: {
    description: '';
    displayName: 'TopReviews';
    icon: 'cloud';
  };
  attributes: {
    header: Schema.Attribute.Component<'general.list', false>;
    rate: Schema.Attribute.Float &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<5>;
    review: Schema.Attribute.Component<'subservice.review', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'article.abstract': ArticleAbstract;
      'article.article-chapter': ArticleArticleChapter;
      'article.article-section': ArticleArticleSection;
      'article.article-subsection': ArticleArticleSubsection;
      'article.author': ArticleAuthor;
      'article.chapter': ArticleChapter;
      'article.content': ArticleContent;
      'article.level1': ArticleLevel1;
      'article.level2': ArticleLevel2;
      'article.list': ArticleList;
      'article.paragraph': ArticleParagraph;
      'article.section': ArticleSection;
      'general.btn': GeneralBtn;
      'general.hero-imgs': GeneralHeroImgs;
      'general.input-fields': GeneralInputFields;
      'general.list': GeneralList;
      'general.parameter': GeneralParameter;
      'general.sentence': GeneralSentence;
      'general.social-link': GeneralSocialLink;
      'general.status': GeneralStatus;
      'order.order-intro': OrderOrderIntro;
      'order.orders': OrderOrders;
      'order.qqq': OrderQqq;
      'shared.meta-social': SharedMetaSocial;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
      'social-contact.social-linkedin': SocialContactSocialLinkedin;
      'subservice.aggregate-rating': SubserviceAggregateRating;
      'subservice.benefits': SubserviceBenefits;
      'subservice.blogs': SubserviceBlogs;
      'subservice.brand': SubserviceBrand;
      'subservice.choose-package': SubserviceChoosePackage;
      'subservice.customer-reviews': SubserviceCustomerReviews;
      'subservice.each-summary': SubserviceEachSummary;
      'subservice.frequently-questions': SubserviceFrequentlyQuestions;
      'subservice.good-point': SubserviceGoodPoint;
      'subservice.how-to-order': SubserviceHowToOrder;
      'subservice.how-to-order-step': SubserviceHowToOrderStep;
      'subservice.offers': SubserviceOffers;
      'subservice.package': SubservicePackage;
      'subservice.product': SubserviceProduct;
      'subservice.quality': SubserviceQuality;
      'subservice.question': SubserviceQuestion;
      'subservice.review': SubserviceReview;
      'subservice.service-summary': SubserviceServiceSummary;
      'subservice.state-of-service': SubserviceStateOfService;
      'subservice.sub-benefit': SubserviceSubBenefit;
      'subservice.sub-blog': SubserviceSubBlog;
      'subservice.subservice-introduction': SubserviceSubserviceIntroduction;
      'subservice.top-reviews': SubserviceTopReviews;
    }
  }
}
