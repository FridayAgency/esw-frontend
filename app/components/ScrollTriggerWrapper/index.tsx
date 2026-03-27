"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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
        if (triggerClassName) {
          ref.current?.classList.add(triggerClassName);
        }
        if (from) {
          gsap.fromTo(ref.current, { ...from }, { ...to, duration });
        } else {
          gsap.to(ref.current, { ...to, duration });
        }
      },
    });
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default ScrollTriggerWrapper;
