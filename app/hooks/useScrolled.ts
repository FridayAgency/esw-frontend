import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook to detect if the user has scrolled past a certain threshold
 * @param threshold - The scroll position threshold in pixels (default: 50)
 * @returns boolean - True if scrolled past threshold, false otherwise
 */
export const useScrolled = (threshold: number = 50): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);
  const ticking = useRef(false);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > threshold);
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return isScrolled;
};
