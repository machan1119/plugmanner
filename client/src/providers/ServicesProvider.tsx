"use client";
import { convertData } from "@/utils/functions";
import { ServiceItemsCurrentType } from "@/libs/types/ServiceDataType";
import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAPI } from "@/utils/fetch-api";

interface ServicesContextType {
  serviceItems: ServiceItemsCurrentType | null;
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

  const [serviceItems, setServiceItems] =
    useState<ServiceItemsCurrentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const path = `/subservices/${item}`;
        const urlParamsObject = {
          sort: { createdAt: "asc" },
          populate: [
            "introduction",
            "introduction.OrderIntro.sentence",
            "introduction.StateOfService.States",
            "introduction.TopReviews.review",
            "introduction.HowToOrder.step",
            "introduction.Summary.EachSummary.icon",
            // "introduction.UpBlogs.Blog.paragraph",
            "introduction.UpBlogs.Blog.img",
            // "introduction.Benefits.Benefit.paragraph",
            "introduction.Benefits.Benefit.img",
            // "introduction.DownBlogs.Blog.paragraph",
            "introduction.DownBlogs.Blog.img",
            "introduction.CustomerReviews.Review",
            "introduction.FrequentlyQuestions.Question",
            "introduction.ChoosePackage.package.list",
            // "introduction.Quality.list",
            // "introduction.GoodPoints.chapter.section.img",
            "article.main_img",
          ],
        };
        const options = "";
        const fetchedData = await fetchAPI(path, urlParamsObject, options);
        console.log(fetchedData.data);
        const data: ServiceItemsCurrentType = convertData(fetchedData);
        setServiceItems(data);
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
