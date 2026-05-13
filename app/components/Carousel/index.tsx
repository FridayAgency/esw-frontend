"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Button from "../Button";

import styles from "./Carousel.module.scss";

type SlidesVisible = number | "auto";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  slideClassName?: string;
  slidesVisible?: SlidesVisible; // default: 1
  gap?: number; // px, default: 16
  peekInset?: number; // px inset on first/last page, default: 24
  showDots?: boolean; // default: true
  showArrows?: boolean; // default: true
  loop?: boolean; // default: false — wrap around when reaching the first/last page
  disableAt?: number; // screen width (px) at which carousel becomes a plain flex layout
  dark?: boolean; // default: false - use dark styles for dots and arrows
  centerArrows?: boolean; // default: false - vertically center arrows (instead of aligning to top)
}

const DEFAULT_GAP = 0;
const DEFAULT_PEEK_INSET = 0;

const Carousel: React.FC<CarouselProps> = ({
  children,
  className,
  slideClassName,
  slidesVisible = 1,
  gap = DEFAULT_GAP,
  peekInset = DEFAULT_PEEK_INSET,
  showDots = true,
  showArrows = true,
  loop = false,
  disableAt,
  dark = false,
  centerArrows = false,
}) => {
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [measuredSlideWidth, setMeasuredSlideWidth] = useState(0);
  const [page, setPage] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  const resolvedGap = Number.isFinite(gap) ? Number(gap) : DEFAULT_GAP;
  const resolvedPeekInset = Number.isFinite(peekInset) ? Number(peekInset) : DEFAULT_PEEK_INSET;

  const slidesPerPage = useMemo(() => {
    if (slidesVisible === "auto") {
      // How many auto-sized slides fit in the measured container?
      if (!measuredSlideWidth || !containerWidth) return 1;
      const fitCount = Math.floor((containerWidth + resolvedGap) / (measuredSlideWidth + resolvedGap));
      return Math.max(1, Math.min(fitCount, slides.length));
    }
    if (typeof slidesVisible === "number" && slidesVisible > 0) return Math.floor(slidesVisible);
    return 1;
  }, [slidesVisible, measuredSlideWidth, containerWidth, resolvedGap, slides.length]);

  const pageCount = useMemo(() => {
    if (slides.length === 0) return 0;
    return Math.max(1, Math.ceil(slides.length / slidesPerPage));
  }, [slides.length, slidesPerPage]);

  useEffect(() => {
    setPage((prev) => {
      if (pageCount === 0) return 0;
      return Math.min(prev, pageCount - 1);
    });
  }, [pageCount]);

  const computeSlideWidth = () => {
    if (!containerRef.current) return 0;

    if (slidesVisible === "auto") {
      if (firstSlideRef.current?.offsetWidth) return firstSlideRef.current.offsetWidth;
      return (
        (containerRef.current.offsetWidth - resolvedGap * Math.max(slides.length - 1, 0)) / Math.max(slides.length, 1)
      );
    }

    const width = containerRef.current.offsetWidth;
    const gapsTotal = resolvedGap * Math.max(slidesPerPage - 1, 0);
    return (width - gapsTotal) / slidesPerPage;
  };

  useLayoutEffect(() => {
    const measure = () => {
      setContainerWidth(containerRef.current?.offsetWidth ?? 0);
      setMeasuredSlideWidth(computeSlideWidth());
      setScreenWidth(window.innerWidth);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidesVisible, gap, slides.length]);

  const startIndex = page * slidesPerPage;
  const step = measuredSlideWidth + resolvedGap;
  const trackWidth = slides.length * measuredSlideWidth + resolvedGap * Math.max(slides.length - 1, 0);

  const computeTranslateX = (): number => {
    if (!measuredSlideWidth || slides.length === 0) return 0;

    const isFirst = page === 0;
    const isLast = page === pageCount - 1;

    // Single page — left inset only
    if (pageCount <= 1) return resolvedPeekInset;

    // First page — left inset, right bleeds
    if (isFirst) return resolvedPeekInset;

    // Last page — right inset, left bleeds
    if (isLast) return -(trackWidth - containerWidth + resolvedPeekInset);

    // Middle pages — full bleed both sides
    return -(startIndex * step);
  };

  const translateX = computeTranslateX();

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    goToPage(delta > 0 ? page + 1 : page - 1);
  };

  const goToPage = (nextPage: number) => {
    if (pageCount === 0) return;
    if (loop) {
      setPage(((nextPage % pageCount) + pageCount) % pageCount);
    } else {
      setPage(Math.max(0, Math.min(nextPage, pageCount - 1)));
    }
  };

  const trackStyle = {
    "--carousel-gap": `${resolvedGap}px`,
    "--carousel-offset": `${translateX}px`,
    ...(measuredSlideWidth ? { "--carousel-slide-width": `${measuredSlideWidth}px` } : {}),
  } as React.CSSProperties;

  const isDisabled = typeof disableAt === "number" && screenWidth >= disableAt;

  const autoClass = slidesVisible === "auto" ? ` ${styles["carousel--auto"]}` : "";
  const multiClass = slidesVisible !== "auto" && slidesPerPage > 1 ? ` ${styles["carousel--multi"]}` : "";
  const disabledClass = isDisabled ? ` ${styles["carousel--disabled"]}` : "";

  return (
    <div
      className={`${styles.carousel}${autoClass}${multiClass}${disabledClass}${className ? ` ${className}` : ""}`.trim()}
    >
      <div className={styles.carousel__viewport} ref={containerRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className={styles.carousel__track} style={trackStyle}>
          {slides.map((slide, index) => (
            <div
              key={index}
              ref={index === 0 ? firstSlideRef : undefined}
              className={`${styles.carousel__slide}${slideClassName ? ` ${slideClassName}` : ""}`}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {!isDisabled && (showArrows || showDots) && (
        <div
          className={
            styles.carousel__nav +
            (dark ? ` ${styles["carousel__nav--dark"]}` : "") +
            (centerArrows ? ` ${styles["carousel__nav--centered"]}` : "")
          }
        >
          {showArrows && (
            <button
              className={`${styles.carousel__arrow} ${styles["carousel__arrow--prev"]}`}
              onClick={() => goToPage(page - 1)}
              disabled={!loop && page === 0}
              aria-label="Previous slides"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M28.3717 14L18.3365 23.7113C17.8878 24.1471 17.8878 24.8529 18.3365 25.2887L28.3717 35L30 33.424L20.7797 24.4999L30 15.5758L28.3717 14Z"
                  fill="white"
                />
              </svg>
            </button>
          )}

          {showDots && pageCount > 1 && (
            <div className={styles.carousel__dots} role="tablist" aria-label="Carousel navigation">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === page}
                  aria-label={`Go to page ${index + 1} of ${pageCount}`}
                  className={`${styles.carousel__dot}${index === page ? ` ${styles["carousel__dot--active"]}` : ""}`}
                  onClick={() => goToPage(index)}
                  type="button"
                />
              ))}
            </div>
          )}

          {showArrows && (
            <button
              className={`${styles.carousel__arrow} ${styles["carousel__arrow--next"]}`}
              onClick={() => goToPage(page + 1)}
              disabled={!loop && (pageCount === 0 || page === pageCount - 1)}
              aria-label="Next slides"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.6283 14L29.6635 23.7113C30.1122 24.1471 30.1122 24.8529 29.6635 25.2887L19.6283 35L18 33.424L27.2203 24.4999L18 15.5758L19.6283 14Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;
