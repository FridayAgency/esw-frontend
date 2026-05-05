/** @format */

"use client";

import { MenuItem, MenuToMenuItemConnectionEdge } from "@/types/graphql";
import { focusInCurrentTarget } from "@fridayagency/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";

import styles from "./NavItemWithChildrenDesktop.module.scss";
import { ClassName } from "@fridayagency/classnames";
import Icon from "../Icon";

interface GroupedItems {
  heading: string | null | undefined;
  items: MenuToMenuItemConnectionEdge[];
}

const BLUR_TIMEOUT = 150;

const NavItemWithChildrenDesktop: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [showSubmenu, setShowSubmenu] = useState<boolean>(false);
  const path = usePathname();
  const itemClass = new ClassName(["nav-item", styles["nav__item"]]);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
        const childItems = node.childItems?.edges || [];
        acc.push({ heading: node.label, items: childItems });
      } else if (!titleChildrenIds.has(node.id)) {
        if (acc.length === 0) acc.push({ heading: null, items: [] });
        acc[acc.length - 1].items.push(edge);
      }
      return acc;
    }, []);
  }, [nestedItems]);

  const handleBlur = (e: React.FocusEvent) => {
    if (!focusInCurrentTarget(e)) {
      blurTimeoutRef.current = setTimeout(() => {
        setShowSubmenu(false);
      }, BLUR_TIMEOUT);
    }
  };

  const handleMouseEnter = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setShowSubmenu(true);
  };

  const handleMouseLeave = () => setShowSubmenu(false);

  const handleClick = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    setShowSubmenu((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && showSubmenu) {
      setShowSubmenu(false);
      (e.currentTarget as HTMLElement).querySelector<HTMLButtonElement>(`#${triggerId}`)?.focus();
    }
  };

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setShowSubmenu(false);
  }, [path]);

  const normalizedPath = path.replace(/\/$/, "");
  const isTopLevelActive = normalizedPath === item.uri?.replace(/\/$/, "");

  return (
    <li
      className={itemClass.toString()}
      style={groupedItems.length < 3 ? { position: "relative" } : undefined}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        id={triggerId}
        type="button"
        className={`${styles.trigger} ${isTopLevelActive ? styles.active : ""} ${
          showSubmenu ? styles.show : styles.hide
        }`}
        onClick={handleClick}
        aria-expanded={showSubmenu}
        aria-haspopup="true"
        aria-controls={`submenu-${item.id}`}
      >
        <span>{item.label}</span>
        <span aria-hidden="true" className={styles["icon--down"]}>
          <Icon type="chevronDown" />
        </span>
      </button>

      <div
        id={`submenu-${item.id}`}
        role="region"
        aria-labelledby={triggerId}
        className={`${styles["nav__item-children"]} ${showSubmenu ? styles.show : styles.hide} ${
          groupedItems.length >= 3 ? styles.wide : ""
        }`}
      >
        <div className={styles["nav__item-children-container"]}>
          {groupedItems.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`${styles["nav__item-children-group"]} ${
                group.heading === "Platform" ? styles["platform"] : ""
              }`}
            >
              {group.heading && <span className={styles["nav__item-children-heading"]}>{group.heading}</span>}
              <ul>
                {group.items.map((edge: MenuToMenuItemConnectionEdge) => {
                  const isItemActive = normalizedPath === edge.node.uri?.replace(/\/$/, "");
                  return (
                    <li key={edge.node.id}>
                      <Link
                        className={`${styles["nav__item-children-link"]} ${isItemActive ? styles.active : ""}`}
                        href={edge.node.uri ?? ""}
                      >
                        {edge.node.label}
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

export default NavItemWithChildrenDesktop;
