/** @format */

"use client";

import { Menu } from "@/types/graphql";
import { Fragment } from "react";
import FooterAccordionItem from "./FooterAccordionItem";
import FooterAccordionWithChildren from "./FooterAccordionWithChildren";
import styles from "./FooterAccordions.module.scss";
import Link from "next/link";

const FooterAccordions: React.FC<{ menu: Menu }> = ({ menu }) => {
  const menuItems = menu?.menuItems?.edges || [];

  return (
    <nav aria-label="Footer navigation" className={styles.container}>
      <ul className={styles.list}>
        <li className={styles["accordion-item"]}>
          <Link className={styles["accordion-item__link"]} href="/">
            Home
          </Link>
        </li>
        {menuItems
          .filter((item: any) => !item.node.parentId)
          .map((item: any) => {
            if (item.node.childItems?.edges.length) {
              return (
                <Fragment key={item.node.id}>
                  <FooterAccordionWithChildren item={item.node} />
                </Fragment>
              );
            } else {
              return (
                <Fragment key={item.node.id}>
                  <FooterAccordionItem item={item.node} />
                </Fragment>
              );
            }
          })}
      </ul>
    </nav>
  );
};

export default FooterAccordions;
