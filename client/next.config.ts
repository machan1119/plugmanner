import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
      },
     
      {
        protocol: "https",
        hostname: "plugmanner.com",
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
};

export default withNextIntl(nextConfig);
