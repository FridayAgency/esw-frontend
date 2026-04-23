"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface ScrollTriggerWrapperProps {
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
  as?: ElementType;
  start?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  duration?: number;
}

const ScrollTriggerWrapper: React.FC<ScrollTriggerWrapperProps> = ({
  children,
  className,
  triggerClassName,
  as: Tag = "div",
  start = "top 60%",
  from,
  to,
  duration = 0.8,
}) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    if (from) {
      gsap.set(ref.current, from);
    }

    ScrollTrigger.create({
      trigger: ref.current,
      start,
      once: true,
      onEnter: () => {
        if (!ref.current) return;
        ref.current.style.visibility = "visible";

        if (triggerClassName) {
          ref.current.classList.add(triggerClassName);
        }
        if (from) {
          gsap.fromTo(ref.current, { ...from }, { ...to, duration });
        } else {
          gsap.to(ref.current, { ...to, duration });
        }
      },
    });

    // Wait for full page load before measuring positions
    if (document.readyState === "complete") {
      ScrollTrigger.refresh();
    } else {
      window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
    }
  }, []);

  const initialStyle: React.CSSProperties = from ? { visibility: "hidden" } : {};

  return (
    <Tag ref={ref} className={className} style={initialStyle}>
      {children}
    </Tag>
  );
};

export default ScrollTriggerWrapper;
