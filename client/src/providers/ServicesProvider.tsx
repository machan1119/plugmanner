"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface PageData {
  id: string;
  title: string;
  content: string;
}

interface ServicesContextType {
  pageData: PageData | null;
  isLoading: boolean;
}

const ServicesContext = createContext<ServicesContextType>({
  pageData: null,
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
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/services/${item}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PageData = await response.json();
        setPageData(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [item]); //  Critically important:  item is the dependency

  const contextValue: ServicesContextType = {
    pageData,
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
