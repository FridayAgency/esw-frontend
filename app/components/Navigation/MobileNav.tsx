/** @format */

"use client";

import { Menu, MenuItem, MenuToMenuItemConnectionEdge } from "@/types/graphql";

import { Fragment, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

import Burger from "../Burger";
import NavitemWithChildren from "./NavitemWithChildren";
import NavItem from "./NavItem";

import styles from "./MobileNav.module.scss";

import { useClickOutside, useModal } from "@fridayagency/hooks";
import Logo from "../Logo";
import Button from "../Button";

interface MobileNavProps {
  menu: Menu;
}

const MobileNav: React.FC<MobileNavProps> = ({ menu }) => {
  const navRef = useRef<HTMLDivElement>(null!);
  const path = usePathname();
  const initialPath = useRef(path);

  const { isOpen, openModal, closeModal } = useModal(navRef);

  const handleToggle = useCallback(() => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isOpen, openModal, closeModal]);

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  useClickOutside(navRef, handleClose);

  // Close on route changes
  useEffect(() => {
    if (path !== initialPath.current) {
      closeModal();
      initialPath.current = path;
    }
  }, [path, closeModal]);

  return (
    <div className={styles.container}>
      <Burger onClick={handleToggle} />

      <div
        className={`${styles.overlay} ${isOpen ? styles.show : styles.hide}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <nav
        aria-label="Mobile navigation"
        ref={navRef}
        className={`${styles.nav} ${isOpen ? styles.show : styles.hide}`}
      >
        <div className={styles["nav__actions"]}>
          <Button onClick={handleClose} aria-label="Close navigation menu" type="button">
            Close
          </Button>
        </div>

        <ul className={styles["nav__list"]}>
          {menu?.menuItems?.edges?.length &&
            menu.menuItems.edges
              .filter((edge: MenuToMenuItemConnectionEdge) => !edge.node.parentId)
              .map((edge: MenuToMenuItemConnectionEdge) => {
                const item = edge.node as MenuItem;
                const hasChildren = item.childItems?.edges && item.childItems.edges.length > 0;

                return (
                  <Fragment key={item.id}>
                    {hasChildren ? <NavitemWithChildren item={item} mobile /> : <NavItem item={item} />}
                  </Fragment>
                );
              })}
        </ul>

        <Logo />
      </nav>
    </div>
  );
};

export default MobileNav;
