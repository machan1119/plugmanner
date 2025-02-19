import Image from "next/image";
import React from "react";
import BlogSlide from "./BlogSlide";

const Blogs = () => {
  return (
    <div className="w-full flex flex-col p-[15%] pt-[80px] items-center bg-black-light relative">
      <div className="mb-12 flex flex-col gap-3 items-center">
        <div className="font-h1-md lg:font-h1-lg">News and Articles</div>
        <div className="flex gap-8 items-center z-10 bg-black-light">
          <Image
            width={47}
            height={35}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="Socialplug plug icon"
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e66_Group%201000004047.svg"
          />
          <span className="text-black text-[18px] text-center font-satoshi w-[75%]">
            Most Recent
          </span>
          <Image
            width={61}
            height={35}
            style={{
              width: "auto",
              height: "auto",
            }}
            alt="Socialplug plug icon 2"
            src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338e68_Group%201000004049.svg"
          />
        </div>
        <div className="absolute w-[70%] h-[2px] bg-black-dark top-[148px]" />
      </div>
      <BlogSlide />
    </div>
  );
};

export default Blogs;
