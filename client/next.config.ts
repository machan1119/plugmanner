import type { NextConfig } from "next";
import { withNextIntl } from "next-intl";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
      {
        protocol: "https",
        hostname: "socialplug-production.up.railway.app",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "192.168.142.33",
      },
      {
        protocol: "http",
        hostname: "164.92.76.156",
      },
      {
        protocol: "https",
        hostname: "olive-deliberate-monkey-124.mypinata.cloud",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  },
  i18n: {
    locales: ["en", "es", "de", "pt-BR"],
    defaultLocale: "en",
    localeDetection: false,
  },
};

export default nextConfig;
