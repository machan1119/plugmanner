"use client";
import React, { memo, useState } from "react";
import Link from "next/link";
import { DropIcon } from "@/libs/consts/MySvg";

interface FreeTrialProps {
  className?: string;
}

interface FreeTrialLink {
  label: string;
  href: string;
}

const links: FreeTrialLink[] = [
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

const FreeTrial = memo(({ className = "" }: FreeTrialProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={className}>
      <button
        className="
          font-clash mt-8 mb-4 
          leading-5 text-base md:text-xl 
          font-semibold 
          flex items-center gap-4
          text-white
          hover:text-primary
          transition-colors duration-300
          focus:outline-none focus:text-primary
          group
        "
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <span>Free Trial</span>
        <span
          className={`
            transition-transform duration-300 ease-in-out
            group-hover:scale-110
            ${isOpen ? "rotate-180" : ""}
          `}
        >
          {DropIcon}
        </span>
      </button>
      <div
        id="free-trial-links"
        className={`
          flex flex-col gap-4 
          overflow-hidden 
          transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-[380px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {links.map((link) => (
          <Link
            key={link.label}
            aria-label={link.label}
            href={`https://www.socialplug.io/free-services/free-${link.href}`}
            className="
              text-base leading-6
              text-white/50
              hover:text-primary
              hover:underline
              transition-colors duration-300
            "
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

FreeTrial.displayName = "FreeTrial";

export default FreeTrial;
