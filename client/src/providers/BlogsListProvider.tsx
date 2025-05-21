"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Article } from "@/libs/types/BlogsDataType";
import { fetchAllBlogsList } from "@/utils/fetch-all-blogs-list";

interface BlogsListContextProps {
  blogsList: Article[] | null;
  isLoading: boolean;
}

const BlogsListContext = createContext<BlogsListContextProps>({
  blogsList: null,
  isLoading: true,
});

export const useBlogsList = () => {
  const context = useContext(BlogsListContext);
  if (!context) {
    throw new Error("useBlogsList must be used within a BlogListProvider");
  }
  return context;
};

export const BlogsListProvider: React.FC<{
  children: React.ReactNode;
  locale: string;
}> = ({ children, locale }) => {
  const userLocale = locale;
  const [blogsList, setBlogsList] = useState<Article[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchAndSetData = async () => {
      const processedList: Article[] | undefined = await fetchAllBlogsList(
        userLocale
      );
      if (!processedList) {
        throw new Error("Failed to fetch service list");
      }
      setBlogsList(processedList);
      setIsLoading(false);
    };
    fetchAndSetData();
  }, [userLocale]);
  const value = useMemo(
    () => ({
      isLoading,
      blogsList,
    }),
    [isLoading, blogsList]
  );

  return (
    <BlogsListContext.Provider value={value}>
      {children}
    </BlogsListContext.Provider>
  );
};
