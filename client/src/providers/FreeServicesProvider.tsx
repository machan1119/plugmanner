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
import { fetchFreeServicesData } from "@/utils/fetch-free-services-data";
import { FreeServicesJsonDataType } from "@/libs/types/FreeServicesJsonDataType";

interface FreeServicesContextType {
  freeServiceItem: FreeServicesJsonDataType | null;
  isLoading: boolean;
}

const FreeServicesContext = createContext<FreeServicesContextType>({
  freeServiceItem: null,
  isLoading: true,
});

interface FreeServicesProviderProps {
  item: string;
  children: React.ReactNode;
  locale: string;
}

export const FreeServicesProvider: React.FC<FreeServicesProviderProps> = ({
  item,
  children,
  locale,
}) => {
  const { freeServicesList } = useList();
  const [freeServiceItem, setFreeServiceItem] =
    useState<FreeServicesJsonDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userLocale = locale;
  useEffect(() => {
    const servicesItem = freeServicesList.find(
      (sub) => generate_item_url_from_name(sub.name) == item
    );
    if (servicesItem) {
      const fetchAndSetData = async () => {
        const freeServicesData =
          (await fetchFreeServicesData(servicesItem.id, userLocale)) ?? "";
        if (!freeServicesData) {
          throw new Error("Failed to fetch service list");
        }
        setFreeServiceItem(freeServicesData);
        setIsLoading(false);
      };
      setIsLoading(true);
      fetchAndSetData();
    }
  }, [item, freeServicesList, userLocale]);
  const contextValue = useMemo(
    () => ({
      freeServiceItem,
      isLoading,
    }),
    [freeServiceItem, isLoading]
  );

  return (
    <FreeServicesContext.Provider value={contextValue}>
      {children}
    </FreeServicesContext.Provider>
  );
};

export const useFreeServices = (): FreeServicesContextType => {
  const context = useContext(FreeServicesContext);
  if (!context) {
    throw new Error(
      "useFreeServices must be used within a FreeServicesProvider"
    );
  }
  return context;
};
