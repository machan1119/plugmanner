import React, { memo, useState } from "react";
import MainButton from "@/components/Buttons";
import FreeTrial from "./Freetrial";
import Link from "next/link";
import { LinkedInIcon, TwitterIcon, YoutubeIcon } from "@/libs/consts/MySvg";

interface FollowUsProps {
  className?: string;
}

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

const FollowUs = memo(({ className = "" }: FollowUsProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription
    setEmail("");
  };

  return (
    <div
      className={`
        border-t border-white/10 
        pt-4 sm:border-none sm:mt-4 sm:border-t sm:border-white/10 
        md:border-none md:pt-0 md:mt-0
        transition-all duration-300
        ${className}
      `}
    >
      <h3 className="font-clash mb-4 leading-5 text-base md:text-xl font-semibold text-white">
        Follow Us
      </h3>
      <div className="flex gap-4">
        {socialLinks.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              transition-all duration-300
              hover:scale-110
              hover:text-primary
              animate-fade-in
            "
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {link.icon}
          </Link>
        ))}
      </div>
      <h3 className="font-clash mt-4 mb-4 leading-5 text-xl font-semibold text-white">
        Receive Exclusive Offers
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="
            w-full px-4 py-3
            leading-[22px] text-base
            rounded-lg
            border border-white
            bg-white
            text-black
            placeholder:text-black/50
            focus:outline-none
            focus:border-primary
          "
          required
        />
        <MainButton
          type="primary"
          title="Subscribe"
          customClass="animate-fade-in [animation-delay:300ms]"
        />
      </form>
      <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
        <FreeTrial />
      </div>
    </div>
  );
});

FollowUs.displayName = "FollowUs";

export default FollowUs;
