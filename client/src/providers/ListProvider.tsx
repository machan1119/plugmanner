"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ProcessedListType } from "@/libs/types/ListTypes";
import { fetchAllServiceList } from "@/utils/fetch-all-service-list";

interface ListContextProps {
  serviceList: ProcessedListType;
  isLoading: boolean;
}

const ListContext = createContext<ListContextProps>({
  serviceList: {
    data_1: [],
    data_2: [],
    data_3: [],
  },
  isLoading: true,
});

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList must be used within a ListProvider");
  }
  return context;
};

export const ListProvider: React.FC<{
  children: React.ReactNode;
  locale: string;
}> = ({ children, locale }) => {
  const userLocale = locale;
  const [serviceList, setServiceList] = useState<ProcessedListType>({
    data_1: [],
    data_2: [],
    data_3: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchAndSetData = async () => {
      const processedList: ProcessedListType = (await fetchAllServiceList(
        userLocale
      )) ?? {
        data_1: [],
        data_2: [],
        data_3: [],
      };
      if (!processedList) {
        throw new Error("Failed to fetch service list");
      }
      setServiceList(processedList);
      setIsLoading(false);
    };
    fetchAndSetData();
  }, [userLocale]);
  const value = useMemo(
    () => ({
      serviceList,
      isLoading,
    }),
    [serviceList, isLoading]
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
