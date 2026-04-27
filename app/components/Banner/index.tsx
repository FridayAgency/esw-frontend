"use client";

import { JSX } from "react";
import Container from "../Container";
import Icon from "../Icon";

import { useScrolled } from "@/app/hooks/useScrolled";

import styles from "./Banner.module.scss";

const SCROLL_THRESHOLD = 50;

const Banner: React.FC = (): JSX.Element | null => {
  const isScrolled = useScrolled(SCROLL_THRESHOLD);

  return (
    <section className={`${styles.banner} ${isScrolled ? styles.hide : styles.show}`}>
      <Container flush>
        <nav aria-label="Company Information Navigation">
          <ul>
            <li>
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
            </li>

            <li>
              <a href="#">
                <Icon type="chevronDown" />
                EN
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </section>
  );
};

export default Banner;
