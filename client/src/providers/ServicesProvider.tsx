"use client";
import { ServiceItems } from "@/libs/data/Services";
import { ServiceItemsType } from "@/libs/types/ServicesTypes";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ServicesContextType {
  serviceItems: ServiceItemsType | null;
  isLoading: boolean;
}

const ServicesContext = createContext<ServicesContextType>({
  serviceItems: null,
  isLoading: true,
}); // Provide a default value (important!)

interface ServicesProviderProps {
  item: string;
  children: React.ReactNode;
}

export const ServicesProvider: React.FC<ServicesProviderProps> = ({
  item,
  children,
}) => {
  const [serviceItems, setServiceItems] = useState<ServiceItemsType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   setIsLoading(true);
    //   try {
    //     const response = await fetch(
    //       `${process.env.BACKEND_URL}/services/${item}`
    //     );
    //     console.log(response);
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     const data: ServiceItemsType = await response.json();
    //     setServiceItems(data);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchData();

    setServiceItems(ServiceItems); //just for development
    setIsLoading(false); //just for development
    console.log(serviceItems);
  }, [item]);

  const contextValue: ServicesContextType = {
    serviceItems,
    isLoading,
  };

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
