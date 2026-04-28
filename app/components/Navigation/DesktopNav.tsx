/** @format */

"use client";

import { Menu, MenuItem, MenuToMenuItemConnectionEdge } from "@/types/graphql";
import Link from "next/link";

import styles from "./DesktopNav.module.scss";

import Logo from "../Logo";
import TalkToUsButton from "../TalkToUsButton";
import Container from "../Container";
import NavItemWithChildrenDesktop from "./NavItemWithChildrenDesktop";
import NavItem from "./NavItem";

interface DesktopNavProps {
  menu: Menu;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ menu }) => {
  if (!menu?.menuItems?.edges) {
    return null;
  }

  const topLevel = menu.menuItems.edges
    .filter((item): item is MenuToMenuItemConnectionEdge => !(item.node as MenuItem).parentId)
    .map((item) => item.node as MenuItem);

  const renderNode = (node: MenuItem) => {
    if (node.childItems?.edges.length) {
      return <NavItemWithChildrenDesktop key={node.id} item={node} />;
    }
    return <NavItem key={node.id} item={node} />;
  };

  return (
    <Container flush className={styles.nav}>
      <Link href="/" className={styles.logo} aria-label="Go to homepage">
        <Logo />
      </Link>
      <nav className={styles["nav-list-wrapper"]} aria-label="Primary navigation">
        <ul className={styles["nav-list"]}>{topLevel.map((item) => renderNode(item))}</ul>
        <TalkToUsButton />
      </nav>
    </Container>
  );
};

export default DesktopNav;
