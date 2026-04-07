"use client";

import { useState } from "react";
import styles from "./LogoBlock.module.scss";
import Container from "../../Container";

const LOGOS = [
  { id: 1, label: "Logitech" },
  { id: 2, label: "Xbox One" },
  { id: 3, label: "Le Creuset" },
  { id: 4, label: "Calvin Klein" },
  { id: 5, label: "Nike" },
  { id: 6, label: "Brand Co." },
  { id: 7, label: "Partner Inc." },
];

const PauseIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" focusable="false">
    <rect x="0" y="0" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="8" y="0" width="4" height="14" rx="1" fill="currentColor" />
  </svg>
);

const PlayIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" focusable="false">
    <path d="M0 0L12 7L0 14V0Z" fill="currentColor" />
  </svg>
);

const LogoBlock = () => {
  const [paused, setPaused] = useState(false);
  const items = [...LOGOS, ...LOGOS];

  return (
    <section className={styles["logo-block"]}>
      <Container className={styles["logo-block__container"]}>
        <div className={styles["logo-block__track-wrapper"]}>
          <div className={styles["logo-block__track"]} data-paused={paused} aria-label="Logo ticker">
            {items.map((logo, index) => (
              <div key={`${logo.id}-${index}`} className={styles["logo-block__item"]}>
                <div className={styles["logo-block__placeholder"]}>{logo.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles["logo-block__controls"]}>
          <button
            type="button"
            className={styles["logo-block__toggle"]}
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play logo animation" : "Pause logo animation"}
            aria-pressed={paused}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>
      </Container>
    </section>
  );
};

export default LogoBlock;
