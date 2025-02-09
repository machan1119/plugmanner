"use client";
import Link from "next/link";
import { useState } from "react";
import { dropIcon } from "./svg";
const links = [
  { label: "All Services", href: "/" },
  { label: "Buy Twitter (X) Followers", href: "/buy-twitter-followers" },
  { label: "Buy Instagram Followers", href: "/buy-instagram-followers" },
  { label: "Buy TikTok Followers", href: "/buy-tiktok-followers" },
  { label: "Buy Instagram Likes", href: "/buy-instagram-likes" },
  { label: "Buy Reddit Upvotes", href: "/buy-reddit-upvotes" },
  { label: "Buy Twitter Likes", href: "buy-twitter-likes" },
  { label: "Buy LinkedIn Followers", href: "/buy-linkedin-followers" },
  { label: "Buy Spotify Streams", href: "/buy-spotify-streams" },
  { label: "Buy Spotify Followers", href: "/buy-spotify-followers" },
  { label: "Buy Youtube Subscribers", href: "/buy-youtube-subscribers" },
  { label: "Buy Youtube Views", href: "/buy-youtube-views" },
  { label: "Buy Telegram Members", href: "/buy-telegram-members" },
  { label: "Buy Facebook Followers", href: "/buy-facebook-followers" },
];

export default function SellingService() {
  const [isclicked, setIsClicked] = useState(false);
  return (
    <div className="min-w-[260px] pt-4 border-t-[1px] border-[#e5e7eb40] sm:border-none sm:pt-0">
      <div className="font-clash leading-5 text-base md:text-xl font-semibold flex items-center hover:cursor-pointer  mb-4 md:mb-8">
        <span className="mr-4">Best Selling Services</span>
        <span
          className={`lg:hidden ${
            isclicked ? "rotate-180" : ""
          } duration-300 ease-in-out`}
          onClick={() => setIsClicked((e) => !e)}
        >
          {dropIcon}
        </span>
      </div>
      <div
        className={`lg:max-h-[600px] flex flex-col gap-y-4 overflow-hidden ${
          isclicked ? "max-h-[660px] mb-4" : "max-h-0"
        } duration-300 ease-in-out`}
      >
        {links.map((link) => (
          <Link
            key={link.label}
            href={`https://socialplug.io/services${link.href}`}
            className="opacity-50 hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
