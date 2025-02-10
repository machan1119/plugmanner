import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn.prod.website-files.com",
      "localhost",
      "socialplug-production.up.railway.app",
    ],
  },
  env: {
    BACKEND_IP: process.env.BACKEND_URL,
  },
};

export default nextConfig;
