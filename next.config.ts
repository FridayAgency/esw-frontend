import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "esw1dev.wpenginepowered.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
