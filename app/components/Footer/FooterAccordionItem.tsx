"use client";

import { MenuItem } from "@/types/graphql";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";
import styles from "./FooterAccordions.module.scss";

interface FooterAccordionItemProps {
  item: MenuItem;
}

const FooterAccordionItem = memo(({ item }: FooterAccordionItemProps) => {
  return (
    <li className={styles["accordion-item"]}>
      <Link className={styles["accordion-item__link"]} href={item.uri as string}>
        {item.label}
      </Link>
    </li>
  );
});

FooterAccordionItem.displayName = "FooterAccordionItem";

export default FooterAccordionItem;
