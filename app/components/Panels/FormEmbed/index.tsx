"use client";

import { useEffect, useRef } from "react";

import { PagePanelsPagePanelsFormEmbedLayout } from "@/types/graphql";

interface FormEmbedProps {
  panel: PagePanelsPagePanelsFormEmbedLayout;
}

const FormEmbed: React.FC<FormEmbedProps> = ({ panel }) => {
  const { formEmbedCode } = panel;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!formEmbedCode || !containerRef.current) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(formEmbedCode, "text/html");

    const scripts = Array.from(doc.querySelectorAll("script"));
    const nonScriptHTML = Array.from(doc.body.childNodes)
      .filter((node) => node.nodeName !== "SCRIPT")
      .map((node) => (node as Element).outerHTML ?? node.textContent ?? "")
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
  }, [formEmbedCode]);

  return <div ref={containerRef} />;
};

export default FormEmbed;
