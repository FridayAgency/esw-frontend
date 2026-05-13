"use client";

import Container from "../Container";
import LanguageSwitcher from "../LanguageSwitcher";

import { useScrolled } from "@/app/hooks/useScrolled";

import styles from "./Banner.module.scss";
import { usePathname } from "next/navigation";
import parse from "html-react-parser";
import { Suspense, useState } from "react";
const SCROLL_THRESHOLD = 50;

interface BannerClientProps {
  bannerText?: string;
}

const BannerClient: React.FC<BannerClientProps> = ({ bannerText }) => {
  const isScrolled = useScrolled(SCROLL_THRESHOLD);
  const [showBanner, setShowBanner] = useState(true);

  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <section className={`${styles.banner} ${isScrolled ? styles.hide : styles.show}`}>
      {isHomepage && bannerText && showBanner && (
        <section className={styles["banner__message"]}>
          <Container className={styles["banner__message-container"]}>
            <div className={styles["banner__message-track"]}>
              <div className={styles["banner__message-inner"]}>
                <span suppressHydrationWarning className={styles["banner__message-text"]}>
                  {parse(bannerText)}
                </span>
                <span
                  suppressHydrationWarning
                  className={`${styles["banner__message-text"]} ${styles["banner__message-text--duplicate"]}`}
                  aria-hidden="true"
                >
                  {parse(bannerText)}
                </span>
              </div>
            </div>
            <button
              aria-label="Dismiss banner"
              className={styles["banner__message-dismiss"]}
              onClick={() => setShowBanner(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.2967 5.8962C20.6042 5.5972 20.7562 5.23254 20.7525 4.8041C20.7563 4.37565 20.6045 4.0072 20.2971 3.69962C19.9981 3.4005 19.6334 3.24856 19.205 3.2438C18.7765 3.2484 18.4081 3.40021 18.1005 3.6992L12.0038 9.80675L5.89722 3.69685C5.59822 3.39773 5.23356 3.24579 4.80512 3.24102C4.37667 3.24563 4.00822 3.39743 3.70065 3.69643C3.40152 4.00386 3.24958 4.37228 3.24482 4.80072C3.24942 5.22917 3.40123 5.59388 3.70022 5.893L9.80777 12.0019L3.69787 18.0963C3.39875 18.4037 3.2468 18.7721 3.24204 19.2006C3.24665 19.629 3.39845 19.9937 3.69745 20.2929C4.00488 20.6004 4.3733 20.7524 4.80174 20.7487C5.23019 20.7525 5.5949 20.6007 5.89402 20.2933L12.003 14.198L18.0973 20.2956C18.4047 20.6032 18.7732 20.7551 19.2016 20.7515C19.63 20.7553 19.9948 20.6035 20.2939 20.2961C20.6014 19.9971 20.7534 19.6324 20.7497 19.204C20.7535 18.7755 20.6017 18.4071 20.2943 18.0995L14.199 12.0028L20.2967 5.8962Z"
                  fill="#1E2221"
                />
              </svg>
            </button>
          </Container>
        </section>
      )}
      <Container className={styles["banner__nav-container"]}>
        <nav className={styles["banner__nav"]} aria-label="Company Information Navigation">
          <ul className={styles["banner__nav-list"]}>
            {/* <li className={styles["banner__nav-list-item"]}>
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="39" height="40" viewBox="0 0 39 40" fill="none">
                  <path
                    d="M19.5 0C45.5016 0.442727 45.4984 39.1232 19.5 39.5628C-6.50157 39.1201 -6.49843 0.439587 19.5 0Z"
                    fill="#1E2221"
                  />
                  <path
                    d="M25.5036 27.7538C25.4722 20.0328 13.7321 20.0454 13.7007 27.7538"
                    stroke="white"
                    strokeWidth="0.941972"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.6037 21.8505C24.75 21.8286 24.75 14.0039 19.6037 13.9819C14.4574 14.0039 14.4605 21.8286 19.6037 21.8505Z"
                    stroke="white"
                    strokeWidth="0.941972"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.6037 29.7194C32.4647 29.6628 32.4647 10.1012 19.6037 10.0479C6.67351 10.2708 6.67666 29.5027 19.6037 29.7194Z"
                    stroke="white"
                    strokeWidth="0.941972"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24.1753 22.6071C25.8049 22.582 25.8049 25.1442 24.1753 25.119C22.5457 25.1442 22.5457 22.582 24.1753 22.6071Z"
                    fill="#00D180"
                    stroke="white"
                    strokeWidth="0.941972"
                  />
                </svg>
                My Account
              </a>
            </li> */}

            <li className={styles["banner__nav-list-item"]}>
              <Suspense>
                <LanguageSwitcher />
              </Suspense>
            </li>
          </ul>
        </nav>
      </Container>
    </section>
  );
};

export default BannerClient;
