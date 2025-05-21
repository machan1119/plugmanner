"use client";
import { useBlogsList } from "@/providers/BlogsListProvider";
import BlogsItem from "../BlogsItem";

export default function BlogsDetailRelated() {
  const { blogsList } = useBlogsList();
  if (!blogsList) return;
  return (
    <section className="max-w-[1280px] w-full place-self-center px-10 py-20">
      <h2 className="font-clash text-center text-[32px] font-semibold text-black mb-12">
        News & Articles
      </h2>
      <div className="flex flex-col items-center md:flex-row gap-5 w-full">
        {blogsList.slice(0, 3).map((item, index) => (
          <BlogsItem item={item} key={index} descriptionShow={false} />
        ))}
      </div>
    </section>
  );
}
