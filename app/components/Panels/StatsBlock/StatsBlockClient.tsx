"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "../../Container";
import styles from "./StatsBlock.module.scss";
import { PagePanelsPagePanelsStats } from "@/types/graphql";

gsap.registerPlugin(ScrollTrigger);

interface ListItemProps {
  title: string;
  value: string;
  description: string;
}

const ListItem: React.FC<ListItemProps> = ({ title, value, description }) => {
  return (
    <li className={styles["stats-block__list-item"]}>
      <p className={styles["stats-block__list-item-title"]}>{title}</p>
      <h2 className={styles["stats-block__list-item-value"]}>{value}</h2>
      <p className={styles["stats-block__list-item-description"]}>{description}</p>
    </li>
  );
};

interface StatsBlockProps {
  stats: PagePanelsPagePanelsStats[];
}

const StatsBlockClient: React.FC<StatsBlockProps> = ({ stats }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !bgRef.current) return;

    gsap.fromTo(
      bgRef.current,
      { yPercent: -35 },
      {
        yPercent: 35,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <section ref={sectionRef} className={styles["stats-block"]}>
      <div ref={bgRef} className={styles["stats-block__parallax-bg"]} aria-hidden="true" />
      <Container className={styles["stats-block__container"]}>
        <ul className={styles["stats-block__list"]}>
          {stats.map((stat, index) => {
            if (!stat) return null;
            return (
              <ListItem
                key={index}
                title={stat.title ?? ""}
                value={stat.stat ?? ""}
                description={stat.description ?? ""}
              />
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default StatsBlockClient;
