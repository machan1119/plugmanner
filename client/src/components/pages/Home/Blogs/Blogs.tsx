import Image from "next/image";
import React, { memo } from "react";
import BlogSlide from "./BlogSlide";

interface BlogsProps {
  className?: string;
}

const Blogs = memo(({ className = "" }: BlogsProps) => {
  return (
    <section
      className={`w-full flex flex-col p-4 sm:p-6 md:p-8 lg:p-[15%] pt-[80px] items-center bg-black-light relative ${className}`}
      aria-labelledby="section-blogs-title"
    >
      <div className="mb-12 flex flex-col gap-3 items-center">
        <h2
          id="section-blogs-title"
          className="font-h1-md lg:font-h1-lg animate-fade-in"
        >
          News and Articles
        </h2>
        <div className="flex gap-4 sm:gap-8 items-center z-10 bg-black-light animate-fade-in-up">
          <div aria-hidden="true">
            <Image
              width={47}
              height={35}
              className="w-auto h-auto"
              alt=""
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e66_Group%201000004047.svg"
              priority={false}
            />
          </div>
          <p className="text-black text-[18px] text-center font-satoshi w-[90%] sm:w-[75%]">
            Most Recent
          </p>
          <div aria-hidden="true">
            <Image
              width={61}
              height={35}
              className="w-auto h-auto"
              alt=""
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e68_Group%201000004049.svg"
              priority={false}
            />
          </div>
        </div>
        <div
          className="absolute w-[90%] sm:w-[70%] h-[2px] bg-black-dark top-[148px] animate-fade-in"
          aria-hidden="true"
        />
      </div>
      <BlogSlide />
    </section>
  );
});

Blogs.displayName = "Blogs";

export default Blogs;
