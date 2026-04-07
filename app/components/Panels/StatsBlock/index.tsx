"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Container from "../../Container";
import styles from "./StatsBlock.module.scss";

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

interface StatsBlockProps {}

const StatsBlock: React.FC<StatsBlockProps> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !bgRef.current) return;

    gsap.fromTo(
      bgRef.current,
      { y: -100 },
      {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Start when the top of the section is 100px above the bottom of the viewport
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
          <ListItem title="EXPAND INTO" value="50+" description="Markets" />
          <ListItem title="OPERATING ACROSS" value="45+" description="Regulatory Environments" />
          <ListItem title="POWERING PROGRAMMES IN" value="27" description="Countries" />
        </ul>
      </Container>
    </section>
  );
};

export default StatsBlock;
