import React, { ReactNode } from "react";
import styles from "./FormUI.module.scss";

interface InstructionsBlockProps {
  leadText: string;
  items: string[];
}

export const InstructionsBlock = ({ leadText, items }: InstructionsBlockProps) => {
  return (
    <div className={styles.instructions}>
      <ul className={styles["instructions__list"]}>
        {items.map((item, index) => (
          <li className={styles["instructions__list-item"]} key={index}>
            <span suppressHydrationWarning className={styles["instructions__list-number"]}>
              {index + 1}
            </span>
            <span suppressHydrationWarning className={styles["instructions__list-text"]}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
