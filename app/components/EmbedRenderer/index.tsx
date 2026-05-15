"use client";

import { useEffect, useRef } from "react";

interface EmbedRendererProps {
  embedCode: string;
  className?: string;
}

const EmbedRenderer: React.FC<EmbedRendererProps> = ({ embedCode, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!embedCode || !containerRef.current) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(embedCode, "text/html");

    const scripts = Array.from(doc.querySelectorAll("script"));
    const nonScriptHTML = Array.from(doc.body.childNodes)
      .flatMap((node) => (node.nodeName === "P" ? Array.from((node as Element).childNodes) : [node]))
      .filter((node) => node.nodeType === Node.ELEMENT_NODE && node.nodeName !== "SCRIPT" && node.nodeName !== "BR")
      .map((node) => (node as Element).outerHTML)
      .join("");

    containerRef.current.innerHTML = nonScriptHTML;

    scripts.forEach((originalScript) => {
      const script = document.createElement("script");
      if (originalScript.src) script.src = originalScript.src;
      if (originalScript.async) script.async = true;
      if (originalScript.getAttribute("onload")) {
        script.setAttribute("onload", originalScript.getAttribute("onload")!);
      }
      document.head.appendChild(script);
    });

    // --- tracking debug ---

    // const onMessage = (e: MessageEvent) => {
    //   console.log("[EmbedRenderer] postMessage | origin:", e.origin, "| data:", JSON.stringify(e.data));
    // };
    // window.addEventListener("message", onMessage);

    // const _open = XMLHttpRequest.prototype.open;
    // XMLHttpRequest.prototype.open = function (method: string, url: string | URL) {
    //   const self = this;
    //   self.addEventListener("load", () => {
    //     if (url?.toString().includes("eshopworld")) {
    //       console.log("[EmbedRenderer] XHR:", method, url, "| status:", self.status);
    //     }
    //   });
    //   return _open.apply(this, arguments as any);
    // };

    // const _fetch = window.fetch;
    // window.fetch = function (url, opts) {
    //   return _fetch.apply(this, arguments as any).then((res: Response) => {
    //     if (typeof url === "string" && url.includes("eshopworld")) {
    //       console.log("[EmbedRenderer] fetch:", url, "| status:", res.status);
    //     }
    //     return res;
    //   });
    // };

    // return () => {
    //   window.removeEventListener("message", onMessage);
    //   XMLHttpRequest.prototype.open = _open;
    //   window.fetch = _fetch;
    // };
  }, [embedCode]);

  return <div suppressHydrationWarning ref={containerRef} className={className} />;
};

export default EmbedRenderer;
