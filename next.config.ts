import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  trailingSlash: true,
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "esw1dev.wpenginepowered.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**.gravatar.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**.gravatar.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "esw1.wpenginepowered.com",
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

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains;",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.glopal.com *.salesforce.com *.force.com *.exacttarget.com *.sfmc.co *.googletagmanager.com *.google-analytics.com *.cookieyes.com",
              "style-src 'self' 'unsafe-inline' *.glopal.com *.salesforce.com fonts.googleapis.com",
              "img-src 'self' data: https:",
              "font-src 'self' data: https: fonts.gstatic.com",
              "connect-src 'self' *.glopal.com *.salesforce.com *.force.com *.exacttarget.com *.sentry.io *.google-analytics.com *.analytics.google.com *.googletagmanager.com *.doubleclick.net *.cookieyes.com cdn-cookieyes.com",
              "frame-src 'self' *.glopal.com *.salesforce.com *.force.com *.my.site.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "friday-agency",

  project: "esw",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
});
