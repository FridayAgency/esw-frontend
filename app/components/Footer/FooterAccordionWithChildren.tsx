/** @format */

"use client";

import { MenuItem, MenuToMenuItemConnectionEdge } from "@/types/graphql";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import styles from "./FooterAccordions.module.scss";
import Icon from "../Icon";

interface GroupedItems {
  heading: string | null | undefined;
  items: MenuToMenuItemConnectionEdge[];
}

const FooterAccordionWithChildren: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const path = usePathname();

  const nestedItems = item?.childItems?.edges || [];

  const groupedItems = useMemo(() => {
    // Skip grouping logic for sector menu - just return all items as one group

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
  }, [nestedItems]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className={styles["accordion"]}>
      <button
        className={`${styles["accordion__trigger"]} ${isOpen ? styles.open : ""}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`accordion-${item.id}`}
      >
        <span>{item.label}</span>
      </button>

      <div
        id={`accordion-${item.id}`}
        className={`${styles["accordion__content"]} ${isOpen ? styles.open : ""}`}
        aria-hidden={!isOpen}
      >
        <ul className={styles["accordion__list"]}>
          {groupedItems.map((group, groupIndex) => {
            const sectorSection = item.label?.toLowerCase() === "my sector";
            return (
              <li key={groupIndex} className={`${styles["accordion__group"]} ${sectorSection ? styles.sector : ""}`}>
                {group.heading && sectorSection && (
                  <span className={styles["accordion__heading"]}>{group.heading}</span>
                )}
                <ul>
                  {group.items.map((item: MenuToMenuItemConnectionEdge) => {
                    const viewAll = item.node.label?.toLowerCase().includes("view all");
                    return (
                      <li className={path === item.node.uri ? styles.active : ""} key={item.node.id}>
                        <Link
                          className={`${styles["accordion__link"]} ${viewAll ? styles["view-all"] : ""} `}
                          href={item.node.uri ?? ""}
                        >
                          {viewAll && <span aria-hidden="true" className={styles["icon--right"]}></span>}
                          {item.node.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default FooterAccordionWithChildren;
