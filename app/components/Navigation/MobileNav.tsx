/** @format */

"use client";

import { Menu } from "@/types/graphql";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import Burger from "../Burger";

import styles from "./MobileNav.module.scss";
import { useModal } from "@fridayagency/hooks";
import NavitemWithChildren from "./NavitemWithChildren";
import NavItem from "./NavItem";
import Logo from "../Logo";
import Link from "next/link";
import Icon from "../Icon";

const MobileNav: React.FC<{ menu: Menu }> = ({ menu }) => {
  const navRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const path = usePathname();

  const { isOpen, openModal, closeModal } = useModal(navRef);

  useEffect(() => {
    closeModal();
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
                      <NavitemWithChildren item={item.node} />
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

        <div className={styles.nav__actions}>
          <button>Talk to Us</button>
          <a href="#">
            <Icon type="profile" />
            My Account
          </a>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
