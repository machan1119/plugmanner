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
import { generate_item_url_from_name } from "@/utils/functions";
import { fetchFreeToolsData } from "@/utils/fetch-free-tools-data";

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
  const { freeToolsList } = useList();
  const [freeToolItems, setFreeToolItems] =
    useState<ServiceJsonDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userLocale = locale;
  useEffect(() => {
    const toolsItem = freeToolsList.find(
      (sub) => generate_item_url_from_name(sub.name) == item
    );
    if (toolsItem) {
      const fetchAndSetData = async () => {
        const toolsData =
          (await fetchFreeToolsData(toolsItem.id, userLocale)) ?? "";
        if (!toolsData) {
          throw new Error("Failed to fetch service list");
        }
        setFreeToolItems(toolsData);
        setIsLoading(false);
      };
      setIsLoading(true);
      fetchAndSetData();
    }
  }, [item, freeToolsList, userLocale]);
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
