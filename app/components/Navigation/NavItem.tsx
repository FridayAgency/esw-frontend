/** @format */

"use client";

import { MenuItem } from "@/types/graphql";
import { usePathname } from "next/navigation";
import styles from "./NavItem.module.scss";
import Button from "../Button";
import { memo, useMemo } from "react";
import Link from "next/link";

interface NavItemProps {
  item: MenuItem;
}

// Memoized regular nav link component
const NavLink = memo(({ uri, label, isActive }: { uri: string; label: string; isActive: boolean }) => (
  <Link className={`nav-item ${styles["nav-item__link"]} ${isActive ? styles.active : ""}`} href={uri}>
    <span className={styles["nav-item__label"]}>{label}</span>
  </Link>
));

NavLink.displayName = "NavLink";

const NavItem = memo(({ item }: NavItemProps) => {
  const pathname = usePathname();

  // Memoize the active state calculation
  const isActive = useMemo(() => pathname === item.uri, [pathname, item.uri]);

  // Memoize the component rendering based on item type
  const content = useMemo(() => {
    return (
      <li className={styles["nav-item"]}>
        <NavLink uri={item.uri as string} label={item.label ?? ""} isActive={isActive} />
      </li>
    );
  }, [item.label, item.uri, item.path, isActive]);

  return content;
});

NavItem.displayName = "NavItem";

export default NavItem;
