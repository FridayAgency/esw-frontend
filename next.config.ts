import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "capitalflow.local",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "capitalflowdev.wpenginepowered.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "capitalflowdev.wpenginepowered.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
