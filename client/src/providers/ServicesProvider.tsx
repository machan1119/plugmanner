"use client";
import { ServiceItems } from "@/libs/data/Services";
import { transformData } from "@/libs/functions";
import { ServiceItemsCurrentType } from "@/libs/types/ServicesTypes";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ServicesContextType {
  serviceItems: ServiceItemsCurrentType | null;
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
  const [serviceItems, setServiceItems] =
    useState<ServiceItemsCurrentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/subservices/${item}?populate[0]=introduction&populate[1]=introduction.OrderIntro.sentence&populate[2]=introduction.StateOfService.States&populate[3]=introduction.TopReviews.review&populate[4]=introduction.HowToOrder.step&populate[5]=introduction.Summary.EachSummary.icon&populate[6]=introduction.UpBlogs.Blog.img&populate[7]=introduction.Benefits.Benefit.img&populate[8]=introduction.UpBlogs.Blog.img&populate[9]=introduction.CustomerReviews.Review&populate[10]=article.main_img&populate[11]=introduction.FrequentlyQuestions.Question`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        const data: ServiceItemsCurrentType = transformData(fetchedData.data);

        setServiceItems(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    // setServiceItems(ServiceItems); //just for development
    // setIsLoading(false); //just for development
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
