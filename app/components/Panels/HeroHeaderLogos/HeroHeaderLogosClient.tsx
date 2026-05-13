"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import styles from "./HeroHeaderLogos.module.scss";
import { AcfMediaItemConnection, Maybe, MediaItem } from "@/types/graphql";

const DOT_PATTERN = "https://www.figma.com/api/mcp/asset/245a3849-6476-43e4-b563-c4c6b7a9c8f1";

const BLEND_CYCLE: Array<"darken" | "multiply"> = [
  "darken",
  "multiply",
  "darken",
  "darken",
  "darken",
  "darken",
  "darken",
];
const DELAY_CYCLE = [0.05, 0.2, 0.1, 0.35, 0.15, 0.25, 0.0, 0.3, 0.4];
const BALL_SIZE = 196;
const RADIUS = BALL_SIZE / 2;
const WALL = 60;

interface HeroHeaderLogosClientProps {
  logos: Maybe<AcfMediaItemConnection> | undefined;
}

const HeroHeaderLogosClient: React.FC<HeroHeaderLogosClientProps> = ({ logos }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const cleanupRef = useRef<(() => void) | null>(null);
  const hasStartedRef = useRef(false);
  const wallsRef = useRef<{ floor: Matter.Body; left: Matter.Body; right: Matter.Body } | null>(null);

  const logosToUse = (logos?.edges.map((e) => e.node) ?? []) as MediaItem[];
  const logoNodes = [...logosToUse]; // duplicate for a fuller canvas
  const count = logoNodes.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || count === 0) return;

    const spreadOffsets = Array.from({ length: count }, (_, i) => (i + 0.5) / count);

    const startPhysics = () => {
      const container = containerRef.current!;
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      const engine = Matter.Engine.create({ gravity: { y: 2 } });

      const floor = Matter.Bodies.rectangle(width / 2, height + WALL / 2, width + WALL * 2, WALL, {
        isStatic: true,
        friction: 0.4,
        restitution: 0.2,
      });
      const leftWall = Matter.Bodies.rectangle(-WALL / 2, height / 2, WALL, height * 3, {
        isStatic: true,
        friction: 0.1,
      });
      const rightWall = Matter.Bodies.rectangle(width + WALL / 2, height / 2, WALL, height * 3, {
        isStatic: true,
        friction: 0.1,
      });

      wallsRef.current = { floor, left: leftWall, right: rightWall };
      Matter.Composite.add(engine.world, [floor, leftWall, rightWall]);

      const MAX_ANGLE = (Math.PI * 2) / 3; // 120° — tilts freely, never flips

      const bodies = logoNodes.map((_, i) => {
        const x = Math.max(RADIUS, Math.min(width - RADIUS, spreadOffsets[i] * width));
        const y = -(RADIUS + i * RADIUS * 0.3);
        const body = Matter.Bodies.circle(x, y, RADIUS, {
          restitution: 0.4,
          friction: 0.08,
          frictionAir: 0.011,
          density: 0.002,
        });
        Matter.Body.setInertia(body, body.inertia * 1.5);
        return body;
      });

      const live = new Set<number>();
      const timeouts: ReturnType<typeof setTimeout>[] = [];

      logoNodes.forEach((_, i) => {
        const delay = DELAY_CYCLE[i % DELAY_CYCLE.length];
        const t = setTimeout(() => {
          Matter.Composite.add(engine.world, bodies[i]);
          live.add(i);
        }, delay * 1000);
        timeouts.push(t);
      });

      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const sync = () => {
        bodies.forEach((body, i) => {
          const el = ballRefs.current[i];
          if (!el || !live.has(i)) return;
          const angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, body.angle));
          el.style.left = `${body.position.x - RADIUS}px`;
          el.style.top = `${body.position.y - RADIUS}px`;
          el.style.bottom = "auto";
          el.style.transform = `rotate(${angle}rad)`;
        });
        rafRef.current = requestAnimationFrame(sync);
      };
      rafRef.current = requestAnimationFrame(sync);

      cleanupRef.current = () => {
        timeouts.forEach(clearTimeout);
        Matter.Runner.stop(runner);
        Matter.Engine.clear(engine);
        cancelAnimationFrame(rafRef.current);
        wallsRef.current = null;
      };
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          hasStartedRef.current = true;
          startPhysics();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(section);

    const resizeObserver = new ResizeObserver(() => {
      if (!hasStartedRef.current || !wallsRef.current) return;
      const container = containerRef?.current!;
      const newWidth = container?.offsetWidth;
      const newHeight = container?.offsetHeight;

      Matter.Body.setPosition(wallsRef.current.left, { x: -WALL / 2, y: newHeight / 2 });
      Matter.Body.setPosition(wallsRef.current.right, { x: newWidth + WALL / 2, y: newHeight / 2 });
      Matter.Body.setPosition(wallsRef.current.floor, { x: newWidth / 2, y: newHeight + WALL / 2 });
    });
    resizeObserver.observe(containerRef.current!);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      cleanupRef.current?.();
    };
  }, [count]);

  return (
    <section ref={sectionRef} className={`${styles["hero-header-logos"]} ${styles["hero-header-logos--desktop-only"]}`}>
      <div ref={containerRef} className={`${styles["hero-header-logos__container"]} container`}>
        {logoNodes.map((logo, i) => {
          const blend = BLEND_CYCLE[i % BLEND_CYCLE.length];
          return (
            <div
              key={i}
              ref={(el) => {
                ballRefs.current[i] = el;
              }}
              className={styles["hero-header-logos__ball"]}
            >
              <img
                className={[
                  styles["hero-header-logos__ball-logo"],
                  styles[`hero-header-logos__ball-logo--${blend}`],
                ].join(" ")}
                src={logo.sourceUrl ?? ""}
                alt={logo.altText ?? ""}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HeroHeaderLogosClient;
