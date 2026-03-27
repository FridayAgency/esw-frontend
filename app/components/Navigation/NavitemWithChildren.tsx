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
import { cleanLabel } from "@/utils/cleanLabel";

const VOWEL_SOUND_WORDS = ["sme", "mba", "mri", "fbi", "ngo", "html", "xml", "sql"];
const CONSONANT_SOUND_WORDS = ["one", "once", "university", "union", "european", "user"];

const getArticle = (word: string): string => {
  const lower = word.toLowerCase();
  const firstChar = word.charAt(0).toLowerCase();
  const vowels = ["a", "e", "i", "o", "u"];

  if (VOWEL_SOUND_WORDS.includes(lower)) return "An";
  if (CONSONANT_SOUND_WORDS.some((w) => lower.startsWith(w))) return "A";

  return vowels.includes(firstChar) ? "An" : "A";
};

interface GroupedItems {
  heading: string | null | undefined;
  items: MenuToMenuItemConnectionEdge[];
}

const NavitemWithChildren: React.FC<{ item: MenuItem; mobile?: boolean; isParentOpen?: boolean }> = ({
  item,
  mobile = false,
  isParentOpen = true,
}) => {
  const [showSubmenu, setShowSubmenu] = useState<boolean>(false);
  const [showNestedSubmenu, setShowNestedSubmenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const path = usePathname();
  const itemClass = new ClassName(["nav-item", styles["nav__item"]]);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nestedItems = item?.childItems?.edges || [];
  const shouldAddArticle = item.label?.toLowerCase() === "i am";
  const isSectorMenu = item.label?.toLowerCase() === "my sector";

  const groupedItems = useMemo(() => {
    // Skip grouping logic for sector menu - just return all items as one group
    if (isSectorMenu) {
      return [{ heading: null, items: nestedItems }];
    }

    // First, collect all IDs that are children of #title items
    const titleChildrenIds = new Set<string>();
    nestedItems.forEach((item) => {
      const node = item.node as MenuItem;
      if (node.uri === "#title" && node.childItems?.edges) {
        node.childItems.edges.forEach((child: MenuToMenuItemConnectionEdge) => {
          if (child.node.id) titleChildrenIds.add(child.node.id);
        });
      }
    });

    return nestedItems.reduce((acc: GroupedItems[], item: MenuToMenuItemConnectionEdge) => {
      const node = item.node as MenuItem;
      if (node.uri === "#title") {
        // Create a new group with this as the heading
        const childItems = node.childItems?.edges || [];
        acc.push({ heading: node.label, items: childItems });
      } else if (!titleChildrenIds.has(node.id)) {
        // Only add items that aren't children of #title items
        if (acc.length === 0) acc.push({ heading: null, items: [] });
        acc[acc.length - 1].items.push(item);
      }
      return acc;
    }, []);
  }, [nestedItems, isSectorMenu]);

  const handleClick = (e: React.MouseEvent) => {
    // Clear any pending blur timeout
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }

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

  const handleBlur = (e: React.FocusEvent) => {
    if (!focusInCurrentTarget(e)) {
      // Delay closing to allow clicks on other triggers to register first
      blurTimeoutRef.current = setTimeout(() => {
        setShowSubmenu(false);
      }, 150);
    }
  };

  const handleMouseEnter = () => setShowSubmenu(true);
  const handleMouseLeave = () => setShowSubmenu(false);

  const handleNestedClick = (itemId: string) => {
    setShowNestedSubmenu(itemId);
  };

  const handleNestedBack = () => {
    setShowNestedSubmenu(null);
  };

  useEffect(() => {
    // Cleanup timeout on unmount
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
    setShowNestedSubmenu(null);
  }, [path]);

  useEffect(() => {
    // Close submenus when mobile nav closes
    if (mobile && !isParentOpen) {
      setShowSubmenu(false);
      setShowNestedSubmenu(null);
    }
  }, [mobile, isParentOpen]);

  const desktopEvents = !mobile
    ? { onBlur: handleBlur, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave }
    : {};

  // Normalize paths by removing trailing slashes
  const normalizedPath = mounted ? path.replace(/\/$/, "") : "";
  const isTopLevelActive = mounted && normalizedPath === item.uri?.replace(/\/$/, "");

  return (
    <div key={item.id} className={itemClass.toString()} {...desktopEvents}>
      <button
        className={`${styles.trigger} ${isTopLevelActive ? styles.active : ""} ${
          showSubmenu ? styles.show : styles.hide
        }`}
        aria-label={`${item.label} submenu`}
        aria-haspopup="true"
        aria-expanded={showSubmenu}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <span>{item.label}</span>
        <span aria-hidden="true" className={styles["icon--right"]}>
          <Icon type="right" />
        </span>
        <span aria-hidden="true" className={styles["icon--down"]}>
          <Icon type="down" />
        </span>
      </button>

      <ul
        aria-label={`${item.label} submenu`}
        className={`${styles["nav__item-children"]} ${showSubmenu ? styles.show : styles.hide} ${
          groupedItems.length === 3 && styles.columns
        }`}
      >
        <button onClick={handleClick} className={styles["nav__item-children-back"]}>
          <Icon type="back" />
          {item.label}
        </button>
        {groupedItems.map((group, groupIndex) => (
          <li key={groupIndex} className={styles["nav__item-children-group"]}>
            {group.heading && (
              <span className={styles["nav__item-children-heading"]} aria-label="Menu section">
                {group.heading}
              </span>
            )}
            <ul>
              {group.items.map((item: MenuToMenuItemConnectionEdge) => {
                const label = item.node.label || "";
                const cleanedLabel = cleanLabel(label);
                const displayLabel = shouldAddArticle ? `${getArticle(cleanedLabel)} ${cleanedLabel}` : cleanedLabel;
                const hasChildren = item.node.childItems?.edges && item.node.childItems.edges.length > 0;
                const isItemActive = mounted && normalizedPath === item.node.uri?.replace(/\/$/, "");

                return (
                  <li className={isItemActive ? styles.active : ""} key={item.node.id}>
                    {hasChildren ? (
                      <>
                        <button
                          className={styles["nav__item-children-trigger"]}
                          onClick={() => handleNestedClick(item.node.id)}
                        >
                          {displayLabel}
                          <span aria-hidden="true">
                            <Icon type="right" />
                          </span>
                        </button>
                        <ul
                          className={`${styles["nav__item-children-nested"]} ${
                            showNestedSubmenu === item.node.id ? styles.show : styles.hide
                          }`}
                        >
                          <button onClick={handleNestedBack} className={styles["nav__item-children-back"]}>
                            <Icon type="back" />
                            {displayLabel}
                          </button>
                          {item.node.childItems!.edges.map((child) => {
                            const childNode = child.node as MenuItem;

                            const childLabel = cleanLabel(childNode.label || "");
                            const isViewAll = childLabel.toLowerCase().includes("view all");
                            const isChildActive = mounted && normalizedPath === childNode.uri?.replace(/\/$/, "");

                            return (
                              <li key={childNode.id}>
                                <Link
                                  className={`${styles["nav__item-children-link"]} ${isChildActive ? styles.active : ""} ${isViewAll ? styles["view-all"] : ""}`}
                                  href={childNode.uri ?? ""}
                                >
                                  {isViewAll && (
                                    <span aria-hidden="true">
                                      <Icon type="right" />
                                    </span>
                                  )}

                                  {childLabel}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    ) : (
                      <Link
                        className={`${styles["nav__item-children-link"]} ${isItemActive ? styles.active : ""}`}
                        href={item.node.uri ?? ""}
                      >
                        {displayLabel}
                      </Link>
                    )}
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

export default NavitemWithChildren;
