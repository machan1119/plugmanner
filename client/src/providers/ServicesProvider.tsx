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
            "introduction.CustomerReviews.title",
            "introduction.CustomerReviews.title.text",
            "introduction.CustomerReviews.text",
            "introduction.CustomerReviews.text.text",
            "introduction.CustomerReviews.Review",
            "introduction.ChoosePackage.package.list",
            "introduction.ChoosePackage.package.list.text",
            "introduction.GoodPoints.chapter",
            "introduction.GoodPoints.chapter.title",
            "introduction.GoodPoints.chapter.title.text",
            "introduction.GoodPoints.chapter.section",
            "introduction.GoodPoints.chapter.section.title",
            "introduction.GoodPoints.chapter.section.title.text",
            "introduction.GoodPoints.chapter.section.content",
            "introduction.GoodPoints.chapter.section.content.text",
            "introduction.UpBlogs.title",
            "introduction.UpBlogs.title.text",
            "introduction.UpBlogs.Blog",
            "introduction.UpBlogs.Blog.title",
            "introduction.UpBlogs.Blog.title.text",
            "introduction.UpBlogs.Blog.paragraph",
            "introduction.UpBlogs.Blog.paragraph.text",
            "introduction.Benefits.title",
            "introduction.Benefits.title.text",
            "introduction.Benefits.Benefit",
            "introduction.Benefits.Benefit.paragraph",
            "introduction.Benefits.Benefit.paragraph.text",
            "introduction.Benefits.Benefit.title.text",
            "introduction.Benefits.Benefit.title",
            "introduction.DownBlogs.title",
            "introduction.DownBlogs.title.text",
            "introduction.DownBlogs.Blog",
            "introduction.DownBlogs.Blog.title",
            "introduction.DownBlogs.Blog.title.text",
            "introduction.DownBlogs.Blog.paragraph",
            "introduction.DownBlogs.Blog.paragraph.text",
            "introduction.Summary.title",
            "introduction.Summary.title.text",
            "introduction.Summary.EachSummary",
            "introduction.Summary2.title",
            "introduction.Summary2.title.text",
            "introduction.Summary2.EachSummary",
            "introduction.HowToOrder.title",
            "introduction.HowToOrder.title.text",
            "introduction.HowToOrder.description",
            "introduction.HowToOrder.description.text",
            "introduction.HowToOrder.step",
            "introduction.TopReviews.header",
            "introduction.TopReviews.header.text",
            "introduction.TopReviews.review",
            "introduction.StateOfService.States",
            "introduction.OrderIntro.list",
            "introduction.OrderIntro.list.text",
            "introduction.Quality.list",
            "introduction.Quality.list.text",
            "introduction.FrequentlyQuestions.Question",
            "introduction.FrequentlyQuestions.header",
            "introduction.FrequentlyQuestions.header.text",
            "article",
          ],
        };
        const options = "";
        const fetchedData = await fetchAPI(path, urlParamsObject, options);
        console.log(fetchedData);
        setServiceItems(fetchedData.data);
      } catch (error) {
        console.error(error);
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
