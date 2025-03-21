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
import { generate_slug } from "@/utils/functions";
import { fetchServiceData } from "@/utils/fetch-service-data";

interface ServicesContextType {
  serviceItems: ServiceJsonDataType | null;
  isLoading: boolean;
}

const ServicesContext = createContext<ServicesContextType>({
  serviceItems: null,
  isLoading: true,
});

interface ServicesProviderProps {
  item: string;
  children: React.ReactNode;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({
  item,
  children,
}) => {
  const { serviceList } = useList();
  const [serviceItems, setServiceItems] = useState<ServiceJsonDataType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const userLocale =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1] ?? "";
  useEffect(() => {
    const subservice = serviceList.data_3.find(
      (sub) => generate_slug(sub.name) == item
    );
    if (subservice) {
      const fetchAndSetData = async () => {
        const serviceData = (await fetchServiceData(subservice.id)) ?? "";
        if (!serviceData) {
          throw new Error("Failed to fetch service list");
        }
        setServiceItems(serviceData);
        setIsLoading(false);
      };
      fetchAndSetData();
    }
  }, [item, serviceList, userLocale]);
  const contextValue = useMemo(
    () => ({
      serviceItems,
      isLoading,
    }),
    [serviceItems, isLoading]
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
