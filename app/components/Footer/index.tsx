import Container from "../Container";
import styles from "./Footer.module.scss";
import Logo from "../Logo";
import Icon from "../Icon";
import { Menu, MenuItem } from "@/types/graphql";
import client from "@/lib/client";
import { FRAGMENTS } from "@fridayagency/graphql-client";

// A "section" is a group of child links beneath an optional sub-heading.
// Formed by splitting child items on nodes whose path === "#title".
type NavSection = {
  heading: string | null;
  items: MenuItem[];
};

/**
 * Split a flat list of child menu items into labelled sections.
 *
 * Items with path === "#title" act as section dividers in WordPress.
 * If the very first divider has the same label as the parent item
 * (e.g. "Platform" inside the Platform column) it is skipped because
 * the parent heading already covers it.
 */
function groupChildItems(edges: Array<{ node: MenuItem }>, parentLabel: string): NavSection[] {
  const sections: NavSection[] = [];
  let current: NavSection = { heading: null, items: [] };

  for (const { node } of edges) {
    if (node.path === "#title") {
      // Skip the redundant first divider that mirrors the parent label
      if (node.label === parentLabel && sections.length === 0 && current.items.length === 0) {
        continue;
      }
      // Flush the current section before starting a new one
      if (current.heading !== null || current.items.length > 0) {
        sections.push(current);
      }
      current = { heading: node.label ?? null, items: [] };
    } else {
      current.items.push(node);
    }
  }

  // Flush the last section
  if (current.heading !== null || current.items.length > 0) {
    sections.push(current);
  }

  return sections;
}

const Footer: React.FC = async () => {
  const { menu } = await client.query<{ menu: Menu }>(
    `query GetMenu($id: ID!) {
        menu(id: $id, idType: NAME) {
          menuItems(first: 100) {
            edges {
              node {
                ...MenuItemFragment
                childItems(first: 100) {
                  edges {
                    node {
                      ...MenuItemFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
  ${FRAGMENTS.MENU_ITEM_FRAGMENT}
`,
    { variables: { id: "Main Menu" } },
  );

  // Only top-level items (parentId is null in WordPress).
  // Cast is needed because Edge's generic `node: Node` widens the inferred type.
  const topLevelItems = (menu?.menuItems?.edges ?? [])
    .filter(({ node }) => !(node as MenuItem).parentId)
    .map(({ node }) => node as MenuItem);

  // "Home" lives at the top of column 1, above the first major heading
  const homeItem = topLevelItems.find((item) => item.path === "/");

  // First 3 top-level items that have children become the major nav columns
  // (Why ESW → col 1, Platform → col 2, Solutions → col 3)
  const majorColumns = topLevelItems.filter((item) => (item.childItems?.edges?.length ?? 0) > 0).slice(0, 3);

  const majorIds = new Set(majorColumns.map((i) => i.databaseId));

  // Everything except Home and the major columns shares the 4th column
  // (Resources, Careers + children, Blog, …)
  const secondaryItems = topLevelItems.filter((item) => !majorIds.has(item.databaseId) && item.path !== "/");

  return (
    <footer className={styles.footer}>
      <Container className={styles["footer__container"]}>
        {/* Logo + CTA — mobile: stacked at top; desktop: left sidebar via grid */}
        <div className={styles["footer__header"]}>
          <Logo />
          <div className={styles["footer__actions-mobile"]}>
            <button type="button" className={styles["footer__cta"]}>
              Talk to Us
            </button>
            <ul className={styles["footer__socials"]}>
              <li className={styles["footer__socials-item"]}>
                <a href="#" aria-label="LinkedIn">
                  <Icon type="linkedIn" />
                </a>
              </li>
              <li className={styles["footer__socials-item"]}>
                <a href="#" aria-label="Vimeo">
                  <Icon type="vimeo" />
                </a>
              </li>
              <li className={styles["footer__socials-item"]}>
                <a href="#" aria-label="Instagram">
                  <Icon type="instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <nav className={styles["footer__nav"]} aria-label="Footer navigation">
          {/* Columns 1–3: major items with children (Why ESW, Platform, Solutions) */}
          {majorColumns.map((item, colIndex) => {
            const sections = groupChildItems(item.childItems?.edges ?? [], item.label ?? "");
            // If any section has a heading, render the structured sub-group layout
            const hasSections = sections.some((s) => s.heading !== null);

            return (
              <div key={item.databaseId} className={styles["footer__nav-group"]}>
                {colIndex === 0 && homeItem && (
                  <a href={homeItem.path ?? "/"} className={styles["footer__nav-heading"]}>
                    {homeItem.label}
                  </a>
                )}
                <h2 className={styles["footer__nav-heading"]}>{item.label}</h2>

                {hasSections ? (
                  sections.map((section, i) => (
                    <div key={i} className={styles["footer__nav-sub-group"]}>
                      {section.heading && <h3 className={styles["footer__nav-subheading"]}>{section.heading}</h3>}
                      {section.items.length > 0 && (
                        <ul className={styles["footer__nav-list"]}>
                          {section.items.map((child) => (
                            <li key={child.databaseId} className={styles["footer__nav-item"]}>
                              <a href={child.uri ?? child.path ?? "#"}>{child.label}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  // Simple column — no sub-section headings (e.g. Why ESW)
                  <ul className={styles["footer__nav-list"]}>
                    {(item.childItems?.edges ?? []).map(({ node }) => {
                      const child = node as MenuItem;
                      return (
                        <li key={child.databaseId} className={styles["footer__nav-item"]}>
                          <a href={child.uri ?? child.path ?? "#"}>{child.label}</a>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}

          {/* Column 4: secondary items (Home, Resources, Careers, Blog, …) */}
          <div className={styles["footer__nav-group"]}>
            <ul className={styles["footer__nav-list-secondary"]}>
              {secondaryItems.map((item) => {
                const children = item.childItems?.edges ?? [];
                return (
                  <li key={item.databaseId} className={styles["footer__nav-item"]}>
                    <a href={item.uri ?? item.path ?? "#"}>{item.label}</a>
                    {children.length > 0 && (
                      <ul className={styles["footer__nav-list"]}>
                        {children.map(({ node }) => {
                          const child = node as MenuItem;
                          return (
                            <li key={child.databaseId} className={styles["footer__nav-item"]}>
                              <a href={child.uri ?? child.path ?? "#"}>{child.label}</a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Desktop CTA + socials — right sidebar via grid, hidden on mobile */}
        <div className={styles["footer__actions-desktop"]}>
          <button type="button" className={styles["footer__cta"]}>
            Talk to Us
          </button>
          <ul className={styles["footer__socials"]}>
            <li className={styles["footer__socials-item"]}>
              <a href="#" aria-label="LinkedIn">
                <Icon type="linkedIn" />
              </a>
            </li>
            <li className={styles["footer__socials-item"]}>
              <a href="#" aria-label="Vimeo">
                <Icon type="vimeo" />
              </a>
            </li>
            <li className={styles["footer__socials-item"]}>
              <a href="#" aria-label="Instagram">
                <Icon type="instagram" />
              </a>
            </li>
          </ul>
        </div>

        {/* Legal links bar */}
        <nav className={styles["footer__legal"]} aria-label="Legal">
          <ul className={styles["footer__legal-list"]}>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Privacy Policy</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Cookie Settings</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Terms &amp; Conditions</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Acceptable Use Policy</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Modern Slavery Statement</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Sitemap</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Legal Hub</a>
            </li>
            <li className={styles["footer__legal-item"]}>
              <a href="#">Accessibility Statement</a>
            </li>
          </ul>
        </nav>

        <p className={styles["footer__disclaimer"]}>
          Monthly Active Recipients: Pursuant to the Digital Services Act, Article 24(2), our average monthly recipients
          are 241,559.42.
        </p>
      </Container>

      {/* Copyright bar */}
      <div className={styles["footer__copyright"]}>
        <Container className={styles["footer__copyright-container"]}>
          <div className={styles["footer__copyright-left"]}>
            <span className={styles["footer__copyright-year"]}>&copy; {new Date().getFullYear()} ESW</span>
            <span className={styles["footer__copyright-rights"]}>All Rights Reserved</span>
          </div>
          <span className={styles["footer__copyright-site"]}>
            Site by <a href="#">Friday</a>
          </span>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
