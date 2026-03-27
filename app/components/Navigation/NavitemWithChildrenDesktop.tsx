/** @format */

"use client";

import { MenuItem, MenuToMenuItemConnectionEdge } from "@/types/graphql";
import { focusInCurrentTarget } from "@fridayagency/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";

import styles from "./NavItemWithChildren.module.scss";
import { ClassName } from "@fridayagency/classnames";
import Icon from "../Icon";

const VOWEL_SOUND_WORDS = ["sme", "mba", "mri", "fbi", "ngo", "html", "xml", "sql"];
const CONSONANT_SOUND_WORDS = ["one", "once", "university", "union", "european", "user"];
const TITLE_URI = "#title";

const getArticle = (word: string): string => {
  const lower = word.toLowerCase();
  const firstChar = word.charAt(0).toLowerCase();
  const vowels = ["a", "e", "i", "o", "u"];

  if (VOWEL_SOUND_WORDS.includes(lower)) return "An";
  if (CONSONANT_SOUND_WORDS.some((w) => lower.startsWith(w))) return "A";

  return vowels.includes(firstChar) ? "An" : "A";
};

const cleanLabel = (label: string): string => {
  return label.replace(/\[.*?\]:\s*/g, "").trim();
};

interface GroupedItems {
  heading: string | null | undefined;
  items: MenuToMenuItemConnectionEdge[];
}

const NavitemWithChildrenDesktop: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [showSubmenu, setShowSubmenu] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  const itemClass = new ClassName(["nav-item", styles["nav__item"]]);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nestedItems = useMemo(() => item?.childItems?.edges || [], [item?.childItems?.edges]);
  const shouldAddArticle = item.label?.toLowerCase() === "i am";
  const isSectorMenu = item.label?.toLowerCase() === "my sector";

  const groupedItems = useMemo(() => {
    // Collect all IDs that are children of #title items
    const titleChildrenIds = new Set<string>();
    nestedItems.forEach((edge) => {
      const node = edge.node as MenuItem;
      if (node.uri === TITLE_URI && node.childItems?.edges) {
        node.childItems.edges.forEach((child: MenuToMenuItemConnectionEdge) => {
          if (child.node.id) titleChildrenIds.add(child.node.id);
        });
      }
    });

    return nestedItems.reduce((acc: GroupedItems[], edge: MenuToMenuItemConnectionEdge) => {
      const node = edge.node as MenuItem;
      if (node.uri === TITLE_URI) {
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
      }, 150);
    }
  };

  const handleMouseEnter = () => setShowSubmenu(true);
  const handleMouseLeave = () => setShowSubmenu(false);

  const handleClick = () => {
    setShowSubmenu((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && showSubmenu) {
      setShowSubmenu(false);
      e.currentTarget.querySelector("button")?.focus();
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
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowSubmenu(false);
  }, [path]);

  const normalizedPath = mounted ? path.replace(/\/$/, "") : "";
  const isTopLevelActive = mounted && normalizedPath === item.uri?.replace(/\/$/, "");

  return (
    <div
      className={itemClass.toString()}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        className={`${styles.trigger} ${isTopLevelActive ? styles.active : ""} ${
          showSubmenu ? styles.show : styles.hide
        }`}
        onClick={handleClick}
        aria-expanded={showSubmenu}
        aria-haspopup="true"
      >
        <span>{item.label}</span>
        <span aria-hidden="true" className={styles["icon--down"]}>
          <Icon type="down" />
        </span>
      </button>

      <ul
        aria-label={`${item.label} submenu`}
        className={`${styles["nav__item-children"]} ${showSubmenu ? styles.show : styles.hide} ${
          groupedItems.length === 3 ? styles.columns : ""
        }
        } ${isSectorMenu ? styles.sector : ""}`}
      >
        {groupedItems.map((group, groupIndex) => (
          <li key={groupIndex} className={styles["nav__item-children-group"]}>
            {group.heading && (
              <span className={styles["nav__item-children-heading"]} aria-label="Menu section">
                {group.heading}
              </span>
            )}
            <ul>
              {group.items.map((edge: MenuToMenuItemConnectionEdge) => {
                const node = edge.node as MenuItem;
                const label = node.label || "";
                const cleanedLabel = cleanLabel(label);
                const displayLabel = shouldAddArticle ? `${getArticle(cleanedLabel)} ${cleanedLabel}` : cleanedLabel;
                const isItemActive = mounted && normalizedPath === node.uri?.replace(/\/$/, "");
                const hasChildren = node.childItems?.edges && node.childItems.edges.length > 0;
                const isViewAll = displayLabel.toLowerCase().includes("view all");

                return (
                  <li className={isItemActive ? styles.active : ""} key={node.id}>
                    <Link
                      className={`${styles["nav__item-children-link"]} ${isItemActive ? styles.active : ""} ${isViewAll ? styles["view-all"] : ""}`}
                      href={node.uri ?? ""}
                    >
                      {isViewAll && (
                        <span aria-hidden="true">
                          <Icon type="right" />
                        </span>
                      )}
                      {displayLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavitemWithChildrenDesktop;
