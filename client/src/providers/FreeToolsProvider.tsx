"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { useList } from "./ListProvider";
import { generate_item_url_from_name } from "@/utils/functions";
import { fetchFreeToolsData } from "@/utils/fetch-free-tools-data";
import { FreeToolsJsonDataType } from "@/libs/types/FreeToolsJsonDataType";

interface FreeToolsContextType {
  freeToolItem: FreeToolsJsonDataType | null;
  isLoading: boolean;
}

const FreeToolsContext = createContext<FreeToolsContextType>({
  freeToolItem: null,
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
  const [freeToolItem, setFreeToolItem] =
    useState<FreeToolsJsonDataType | null>(null);
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
        setFreeToolItem(toolsData);
        setIsLoading(false);
      };
      setIsLoading(true);
      fetchAndSetData();
    }
  }, [item, freeToolsList, userLocale]);
  const contextValue = useMemo(
    () => ({
      freeToolItem,
      isLoading,
    }),
    [freeToolItem, isLoading]
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
