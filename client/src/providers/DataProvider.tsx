"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { RawData, ServicesType } from "@/libs/types/DataTypes";

interface DataContextProps {
  data: ServicesType[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextProps>({
  data: [],
  isLoading: true,
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ServicesType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://${process.env.BACKEND_IP}/api/services?populate=*`
        );
        const jsonData = await res.json();
        const rawData: RawData[] = jsonData.data;
        const filteredData: ServicesType[] = rawData.map((item) => ({
          type: item.type,
          data: [
            {
              title: item.type,
              icon: item.icon.url,
              services: item.subservices.map((subservice) => subservice.name),
            },
          ],
        }));
        const servicesList: ServicesType[] = [];
        filteredData.forEach((item) => {
          if (!item.data) return;

          const { type } = item;
          const dataItem = item.data[0];

          const getIndexByType = (type: string): number => {
            switch (type) {
              case "Twitter":
                return 0;
              case "Reddit":
                return 1;
              case "Instagram":
                return 2;
              case "TikTok":
                return 3;
              case "Youtube":
                return 4;
              case "LinkedIn":
                return 5;
              case "Facebook":
                return 6;
              case "Spotify":
                return 7;
              case "Telegram":
                return 8;
              case "Tools":
                return 9;
              default:
                return -1; // Not a base type, handle later
            }
          };

          const baseIndex = getIndexByType(type);

          if (baseIndex !== -1) {
            // Base type: Create or overwrite
            const newType =
              type === "Tools"
                ? "FreeTools"
                : type === "Telegram"
                ? "Other"
                : type;

            const newData: ServicesType = {
              type: newType,
              data: [
                {
                  title: dataItem.title,
                  icon: dataItem.icon,
                  services: [...dataItem.services],
                },
              ],
            };
            servicesList[baseIndex] = newData; // Assign to specific index
          } else {
            // Starts with base type: Add to existing
            let targetIndex = -1;
            if (type.startsWith("Twitter")) targetIndex = 0;
            else if (type.startsWith("Reddit")) targetIndex = 1;
            else if (type.startsWith("Instagram")) targetIndex = 2;
            else if (type.startsWith("TikTok")) targetIndex = 3;
            else if (type.startsWith("Youtube")) targetIndex = 4;
            else if (type.startsWith("LinkedIn")) targetIndex = 5;
            else if (type.startsWith("FaceBook")) targetIndex = 6;
            else if (type.startsWith("Spotify")) targetIndex = 7;
            else targetIndex = 8; // Other

            if (servicesList[targetIndex]) {
              //Check if the item exits
              servicesList[targetIndex].data.push({
                title: dataItem.title,
                icon: dataItem.icon,
                services: [...dataItem.services],
              });
            }
          }
        });
        setData(servicesList);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const value: DataContextProps = {
    data,
    isLoading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
