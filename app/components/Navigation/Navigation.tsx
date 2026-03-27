/** @format */

import { Menu, MenuItem, MenuToMenuItemConnectionEdge } from "@/types/graphql";
import Link from "next/link";

import styles from "./Navigation.module.scss";
import NavitemWithChildren from "./NavitemWithChildren";
import NavItem from "./NavItem";

import MobileNav from "./MobileNav";

import client from "@/lib/client";
import { GET_MENU } from "@/data/fragments";

const Navigation: React.FC = async () => {
  try {
    const { menu } = await client.query<{ menu: Menu }>(GET_MENU, { variables: { id: "Main Menu" } });
    if (!menu?.menuItems?.edges) {
      console.warn("Navigation: No menu items found");
      return null;
    }

    const topLevelItems = menu.menuItems.edges.filter((item: MenuToMenuItemConnectionEdge) => !item.node.parentId);

    return (
      <>
        <MobileNav menu={menu} />

        <nav aria-label="Site navigation" className={styles.nav}>
          <ul className={styles["nav-list"]}>
            {topLevelItems.map((item: MenuToMenuItemConnectionEdge) => {
              const hasChildren = item.node.childItems?.edges && item.node.childItems.edges.length > 0;

              if (hasChildren) {
                return <NavitemWithChildren item={item.node} key={item.node.databaseId} />;
              }

              return <NavItem item={item.node} key={item.node.databaseId} />;
            })}
          </ul>
        </nav>
      </>
    );
  } catch (error) {
    console.error("Navigation: Failed to load menu", error);
    return null;
  }
};

export default Navigation;
