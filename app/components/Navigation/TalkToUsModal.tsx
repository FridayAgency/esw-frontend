/** @format */

import { forwardRef } from "react";
import { createPortal } from "react-dom";
import styles from "./TalkToUsModal.module.scss";

interface TalkToUsModalProps {
  onClose: () => void;
}

const TalkToUsModal = forwardRef<HTMLDivElement, TalkToUsModalProps>(({ onClose }, ref) => {
  return createPortal(
    <>
      <div className={styles["modal__backdrop"]} onClick={onClose} aria-hidden="true" />

      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="talk-to-us-heading"
        className={styles["modal__wrapper"]}
      >
        <div className={styles["modal__inner"]}>
          <button className={styles["modal__close"]} onClick={onClose} aria-label="Close dialog">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M1.5 1.5L18.5 18.5M18.5 1.5L1.5 18.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <p id="talk-to-us-heading" className={styles["modal__heading"]}>
            How can we help?
          </p>

          <div className={styles["modal__cards"]}>
            <a href="#" className={styles.card}>
              <div className={styles["card__content"]}>
                <p className={styles["card__title"]}>I&apos;m a Shopper.</p>
                <p className={styles["card__body"]}>I need help with my order.</p>
              </div>
              <span className={styles["card__cta"]} aria-hidden="true">
                Orders &amp; Returns
              </span>
            </a>

            <a href="/contact" className={styles.card}>
              <div className={styles["card__content"]}>
                <p className={styles["card__title"]}>I&apos;m a Brand.</p>
                <p className={styles["card__body"]}>I want to talk to the ESW team.</p>
              </div>
              <span className={styles["card__cta"]} aria-hidden="true">
                Talk to Us
              </span>
            </a>
          </div>

          <div className={styles["modal__footer"]}>
            <button className={styles["modal__close-text"]} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
});

TalkToUsModal.displayName = "TalkToUsModal";

export default TalkToUsModal;
