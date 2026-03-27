import Link from "next/link";
import styles from "./Bredcrumbs.module.scss";
import Icon from "../Icon";
import React, { JSX } from "react";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  title: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, title }): JSX.Element => {
  return (
    <nav aria-label="Breadcrumb" className={styles["breadcrumbs"]}>
      <ol className={styles["breadcrumbs__list"]}>
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <li>
              <Link href={item.href} className={styles["breadcrumbs__link"]}>
                {item.label}
              </Link>
            </li>
            <li className={styles["breadcrumbs__separator"]}></li>
          </React.Fragment>
        ))}
        <li aria-current="page" className={styles["breadcrumbs__item"]}>
          {title}
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
