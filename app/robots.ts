/** @format */

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = process.env.NEXT_PUBLIC_LOCAL_URL;

  if (process.env.NEXT_PUBLIC_ENV !== "production") {
    return {
      rules: [
        {
          userAgent: "Screaming Frog SEO Spider",
          allow: "/",
        },
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      host: url,
      sitemap: [],
    };
  }

  let sitemap = [`${url}/sitemap.xml`];

  return {
    rules: [
      {
        userAgent: "SiteAuditBot",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "Omgilibot",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    host: url,
    sitemap: sitemap,
  };
}
