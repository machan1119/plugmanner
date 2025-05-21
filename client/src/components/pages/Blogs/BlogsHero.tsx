"use client";
import { BlogPageSkeleton } from "@/components/Skeletons";
import { useBlogsList } from "@/providers/BlogsListProvider";
import {
  format_blog_date,
  generate_item_url_from_blog_title,
} from "@/utils/functions";
import Image from "next/image";

export default function BlogsHero() {
  const { isLoading, blogsList } = useBlogsList();
  if (isLoading) return <BlogPageSkeleton />;
  if (!blogsList) return;
  return (
    <section className="w-full m-auto mb-10">
      <div
        rel="preload"
        className="flex flex-col gap-5 items-center pt-5 w-full min-h-[220px] bg-[#f5f5f5f7] px-4 md:px-10 bg-[linear-gradient(#f5f5f5f7,#f5f5f5f7),url('https://cdn.prod.website-files.com/628d4467de238a5806753c9b/67bb4de67a2ea65794f385ee_perspective-grid-black.webp')] bg-[position:0_0,50%_0] bg-[size:auto,contain] bg-no-repeat"
      >
        <p className="font-service w-max">
          News & <span className="text-primary">Articles</span>
        </p>
        <div className="w-[180px] h-[5px] bg-gradient-to-r from-[#fb9ac100] to-[#00c573] rounded-md" />
      </div>
      <a
        href={`/blog/${generate_item_url_from_blog_title(blogsList[0].title)}`}
        className="bg-white w-full px-4 mt-[-70px] max-w-[1140px] shadow-soft rounded-lg p-5 flex items-center gap-10 place-self-center"
      >
        <div className="w-[55%] overflow-hidden rounded-lg">
          <Image
            src={blogsList[0].img}
            width={600}
            height={400}
            className="w-full rounded-lg hover:scale-110 cursor-pointer transition-all duration-500"
            alt="Preview"
          />
        </div>
        <div className="flex flex-col gap-5 items-start w-[40%]">
          <h3 className="font-clash text-[#202146] font-semibold text-[24px]">
            {blogsList[0].title}
          </h3>
          <p className="font-satoshi text-[18px] leading-7 text-[#686889] mb-1">
            {blogsList[0].simpleDescription}
          </p>
          <div className="flex gap-2 items-center">
            <Image
              src={blogsList[0].Author.avatar}
              width={30}
              height={30}
              alt="User"
              className="w-[30px] h-[30px] rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-base font-sans font-bold text-[#14141b]">
                {blogsList[0].Author.name}
              </p>
              <p className="text-[14px] leading-5 font-satoshi text-[#9899ad]">
                {format_blog_date(blogsList[0].date)}
              </p>
            </div>
          </div>
        </div>
      </a>
    </section>
  );
}
