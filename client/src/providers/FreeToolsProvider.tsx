"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ServiceJsonDataType } from "@/libs/types/ServiceJsonDataType";
import { useList } from "./ListProvider";
import { generate_item_url } from "@/utils/functions";
import { fetchServiceData } from "@/utils/fetch-service-data";

interface FreeToolsContextType {
  freeToolItems: ServiceJsonDataType | null;
  isLoading: boolean;
}

const FreeToolsContext = createContext<FreeToolsContextType>({
  freeToolItems: null,
  isLoading: true,
});

interface FreeToolsProviderProps {
  item: string;
  children: React.ReactNode;
  locale: string;
}

export const FreeToolsProvider: React.FC<FreeToolsProviderProps> = ({
  item,
  children,
  locale,
}) => {
  const { serviceList } = useList();
  const [freeToolItems, setFreeToolItems] =
    useState<ServiceJsonDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userLocale = locale;
  useEffect(() => {
    const subservice = serviceList.data_3.find(
      (sub) => generate_item_url(sub.header.text) == item
    );
    if (subservice) {
      const fetchAndSetData = async () => {
        const serviceData =
          (await fetchServiceData(subservice.id, userLocale)) ?? "";
        if (!serviceData) {
          throw new Error("Failed to fetch service list");
        }
        setFreeToolItems(serviceData);
        setIsLoading(false);
      };
      setIsLoading(true);
      fetchAndSetData();
    }
  }, [item, serviceList, userLocale]);
  const contextValue = useMemo(
    () => ({
      freeToolItems,
      isLoading,
    }),
    [freeToolItems, isLoading]
  );

  return (
    <FreeToolsContext.Provider value={contextValue}>
      {children}
    </FreeToolsContext.Provider>
  );
};

export const useFreeTools = (): FreeToolsContextType => {
  const context = useContext(FreeToolsContext);
  if (!context) {
    throw new Error("useFreeTools must be used within a FreeToolsProvider");
  }
  return context;
};
