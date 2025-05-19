"use client";
import React, { memo, useState } from "react";
import MainButton from "@/components/Buttons";
import FreeTrial from "./Freetrial";
import Link from "next/link";
import { LinkedInIcon, TwitterIcon, YoutubeIcon } from "@/libs/consts/MySvg";
import { useTranslations } from "next-intl";

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://www.youtube.com/@socialplug",
    icon: YoutubeIcon,
    label: "YouTube",
  },
  {
    href: "https://twitter.com/socialplugio",
    icon: TwitterIcon,
    label: "Twitter",
  },
  {
    href: "https://www.linkedin.com/company/socialplug-io/",
    icon: LinkedInIcon,
    label: "LinkedIn",
  },
];

const FollowUs = memo(() => {
  const [email, setEmail] = useState("");
  const t = useTranslations("Footer");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription
    setEmail("");
  };

  return (
    <div className="border-t border-white/10 pt-4 sm:border-none md:mt-[-300px] sm:border-t sm:border-white/10 md:border-none md:pt-0 lg:mt-0 transition-all duration-300">
      <p className="font-clash mb-4 leading-5 text-xl font-semibold text-white">
        {t("follow_us")}
      </p>
      <div className="flex gap-4">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-110 hover:text-primary"
          >
            {link.icon}
          </Link>
        ))}
      </div>
      <div className="font-clash mt-4 mb-4 leading-5 text-xl font-semibold text-white">
        {t("receive_offers")}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 leading-[22px] text- bg-white text-black placeholder:text-black/50 focus:outline-none focus:border-primary"
          required
        />
        <MainButton type="primary" title={t("subscribe")} />
      </form>
      <FreeTrial />
    </div>
  );
});

FollowUs.displayName = "FollowUs";

export default FollowUs;
