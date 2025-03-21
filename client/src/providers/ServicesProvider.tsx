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
import { generate_slug, getCookie } from "@/utils/functions";

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
  const locale = getCookie("NEXT_LOCALE");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const path = `/subservices/${itemId}`;
        const urlParamsObject = {
          pLevel: "7",
          sort: { createdAt: "asc" },
          "[locale]": locale,
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
  }, [itemId, locale]);

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
