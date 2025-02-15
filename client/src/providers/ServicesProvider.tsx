"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAPI } from "@/utils/fetch-api";
import { ServiceJsonDataType } from "@/libs/types/ServiceJsonDataType";

interface ServicesContextType {
  serviceItems: ServiceJsonDataType | null;
  isLoading: boolean;
}

const ServicesContext = createContext<ServicesContextType>({
  serviceItems: null,
  isLoading: true,
}); // Provide a default value (important!)

interface ServicesProviderProps {
  item: string;
  children: React.ReactNode;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({
  item,
  children,
}) => {
  // const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  // const options = { headers: { Authorization: `Bearer ${token}` } };

  const [serviceItems, setServiceItems] = useState<ServiceJsonDataType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const path = `/subservices/${item}`;
        const urlParamsObject = {
          sort: { createdAt: "asc" },
          populate: [
            "header.text",
            "simpledescription.text",
            "introduction.CustomerReviews.title.icon",
            "introduction.CustomerReviews.title.text",
            "introduction.CustomerReviews.text.icon",
            "introduction.CustomerReviews.text.text",
            "introduction.CustomerReviews.Review",
            "introduction.ChoosePackage.package.list.icon",
            "introduction.ChoosePackage.package.list.text",
            "introduction.GoodPoints.list_img",
            "introduction.GoodPoints.chapter.img",
            "introduction.GoodPoints.chapter.title.icon",
            "introduction.GoodPoints.chapter.title.text",
            "introduction.GoodPoints.chapter.section.img",
            "introduction.GoodPoints.chapter.section.title.icon",
            "introduction.GoodPoints.chapter.section.title.text",
            "introduction.GoodPoints.chapter.section.content.icon",
            "introduction.GoodPoints.chapter.section.content.text",
            "introduction.UpBlogs.Blog.img",
            "introduction.UpBlogs.Blog.title.icon",
            "introduction.UpBlogs.Blog.title.text",
            "introduction.UpBlogs.Blog.paragraph.icon",
            "introduction.UpBlogs.Blog.paragraph.text",
            "introduction.Benefits.title.icon",
            "introduction.Benefits.title.text",
            "introduction.Benefits.Benefit.img",
            "introduction.Benefits.Benefit.paragraph.icon",
            "introduction.Benefits.Benefit.paragraph.text",
            "introduction.Benefits.Benefit.title.text",
            "introduction.Benefits.Benefit.title.icon",
            "introduction.DownBlogs.Blog.img",
            "introduction.DownBlogs.Blog.title.icon",
            "introduction.DownBlogs.Blog.title.text",
            "introduction.DownBlogs.Blog.paragraph.icon",
            "introduction.DownBlogs.Blog.paragraph.text",
            "introduction.Summary.title.icon",
            "introduction.Summary.title.text",
            "introduction.Summary.EachSummary.icon",
            "introduction.HowToOrder.title.icon",
            "introduction.HowToOrder.title.text",
            "introduction.HowToOrder.description.icon",
            "introduction.HowToOrder.description.text",
            "introduction.HowToOrder.step",
            "introduction.TopReviews.header.icon",
            "introduction.TopReviews.header.text",
            "introduction.TopReviews.review",
            "introduction.StateOfService.States",
            "introduction.OrderIntro.list.icon",
            "introduction.OrderIntro.list.text",
            "introduction.Quality.list.icon",
            "introduction.Quality.list.text",
            "introduction.FrequentlyQuestions.Question",
            "introduction.FrequentlyQuestions.header.icon",
            "introduction.FrequentlyQuestions.header.text",
            "article.main_img",
          ],
        };
        const options = "";
        const fetchedData = await fetchAPI(path, urlParamsObject, options);
        console.log(fetchedData);
        setServiceItems(fetchedData.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [item]);

  const contextValue: ServicesContextType = {
    serviceItems,
    isLoading,
  };

  return (
    <ServicesContext.Provider value={contextValue}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};
