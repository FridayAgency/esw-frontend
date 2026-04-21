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

  redirects: async () => {
    return [
      {
        source: "/w",
        destination: "/resources",
        permanent: true,
      },
      {
        source: "/wp-admin",
        destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
