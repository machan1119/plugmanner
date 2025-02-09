import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.prod.website-files.com", "192.168.142.33"],
  },
  env: {
    BACKEND_IP: process.env.BACKEND_IP,
  },
};

export default nextConfig;
