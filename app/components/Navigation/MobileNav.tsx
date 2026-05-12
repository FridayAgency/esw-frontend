/** @format */

"use client";

import { Menu } from "@/types/graphql";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import Burger from "../Burger";

import styles from "./MobileNav.module.scss";
import { useModal } from "@fridayagency/hooks";
import NavItemWithChildren from "./NavItemWithChildren";
import NavItem from "./NavItem";
import Logo from "../Logo";
import Link from "next/link";
import Icon from "../Icon";
import LanguageSwitcher from "../LanguageSwitcher";

const MobileNav: React.FC<{ menu: Menu }> = ({ menu }) => {
  const navRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const path = usePathname();
  const [talkToUsOpen, setTalkToUsOpen] = useState(false);

  const { isOpen, openModal, closeModal } = useModal(navRef);

  useEffect(() => {
    closeModal();
    setTalkToUsOpen(false);
  }, [path]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Go to homepage">
          <Logo />
        </Link>
        <Burger
          isOpen={isOpen}
          onClick={() => {
            if (isOpen) {
              closeModal();
              setTalkToUsOpen(false);
            } else {
              openModal();
            }
          }}
        />
      </div>

      <nav
        aria-label="Mobile navigation"
        ref={navRef}
        className={`${styles.nav} ${isOpen ? styles.show : styles.hide} `}
      >
        <ul className={styles["nav__list"]}>
          <li className={styles["nav__locale"]}>
            <LanguageSwitcher />
          </li>
          {menu?.menuItems?.edges?.length &&
            menu?.menuItems?.edges
              .filter((item: any) => !item.node.parentId)
              .map((item: any) => {
                if (item.node.childItems?.edges.length) {
                  return (
                    <Fragment key={item.node.id}>
                      <NavItemWithChildren item={item.node} isParentOpen={isOpen} />
                    </Fragment>
                  );
                } else {
                  return (
                    <Fragment key={item.node.id}>
                      <NavItem item={item.node} />
                    </Fragment>
                  );
                }
              })}
        </ul>

        <div className={styles["nav__actions"]}>
          <button onClick={() => setTalkToUsOpen(true)}>Talk to Us</button>
          {/* <a href="#" aria-label="My Account">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.1671 20.1426C23.0282 20.0861 23.0282 0.524448 10.1671 0.471069C-2.76301 0.694003 -2.75987 19.9259 10.1671 20.1426Z"
                stroke="#1E2221"
                strokeWidth="0.941972"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1652 12.274C15.3115 12.252 15.3115 4.42737 10.1652 4.4054C5.01889 4.42737 5.02203 12.252 10.1652 12.274Z"
                stroke="#1E2221"
                strokeWidth="0.941972"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.0666 18.1769C16.0352 10.4559 4.29507 10.4685 4.26367 18.1769"
                stroke="#1E2221"
                strokeWidth="0.941972"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.7378 13.0307C16.3674 13.0056 16.3674 15.5677 14.7378 15.5426C13.1082 15.5677 13.1082 13.0056 14.7378 13.0307Z"
                fill="#00D180"
                stroke="#1E2221"
                strokeWidth="0.941972"
              />
            </svg>
            My Account
          </a> */}
        </div>
      </nav>

      <div
        className={`${styles["talk-to-us"]} ${talkToUsOpen ? styles["talk-to-us--open"] : ""}`}
        aria-hidden={!talkToUsOpen}
      >
        <button className={styles["talk-to-us__back"]} onClick={() => setTalkToUsOpen(false)} aria-label="Back to menu">
          <Icon type="arrowRight" />
          Back
        </button>

        <p className={styles["talk-to-us__heading"]}>How can we help?</p>

        <div className={styles["talk-to-us__cards"]}>
          <a href="#" className={styles["talk-to-us__card"]}>
            <div className={styles["talk-to-us__card-content"]}>
              <p className={styles["talk-to-us__card-title"]}>I&apos;m a Shopper.</p>
              <p className={styles["talk-to-us__card-body"]}>I need help with my order.</p>
            </div>
            <span className={styles["talk-to-us__card-cta"]}>Orders &amp; Returns</span>
          </a>

          <a href="/contact" className={styles["talk-to-us__card"]}>
            <div className={styles["talk-to-us__card-content"]}>
              <p className={styles["talk-to-us__card-title"]}>I&apos;m a Brand.</p>
              <p className={styles["talk-to-us__card-body"]}>I want to talk to the ESW team.</p>
            </div>
            <span className={styles["talk-to-us__card-cta"]}>Talk to Us</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
