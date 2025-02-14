import type { NextConfig } from "next";

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
        hostname: "192.168.142.33",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  },
};

export default nextConfig;
