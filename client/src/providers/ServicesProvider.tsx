"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { fetchAPI } from "@/utils/fetch-api";
import { ServiceJsonDataType } from "@/libs/types/ServiceJsonDataType";
import { useList } from "./ListProvider";
import { generate_slug } from "@/utils/functions";

interface ServicesContextType {
  serviceItems: ServiceJsonDataType | null;
  isLoading: boolean;
  error: string | null;
}

const ServicesContext = createContext<ServicesContextType>({
  serviceItems: null,
  isLoading: true,
  error: null,
});

interface ServicesProviderProps {
  item: string;
  children: React.ReactNode;
}

const useFetchServiceData = (itemId: string) => {
  const [serviceItems, setServiceItems] = useState<ServiceJsonDataType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const path = `/subservices/${itemId}`;
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
        setServiceItems(fetchedData.data);
      } catch (error) {
        setError("Failed to fetch service data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (itemId) {
      fetchData();
    }
  }, [itemId]);

  return { serviceItems, isLoading, error };
};

export const ServicesProvider: React.FC<ServicesProviderProps> = ({
  item,
  children,
}) => {
  const { subServiceList } = useList();
  const [itemId, setItemId] = useState("");

  useEffect(() => {
    const subservice = subServiceList.find(
      (sub) => generate_slug(sub.name) == item
    );
    if (subservice) {
      setItemId(subservice.id);
    }
  }, [item, subServiceList]);

  const { serviceItems, isLoading, error } = useFetchServiceData(itemId);

  const contextValue = useMemo(
    () => ({
      serviceItems,
      isLoading,
      error,
    }),
    [serviceItems, isLoading, error]
  );

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
