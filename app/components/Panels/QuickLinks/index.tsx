import { PagePanelsPagePanelsQuickLinksLayout } from "@/types/graphql";
import Container from "../../Container";
import Divider from "../../Divider";
import Icon from "../../Icon";

import styles from "./QuickLinks.module.scss";

import parse from "html-react-parser";

export const QUICK_LINKS_FRAGMENT = `
    title
    links {
      link {
        ...AcfLinkFragment
      }
    }
`;

interface QuickLinksProps {
  panel: PagePanelsPagePanelsQuickLinksLayout;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ panel }) => {
  const { title, links } = panel;

  return (
    <section className={styles["quick-links"]}>
      <Container className={styles["quick-links__container"]}>
        <div className={styles["quick-links__content"]}>
          <div className={styles["quick-links__header"]}>
            <Divider />
            {title && <h2 className={styles["quick-links__title"]}>{title}</h2>}
          </div>

          {links && links.length > 0 && (
            <ul className={styles["quick-links__list"]}>
              {links.map((item, index) => {
                const link = item?.link;
                if (!link?.url || !link?.title) return null;

                return (
                  <li key={index}>
                    <a href={link.url} target={link.target ?? "_self"} className={styles["quick-links__item"]}>
                      <span suppressHydrationWarning>{parse(link.title ?? "")}</span>
                      <span className={styles["quick-links__arrow"]}>
                        <Icon type="arrowRight" />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
};

export default QuickLinks;
