"use client";
import React, { memo, useState, useEffect } from "react";
import { DropIcon } from "@/libs/consts/MySvg";
import Link from "next/link";

interface SellingServiceProps {
  className?: string;
}

interface ServiceLink {
  label: string;
  href: string;
}

const serviceLinks: ServiceLink[] = [
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

const SellingService = memo(({ className = "" }: SellingServiceProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isMobile && (e.key === "Enter" || e.key === " ")) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`
        min-w-[260px] 
        pt-4 
        border-t border-white/10 
        sm:border-none sm:pt-0
        transition-all duration-300
        ${className}
      `}
    >
      <button
        className="
          font-clash 
          leading-5 
          text-base md:text-xl 
          font-semibold 
          flex items-center gap-4
          text-white
          hover:text-primary
          transition-colors duration-300
          focus:outline-none focus:text-primary
          group
          mb-4 md:mb-8
        "
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span>Best Selling Services</span>
        <span
          className={`
            lg:hidden
            transition-transform duration-300 ease-in-out
            group-hover:scale-110
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          {DropIcon}
        </span>
      </button>
      <div
        className={`
          flex flex-col gap-4 
          overflow-hidden 
          transition-all duration-300 ease-in-out
          lg:max-h-[600px]
          ${isOpen ? "max-h-[660px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {serviceLinks.map((link, index) => (
          <Link
            key={link.label}
            href={`https://socialplug.io/services${link.href}`}
            className="
              text-base leading-6
              text-white/50
              hover:text-primary
              hover:underline
              transition-colors duration-300
              animate-fade-in
            "
            style={{ animationDelay: `${index * 50}ms` }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
});

SellingService.displayName = "SellingService";

export default SellingService;
