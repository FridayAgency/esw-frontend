/** @format */

"use client";

import { FC, useEffect } from "react";
import Script from "next/script";

import { usePathname, useSearchParams } from "next/navigation";

export const pageview = (url: string) => {
  if (!window.dataLayer) return;

  window.dataLayer.push({ event: "pageview", page: url });
};

const GoogleTagManager: FC<{ id: string; server?: string }> = ({ id, server = "www.googletagmanager.com" }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) pageview(pathname);
  }, [pathname, searchParams]);

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){
      setTimeout(() => {
      w[l] = w[l] || []
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" })
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : ""
      j.async = true
      j.src = "https://${server}/gtm.js?id=" + i + dl
      f.parentNode.insertBefore(j, f)
    }, 5000)
            })(window,document,'script','dataLayer', '${id}');
          `,
        }}
      />
    </>
  );
};

export default GoogleTagManager;
