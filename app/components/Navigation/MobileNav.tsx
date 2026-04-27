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
          {menu?.menuItems?.edges?.length &&
            menu?.menuItems?.edges
              .filter((item: any) => !item.node.parentId)
              .map((item: any) => {
                if (item.node.childItems?.edges.length) {
                  return (
                    <Fragment key={item.node.id}>
                      <NavItemWithChildren item={item.node} />
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
          <a href="#">
            <Icon type="profile" />
            My Account
          </a>
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
