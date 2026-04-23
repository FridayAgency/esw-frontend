"use client";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import styles from "./TextRevealHeading.module.scss";
import { useRef, useEffect } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface TextRevealHeadingProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  blockColour?: string;
  stagger?: number;
  duration?: number;
}

const TextRevealHeading: React.FC<TextRevealHeadingProps> = ({
  children,
  animateOnScroll = true,
  delay = 0,
  blockColour = "#fff",
  stagger = 0.25,
  duration = 0.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      let isAnimating = false;

      const init = () => {
        const elements = container.hasAttribute("data-copy-wrapper") ? Array.from(container.children) : [container];

        const lines: Element[] = [];
        const blocks: HTMLDivElement[] = [];
        const splits: SplitText[] = [];

        elements.forEach((element) => {
          const split = SplitText.create(element, {
            type: "lines",
            linesClass: styles["block-line"],
            lineThreshold: 0.1,
          });

          splits.push(split);

          split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.className = styles["block-line-wrapper"];
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);

            const block = document.createElement("div");
            block.className = styles["block-revealer"];
            block.style.backgroundColor = blockColour;
            wrapper.appendChild(block);

            lines.push(line);
            blocks.push(block);
          });
        });

        gsap.set(lines, { opacity: 0 });
        gsap.set(blocks, { scaleX: 0, transformOrigin: "left center" });
        container.style.visibility = "visible";

        const masterTl = gsap.timeline({
          paused: animateOnScroll,
          onStart: () => {
            isAnimating = true;
          },
          onComplete: () => {
            isAnimating = false;
          },
        });

        blocks.forEach((block, index) => {
          const lineTl = gsap.timeline();
          lineTl.to(block, { scaleX: 1, duration, ease: "power2.inOut" });
          lineTl.set(lines[index], { opacity: 1 });
          lineTl.set(block, { transformOrigin: "right center" });
          lineTl.to(block, { scaleX: 0, duration, ease: "power2.inOut" });
          masterTl.add(lineTl, delay + index * stagger);
        });

        if (animateOnScroll) {
          ScrollTrigger.create({
            trigger: container,
            start: "top 90%",
            once: true,
            onEnter: () => masterTl.play(),
          });
        }
      };

      (container as any)._isAnimating = () => isAnimating;

      if (document.readyState === "complete") {
        init();
      } else {
        window.addEventListener("load", init, { once: true });
      }
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay, blockColour, stagger, duration] },
  );

  // useEffect(() => {
  //   if (!containerRef.current) return;
  //   const container = containerRef.current;
  //   let lastWidth = container.offsetWidth;

  //   const observer = new ResizeObserver(() => {
  //     const newWidth = container.offsetWidth;
  //     if (newWidth !== lastWidth && !(container as any)._isAnimating?.()) {
  //       lastWidth = newWidth;
  //       ScrollTrigger.refresh();
  //     }
  //   });

  //   observer.observe(container);
  //   return () => observer.disconnect();
  // }, []);

  return (
    <div ref={containerRef} data-copy-wrapper={true} className={styles.container}>
      {children}
    </div>
  );
};

export default TextRevealHeading;
