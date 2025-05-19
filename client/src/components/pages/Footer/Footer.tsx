"use client";
import React, { memo } from "react";
import FollowUs from "./Followus";
import Summary from "./Summary";
import SellingService from "./SellingService";
import FreeTool from "./FreeTool";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useHome } from "@/providers/HomeProvider";

const Footer = memo(() => {
  const t = useTranslations("Footer");
  const { serviceShow } = useHome();
  return (
    serviceShow && (
      <footer className="pt-12 px-4 md:px-10 text-base text-white bg-black bg-center-top bg-no-repeat bg-[size:1234px] bg-[image:url(https://cdn.prod.website-files.com/628d4467de238a5806753c9b/675716e51edb39c901338ebe_footer_bg.webp)] transition-all duration-300">
        <div className="mx-auto max-w-[1334px]">
          <div className="flex flex-col gap-10 md:gap-0 md:grid md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_2fr_1fr] pb-14 border-solid border-b border-white/40 gap-x-8 md:gap-x-16">
            <Summary />
            <div className="flex flex-col md:flex-row gap-16 justify-self-end">
              <SellingService />
              <FreeTool />
            </div>
            <FollowUs />
          </div>
          <div className="flex flex-col items-center md:flex-row md:justify-between py-4 text-sm text-white/80 gap-2">
            <div className="transition-colors duration-300 hover:text-white">
              © SocialPlug 2025. {t("all_rights")}
            </div>
            <Image
              width={316}
              height={24}
              src="https://cdn.prod.website-files.com/628d4467de238a5806753c9b/66292d46e99717b0f56ae2a2_payment-icons-24.svg"
              alt="payments methods"
              priority={false}
            />
          </div>
        </div>
      </footer>
    )
  );
});

Footer.displayName = "Footer";

export default Footer;
