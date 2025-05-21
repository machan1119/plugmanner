"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { generate_item_url_from_blog_title } from "@/utils/functions";
import { Article } from "@/libs/types/BlogsDataType";
import { useBlogsList } from "./BlogsListProvider";
import { fetchBlogsData } from "@/utils/fetch-blogs-data";

interface BlogsContextType {
  blogsItem: Article | null;
  isLoading: boolean;
}

const BlogsContext = createContext<BlogsContextType>({
  blogsItem: null,
  isLoading: true,
});

interface BlogsProviderProps {
  item: string;
  children: React.ReactNode;
  locale: string;
}

export const BlogsProvider: React.FC<BlogsProviderProps> = ({
  item,
  children,
  locale,
}) => {
  const { blogsList } = useBlogsList();
  const [blogsItem, setBlogsItem] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userLocale = locale;
  useEffect(() => {
    const blogsItemTemp =
      blogsList &&
      blogsList.find(
        (sub) => generate_item_url_from_blog_title(sub.title) == item
      );
    if (blogsItemTemp) {
      const fetchAndSetData = async () => {
        const blogsItemTempData =
          (await fetchBlogsData(blogsItemTemp.documentId, userLocale)) ?? "";
        if (!blogsItemTempData) {
          throw new Error("Failed to fetch service list");
        }
        setBlogsItem(blogsItemTempData);
        setIsLoading(false);
      };
      setIsLoading(true);
      fetchAndSetData();
    }
  }, [item, blogsList, userLocale]);
  const contextValue = useMemo(
    () => ({
      blogsItem,
      isLoading,
    }),
    [blogsItem, isLoading]
  );

  return (
    <BlogsContext.Provider value={contextValue}>
      {children}
    </BlogsContext.Provider>
  );
};

export const useBlogs = (): BlogsContextType => {
  const context = useContext(BlogsContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogsProvider");
  }
  return context;
};
