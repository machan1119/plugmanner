import React, { memo, useEffect, useState } from "react";
import DropDownServices from "./DropDownServices";
import { useList } from "@/providers/ListProvider";
import { ServiceListSkeleton } from "@/components/Skeletons";
import DropDownServicesResponsive from "./DropDownServicesResponsive";
import { useHome } from "@/providers/HomeProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { ListType } from "@/libs/types/ListTypes";

const NavBarBottom = memo(() => {
  const { serviceShow } = useHome();
  const { list, isLoading } = useList();
  const [isMobile, setIsMobile] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentList, setCurrentList] = useState<ListType[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth > 1024) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const initialData = list.slice(0, itemsPerPage);
    setCurrentList(initialData);
    setPage(1);
    setHasMore(list.length > itemsPerPage);
  }, [list, itemsPerPage]);

  if (isLoading) {
    return <ServiceListSkeleton />;
  }

  const loadMore = () => {
    const nextPage = page + 1;
    const nextData = list.slice(0, nextPage * itemsPerPage);

    if (nextData.length === currentList.length) {
      setHasMore(false);
    } else {
      setCurrentList(nextData);
      setPage(nextPage);
    }
  };

  return (
    serviceShow &&
    (isMobile ? (
      <div className="w-full">
        <InfiniteScroll
          dataLength={currentList.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<>loading...</>}
          className="w-full"
        >
          <div className="flex flex-col justify-self-center w-full px-[20px] border-y border-black-dark/50 py-1.5 h-[100vh] overflow-scroll">
            {currentList.map((item, index) =>
              item.data.map((val, innerIndex) => (
                <DropDownServicesResponsive
                  serviceData={val}
                  key={`${index}-${innerIndex}`}
                />
              ))
            )}
          </div>
        </InfiniteScroll>
      </div>
    ) : (
      <div
        className="
        flex flex-row justify-between 
        justify-self-center 
        w-full 2xl:px-[15%] xl:px-[10%] px-[5%]
        border-y border-black-dark/50 
        py-1.5
      "
      >
        {list.map((val, index) => (
          <DropDownServices item={val} key={index} />
        ))}
      </div>
    ))
  );
});

NavBarBottom.displayName = "NavBarBottom";

export default NavBarBottom;
