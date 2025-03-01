"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { RawData, ListType } from "@/libs/types/ListTypes";
import { fetchAPI } from "@/utils/fetch-api";

interface ListContextProps {
  list: ListType[];
  isLoading: boolean;
}

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

const ListContext = createContext<ListContextProps>({
  list: [],
  isLoading: true,
});

export const useList = () => useContext(ListContext);

export const ListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [list, setList] = useState<ListType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(
    async (start: number, limit: number) => {
      try {
        // const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        // const options = { headers: { Authorization: `Bearer ${token}` } };

        const path = "/services";
        const urlParamsObject = {
          sort: { popular: "desc" },
          populate: "*",
          pagination: {
            start: start,
            limit: limit,
          },
        };
        const options = "";
        const responseData = await fetchAPI(path, urlParamsObject, options);
        if (!meta?.pagination) {
          setMeta(responseData.meta);
        }
        const rawData: RawData[] = responseData.data;
        // console.log(rawData);
        const filteredData: ListType[] = rawData.map((item) => ({
          type: item.type,
          data: [
            {
              title: item.type,
              icon: item.icon.url,
              services: item.subservices.map((subservice) => ({
                name: subservice.name,
                id: subservice.documentId,
              })),
            },
          ],
        }));
        const servicesList: ListType[] = [];
        filteredData.forEach((item) => {
          if (!item.data) return;
          const { type } = item;
          const dataItem = item.data[0];
          const getIndexByType = (type: string): number => {
            switch (type) {
              case "Twitter(X)":
                return 0;
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
            const newType =
              type === "Tools"
                ? "FreeTools"
                : type === "Telegram"
                ? "Other"
                : type;

            const newData: ListType = {
              type: newType == "Twitter(X)" ? "Twitter" : newType,
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
            if (type.startsWith("Twitter(X)")) targetIndex = 0;
            else if (type.startsWith("Twitter")) targetIndex = 0;
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
        setList(servicesList);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [meta]
  );

  useEffect(() => {
    if (meta?.pagination) fetchData(0, meta!.pagination.total);
    else {
      fetchData(0, 1);
    }
  }, [fetchData, meta]);

  const value: ListContextProps = {
    list,
    isLoading,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
