import { readFile } from "fs/promises";
const json = JSON.parse((await readFile(new URL("./json/redirects.json", import.meta.url))).toString());

const initConfig = async () => {
  const redirects = json.redirects;

  const redirectsSettings = redirects
    .map((item) => {
      const source = item?.url.replace(/\?.*/, "");
      const rawDest =
        item?.action_data?.url?.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, "") ??
        item?.action_data?.url_from?.replace(process.env.NEXT_PUBLIC_WORDPRESS_URL, "") ??
        item?.action_data?.url_from?.replace("https://esw.com", "") ??
        "/";
      return { source, destination: rawDest, permanent: true };
    })
    .filter(
      ({ source, destination }) =>
        source?.startsWith("/") && (destination?.startsWith("/") || destination?.startsWith("http")),
    );

  return {
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
    async redirects() {
      return [
        ...redirectsSettings,
        {
          source: "/wp-admin",
          destination: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-admin/`,
          permanent: true,
        },
        {
          source: "/how-to-apply-booklet/",
          destination: `/how-to-apply.pdf`,
          permanent: true,
        },
        {
          source: "/wp-content/uploads/2023/06/SME-Booklet.pdf",
          destination: `/customer-information-booklet.pdf`,
          permanent: true,
        },
        {
          source: "/wp-content/uploads/2024/06/Terms-of-Business.pdf",
          destination: `/terms-of-business.pdf`,
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
              key: "X-Frame-Options",
              value: "SAMEORIGIN",
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
              value: "same-origin",
            },
            {
              key: "Permissions-Policy",
              value: "camera=(), microphone=(), geolocation=()",
            },
          ],
        },
      ];
    },
  };
};

const nextConf = await initConfig();

export default nextConf;
