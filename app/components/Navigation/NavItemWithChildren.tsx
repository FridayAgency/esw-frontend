/** @format */

"use client";

import { MenuItem, MenuToMenuItemConnectionEdge } from "@/types/graphql";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

import styles from "./NavItemWithChildren.module.scss";
import { ClassName } from "@fridayagency/classnames";
import Icon from "../Icon";

interface GroupedItems {
  heading: string | null | undefined;
  items: MenuToMenuItemConnectionEdge[];
}

const NavitemWithChildren: React.FC<{ item: MenuItem; isParentOpen?: boolean }> = ({ item, isParentOpen = true }) => {
  const [showSubmenu, setShowSubmenu] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  const itemClass = new ClassName(["nav-item", styles["nav__item"]]);
  const triggerId = `submenu-trigger-${item.id}`;

  const nestedItems = item?.childItems?.edges || [];

  const groupedItems = useMemo(() => {
    // Collect all IDs that are children of #title items
    const titleChildrenIds = new Set<string>();
    nestedItems.forEach((edge) => {
      const node = edge.node as MenuItem;
      if (node.uri === "#title" && node.childItems?.edges) {
        node.childItems.edges.forEach((child: MenuToMenuItemConnectionEdge) => {
          if (child.node.id) titleChildrenIds.add(child.node.id);
        });
      }
    });

    return nestedItems.reduce((acc: GroupedItems[], edge: MenuToMenuItemConnectionEdge) => {
      const node = edge.node as MenuItem;
      if (node.uri === "#title") {
        // Create a new group with this as the heading
        const childItems = node.childItems?.edges || [];
        acc.push({ heading: node.label, items: childItems });
      } else if (!titleChildrenIds.has(node.id)) {
        // Only add items that aren't children of #title items
        if (acc.length === 0) acc.push({ heading: null, items: [] });
        acc[acc.length - 1].items.push(edge);
      }
      return acc;
    }, []);
  }, [nestedItems]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowSubmenu(!showSubmenu);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setShowSubmenu(!showSubmenu);
    } else if (e.key === "Escape") {
      setShowSubmenu(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowSubmenu(false);
  }, [path]);

  useEffect(() => {
    if (!isParentOpen) {
      setShowSubmenu(false);
    }
  }, [isParentOpen]);

  // Normalize paths by removing trailing slashes
  const normalizedPath = mounted ? path.replace(/\/$/, "") : "";

  return (
    <li className={itemClass.toString()}>
      <button
        id={triggerId}
        className={`${styles.trigger} ${showSubmenu ? styles.show : styles.hide}`}
        aria-label={`${item.label} submenu`}
        aria-haspopup="true"
        aria-expanded={showSubmenu}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span>{item.label}</span>
        <Icon type="arrowRight" />
      </button>

      <div
        role="region"
        aria-labelledby={triggerId}
        className={`${styles["nav__item-children"]} ${showSubmenu ? styles.show : styles.hide} ${
          groupedItems.length === 3 ? styles.columns : ""
        }`}
      >
        <button onClick={handleClick} className={styles["nav__item-children-back"]}>
          <Icon type="arrowRight" />
          {item.label}
        </button>

        <div className={styles["nav__item-children-container"]}>
          {groupedItems.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`${styles["nav__item-children-group"]} ${group.heading === "Platform" ? styles["platform"] : ""}`}
            >
              {group.heading && <span className={styles["nav__item-children-heading"]}>{group.heading}</span>}
              <ul>
                {group.items.map((edge: MenuToMenuItemConnectionEdge) => {
                  const label = edge.node.label || "";
                  const isItemActive = mounted && normalizedPath === edge.node.uri?.replace(/\/$/, "");

                  return (
                    <li className={isItemActive ? styles.active : ""} key={edge.node.id}>
                      <Link
                        className={`${styles["nav__item-children-link"]} ${isItemActive ? styles.active : ""}`}
                        href={edge.node.uri ?? ""}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};

export default NavitemWithChildren;
