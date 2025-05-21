"use client";
import BlogsItem from "./BlogsItem";
import { useState } from "react";
import { useBlogsList } from "@/providers/BlogsListProvider";

const Categories: string[] = [
  "Instagram",
  "Twitter",
  "NFT",
  "Discord",
  "Reddit",
  "Tiktok",
  "OnlyFans",
  "Youtube",
  "Telegram",
  "Openesa",
  "LinkedIn",
  "Spotify",
  "GitHub",
  "Social Media Tips",
];

export default function Posts() {
  const [active, setActive] = useState<string[]>([]);
  const { blogsList } = useBlogsList();
  if (!blogsList) return;
  return (
    <section className="flex flex-col items-center w-full pb-20">
      <div className="w-full max-w-[1140px] flex flex-col gap-10 px-4">
        <div className="flex flex-col gap-8 pb-16 border-b border-[#e2e4e8]">
          <h3 className="font-clash text-[32px] font-semibold leading-5">
            Latest Posts
          </h3>
          <div className="flex flex-col items-center md:flex-row gap-5 w-full">
            {blogsList.slice(0, 3).map((item, index) => (
              <BlogsItem item={item} key={index} descriptionShow={true} />
            ))}
          </div>
        </div>
        <div className="w-full overflow-x-scroll overflow-y-hidden pb-5">
          <div className="flex gap-5 w-max">
            {Categories.map((item, index) => (
              <button
                className={`w-max hover:bg-primary/50 hover:text-black rounded py-[14px] px-[16px] font-satoshi text-[14px] leading-[14px] font-bold ${
                  active.includes(item)
                    ? "bg-primary text-white"
                    : "bg-[whitesmoke] text-[#a4afbe]"
                }`}
                key={index}
                onClick={() => {
                  if (active.includes(item)) {
                    setActive(
                      active.filter((activeItem) => activeItem !== item)
                    );
                  } else {
                    setActive([...active, item]);
                  }
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col pb-10 items-center w-full sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {blogsList.map(
            (item, index) =>
              (active.includes(item.article_category.title) ||
                active.length == 0) && (
                <BlogsItem item={item} key={index} descriptionShow={false} />
              )
          )}
        </div>
      </div>
    </section>
  );
}
