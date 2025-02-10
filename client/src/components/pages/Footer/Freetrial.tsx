"use client";
import { useState } from "react";
import Link from "next/link";
import { DropIcon } from "@/libs/consts/MySvg";

const links = [
  { label: "Free Instagram Followers", href: "instagram-followers" },
  { label: "Free Instagram Likes", href: "instagram-likes" },
  { label: "Free TikTok Followers", href: "tiktok-followers" },
  { label: "Free TikTok Likes", href: "tiktok-likes" },
  { label: "Free TikTok Views", href: "tiktok-views" },
  { label: "Free Youtube Subscribers", href: "youtube-subscribers" },
  { label: "Free Youtube Views", href: "youtube-views" },
  { label: "Free Youtube Likes", href: "youtube-likes" },
  { label: "Free Twitter (X) Followers", href: "twitter-followers" },
  { label: "Free Twitter (X) Likes", href: "twitter-likes" },
];
export default function FreeTrial() {
  const [isclicked, setIsClicked] = useState(false);
  return (
    <div>
      <div
        className="font-clash mt-8 mb-4 leading-5 text-base md:text-xl font-semibold flex items-center hover:cursor-pointer"
        onClick={() => setIsClicked((e) => !e)}
      >
        <span className="mr-4 ">Free Trial</span>
        <span
          className={`${
            isclicked ? "rotate-180" : ""
          } duration-300 ease-in-out`}
        >
          {DropIcon}
        </span>
      </div>
      <div
        className={`flex flex-col gap-y-4 overflow-hidden ${
          isclicked ? "max-h-[380px]" : "max-h-0"
        } duration-300 ease-in-out`}
      >
        {links.map((link) => (
          <Link
            key={link.label}
            href={`https://www.socialplug.io/free-services/free-${link.href}`}
            className="opacity-50 hover:underline text-[16px] leading-6"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
