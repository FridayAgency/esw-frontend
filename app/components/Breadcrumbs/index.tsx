import Link from "next/link";
import styles from "./Bredcrumbs.module.scss";
import Container from "../Container";
import Icon from "../Icon";
import React, { JSX } from "react";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  title: string;
  readTime?: number;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, title, readTime }): JSX.Element => {
  return (
    <nav aria-label="Breadcrumb" className={styles["breadcrumbs"]}>
      <Container className={styles["breadcrumbs__container"]}>
        <ol className={styles["breadcrumbs__list"]}>
          <li className={styles["desktop-only"]}>
            <Link suppressHydrationWarning href="/" className={styles["breadcrumbs__link"]}>
              Home
            </Link>
          </li>
          <li className={`${styles["breadcrumbs__separator"]} ${styles["desktop-only"]}`} aria-hidden="true" />

          {items.map((item) => (
            <React.Fragment key={item.href}>
              <li>
                <Link suppressHydrationWarning href={item.href} className={styles["breadcrumbs__link"]}>
                  {item.label}
                </Link>
              </li>
              <li className={styles["breadcrumbs__separator"]} aria-hidden="true" />
            </React.Fragment>
          ))}
          <li aria-current="page" className={styles["breadcrumbs__item"]}>
            {title}
          </li>
        </ol>
        {readTime && (
          <div className={styles["breadcrumbs__read-time"]}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 5C22.0711 5 27 9.92894 27 16C27 22.0711 22.0711 27 16 27C9.92894 27 5 22.0711 5 16C5 9.92894 9.92894 5 16 5ZM16 6.46667C10.7383 6.46667 6.46667 10.7383 6.46667 16C6.46667 21.2617 10.7383 25.5333 16 25.5333C21.2617 25.5333 25.5333 21.2617 25.5333 16C25.5333 10.7383 21.2617 6.46667 16 6.46667ZM16.7333 15.6966L20.4155 19.3787C20.7024 19.6647 20.7024 20.1295 20.4155 20.4155C20.1295 20.7024 19.6647 20.7024 19.3787 20.4155L15.6966 16.7333C15.4216 16.4583 15.2667 16.0853 15.2667 15.6966V9.4C15.2667 8.99574 15.5948 8.66667 16 8.66667C16.4052 8.66667 16.7333 8.99574 16.7333 9.4V15.6966Z"
                fill="#00D180"
              />
            </svg>

            <span suppressHydrationWarning>
              {readTime} Minute{readTime !== 1 ? "s" : ""} Read
            </span>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Breadcrumbs;
