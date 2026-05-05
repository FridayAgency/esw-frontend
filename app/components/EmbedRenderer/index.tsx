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
  }, [embedCode]);

  return <div ref={containerRef} className={className} />;
};

export default EmbedRenderer;
