/** @format */

import styles from "./Burger.module.scss";
import { memo } from "react";

interface BurgerProps {
  onClick?: () => void;
  isOpen?: boolean;
}

const Burger = memo(({ onClick, isOpen = false }: BurgerProps) => {
  return (
    <button
      suppressHydrationWarning
      aria-label={isOpen ? "Close Mobile Menu" : "Open Mobile Menu"}
      aria-expanded={isOpen}
      onClick={onClick}
      className={`${styles.burger} ${isOpen ? styles.open : ""}`}
      type="button"
    >
      <span className={styles.line}></span>
      <span className={styles.line}></span>
      <span className={styles.line}></span>
    </button>
  );
});

Burger.displayName = "Burger";

export default Burger;
