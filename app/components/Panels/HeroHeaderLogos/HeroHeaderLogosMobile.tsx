"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./HeroHeaderLogosMobile.module.scss";
import { AcfMediaItemConnection, Maybe, MediaItem } from "@/types/graphql";

const BLEND_CYCLE: Array<"darken" | "multiply"> = [
  "darken",
  "multiply",
  "darken",
  "darken",
  "darken",
  "darken",
  "darken",
];

interface Props {
  logos: Maybe<AcfMediaItemConnection> | undefined;
}

function computePack(count: number, ballPx: number, jarW: number, jarH: number) {
  const R = ballPx / 2;
  const PAD = 4;
  const N = 80;
  const bottomPad = 48;
  const placed: { cx: number; cy: number }[] = [];

  function restingY(cx: number) {
    let best = 0;
    for (const p of placed) {
      const dx = cx - p.cx;
      if (Math.abs(dx) < ballPx) {
        const dy = Math.sqrt(ballPx * ballPx - dx * dx);
        const c = p.cy + dy;
        if (c > best) best = c;
      }
    }
    return best;
  }

  for (let i = 0; i < count; i++) {
    let bestCx = R + PAD,
      bestCy = Infinity;
    for (let c = 0; c < N; c++) {
      const cx = PAD + R + (c / (N - 1)) * (jarW - ballPx - PAD * 2);
      if (cx - R < PAD || cx + R > jarW - PAD) continue;
      const cy = restingY(cx);
      const ok = placed.every((p) => Math.sqrt((cx - p.cx) ** 2 + (cy - p.cy) ** 2) >= ballPx - 0.5);
      if (ok && cy < bestCy) {
        bestCy = cy;
        bestCx = cx;
      }
    }
    placed.push({ cx: bestCx, cy: bestCy });
  }

  // The floor ball has cy=0, its bottom edge is at R.
  // We want that bottom edge to sit at jarH - bottomPad.
  // So the screen-space bottom of a ball = jarH - bottomPad - cy
  // And top of ball div = screenBottom - ballPx
  const screenFloor = jarH; // bottom edge of container

  return {
    positions: placed.map((p) => ({
      x: p.cx - R,
      y: screenFloor - p.cy - ballPx, // bottom ball sits flush at container bottom
    })),
  };
}

const HeroHeaderLogosMobile: React.FC<Props> = ({ logos }) => {
  const logoNodes = (logos?.edges.map((e) => e.node) ?? []) as MediaItem[];
  const sectionRef = useRef<HTMLElement>(null);
  const [pack, setPack] = useState<{ positions: { x: number; y: number }[] } | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const obs = new ResizeObserver(([entry]) => {
      const jarW = entry.contentRect.width;
      const jarH = entry.contentRect.height; // use contentRect height, not getComputedStyle
      if (!jarW || !jarH) return;
      const ballPx = Math.floor(jarW / 3);
      setPack(computePack(logoNodes.length, ballPx, jarW, jarH));
    });

    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [logoNodes.length]);

  return (
    <section ref={sectionRef} className={styles["hero-header-logos-mobile"]}>
      {pack &&
        logoNodes.map((logo, i) => {
          const pos = pack.positions[i];
          const ballPx = Math.floor((sectionRef.current?.offsetWidth ?? 375) / 3);
          const blend = BLEND_CYCLE[i % BLEND_CYCLE.length];
          return (
            <div
              key={i}
              className={styles["hero-header-logos-mobile__ball"]}
              style={{ left: pos.x, top: pos.y, width: ballPx, height: ballPx }}
            >
              <img
                className={[
                  styles["hero-header-logos-mobile__ball-logo"],
                  styles[`hero-header-logos-mobile__ball-logo--${blend}`],
                ].join(" ")}
                src={logo.sourceUrl ?? ""}
                alt={logo.altText ?? ""}
              />
            </div>
          );
        })}
    </section>
  );
};

export default HeroHeaderLogosMobile;
