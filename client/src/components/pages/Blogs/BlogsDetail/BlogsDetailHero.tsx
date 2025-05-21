"use client";
import { BlogDetailPageSkeleton } from "@/components/Skeletons";
import { useBlogs } from "@/providers/BlogsProvider";
import { format_blog_date } from "@/utils/functions";
import Image from "next/image";

export default function BlogsDetailHero() {
  const { isLoading, blogsItem } = useBlogs();
  if (isLoading) return <BlogDetailPageSkeleton />;
  if (!blogsItem) return;
  return (
    <section
      rel="preload"
      className="flex flex-col m-auto gap-5 items-center pt-5 pb-8 w-full min-h-[320px] px-4 md:px-10 bg-[url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4e7dcabf6acfef507865_blogimage.png')] bg-cover bg-center bg-no-repeat"
    >
      <p className="font-clash  text-[#effff8] bg-black border-[5px] border-[#f6f6f6] rounded-[25px] order-0 self-center px-3 py-1.5 text-[16px] font-semibold leading-[20px] no-underline">
        {blogsItem?.article_category.title}
      </p>
      <p className="text-black text-center font-clash max-w-[650px] text-[40px] font-semibold leading-[48px]">
        {blogsItem.title}
      </p>
      <div className="flex gap-5">
        <div className="flex gap-2">
          <Image
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67cf3bc2f48f61a0a8ae14ea_PencilLine.svg"
            width={20}
            height={20}
            alt="pencil_line"
            className="w-5 h-5"
          />
          <p className="font-medium">
            Updated on: {format_blog_date(blogsItem.date)}
          </p>
        </div>
        <div className="text-[#e0e0e0]">|</div>
        <div className="flex gap-2">
          <Image
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67cf3b69d0b8bce1143f417e_ClockCountdown.svg"
            width={20}
            height={20}
            alt="pencil_line"
            className="w-5 h-5"
          />
          <p className="font-medium">{blogsItem.readTime}</p>
        </div>
      </div>
      <p className="font-medium">By: {blogsItem.Author.name}</p>
    </section>
  );
}
