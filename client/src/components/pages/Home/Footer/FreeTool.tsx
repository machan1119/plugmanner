"use client";
import Link from "next/link";
import { useState } from "react";
import { dropIcon } from "./svg";
const FreeTools = [
  { label: "Youtube Video Downloader", href: "/youtube-video-downloader" },
  { label: "Instagram Usernam Checker", href: "/instabram-usernam-checker" },
  { label: "Twitter Username Checker", href: "/twitter-username-checker" },
];
const QuickLines = [
  {
    label: "Contact Us",
    href: "https://panel.socialplug.io/contact/helpdesk?_gl=1*1ai26oe*_ga*MTM5OTE1MzUyOS4xNzM4OTI3NTYx*_ga_2W3R0LJ26C*MTczODk1Nzg4OC4zLjAuMTczODk1Nzg4OC4wLjAuMA..",
  },
  {
    label: "Affiliate Program",
    href: "https://www.socialplug.io/affiliate-program",
  },
  { label: "Blog", href: "https://www.socialplug.io/blog" },
  { label: "About Us", href: "https://www.socialplug.io/about-us" },
  {
    label: "Privacy Policy",
    href: "https://www.socialplug.io/terms-of-services-privacy-policy",
  },
  {
    label: "Terms & Conditions",
    href: "https://www.socialplug.io/terms-of-services-privacy-policy",
  },
];
export default function FreeTool() {
  const [isclicked1, setIsClicked1] = useState(false);
  const [isclicked2, setIsClicked2] = useState(false);
  return (
    <div className="w-[168]">
      <div className="font-clash mb-4 leading-5 text-xl font-semibold flex items-center hover:cursor-pointer">
        <span className="mr-4">Free Tools</span>
        <span
          className={`lg:hidden ${
            isclicked1 ? "rotate-180" : ""
          } duration-300 ease-in-out`}
          onClick={() => setIsClicked1((e) => !e)}
        >
          {dropIcon}
        </span>
      </div>
      <div
        className={`lg:max-h-[200px] flex flex-col gap-y-4 overflow-hidden ${
          isclicked1 ? "max-h-[200px] mb-4" : "max-h-0"
        } duration-300 ease-in-out`}
      >
        {FreeTools.map((item) => (
          <Link
            key={item.label}
            href={`https://socialplug.io/free-tools${item.href}`}
          >
            <span className="hover:underline opacity-50">{item.label}</span>
            <span className="bg-[#01c573] rounded-[16px] ml-1 text-black px-2 py-[2px] text-[12px] leading-[22px]">
              FREE
            </span>
          </Link>
        ))}
      </div>

      <div className="font-clash lg:mt-8 md:mt-4 mb-4 leading-5 text-xl font-semibold flex items-center hover:cursor-pointer">
        <span className="mr-4 ">Quick Links</span>
        <span
          className={`lg:hidden ${
            isclicked2 ? "rotate-180" : ""
          } duration-300 ease-in-out`}
          onClick={() => setIsClicked2((e) => !e)}
        >
          {dropIcon}
        </span>
      </div>
      <div
        className={`lg:max-h-[200px] flex flex-col gap-y-4 overflow-hidden ${
          isclicked2 ? "max-h-[200px] " : "max-h-0"
        } duration-300 ease-in-out`}
      >
        {QuickLines.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="opacity-50 hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
