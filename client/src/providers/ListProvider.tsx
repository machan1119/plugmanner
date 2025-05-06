"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  FreeServicesListType,
  FreeToolsListType,
  ProcessedListType,
} from "@/libs/types/ListTypes";
import { fetchAllServiceList } from "@/utils/fetch-all-service-list";
import { fetchAllFreeToolsList } from "@/utils/fetch-all-free-tools-list";
import { fetchAllFreeServicesList } from "@/utils/fetch-all-free-services-list";

interface ListContextProps {
  serviceList: ProcessedListType;
  isLoading: boolean;
  freeToolsList: FreeToolsListType[];
  freeServicesList: FreeServicesListType[];
}

const ListContext = createContext<ListContextProps>({
  serviceList: {
    data_1: [],
    data_2: [],
    data_3: [],
  },
  freeToolsList: [],
  freeServicesList: [],
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
  const [freeToolsList, setFreeToolsList] = useState<FreeToolsListType[]>([]);
  const [freeServicesList, setFreeServicesList] = useState<
    FreeServicesListType[]
  >([]);
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
      const processedFreeToolsList: FreeToolsListType[] =
        (await fetchAllFreeToolsList(userLocale)) ?? [];
      const processedFreeServicesList: FreeServicesListType[] =
        (await fetchAllFreeServicesList(userLocale)) ?? [];
      setServiceList(processedList);
      setFreeToolsList(processedFreeToolsList);
      setFreeServicesList(processedFreeServicesList);
      setIsLoading(false);
    };
    fetchAndSetData();
  }, [userLocale]);
  const value = useMemo(
    () => ({
      serviceList,
      isLoading,
      freeToolsList,
      freeServicesList,
    }),
    [serviceList, isLoading, freeToolsList, freeServicesList]
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
