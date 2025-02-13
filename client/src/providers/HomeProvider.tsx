"use client";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface HomeContextType {
  serviceShow: boolean;
  setServiceShow: Dispatch<SetStateAction<boolean>>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const HomeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [serviceShow, setServiceShow] = useState<boolean>(true);
  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth > 1024) {
        setServiceShow(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const value = useMemo<HomeContextType>(
    () => ({
      serviceShow,
      setServiceShow,
    }),
    [serviceShow]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHome must be used within a HomeProvider");
  }
  return context;
};

export default HomeProvider;
