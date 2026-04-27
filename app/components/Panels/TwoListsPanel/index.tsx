import { PagePanelsPagePanelsTwoListsPanelLayout } from "@/types/graphql";
import styles from "./TwoListsPanel.module.scss";
import Container from "../../Container";

export const TWO_LISTS_PANEL_FRAGMENT = `
    listRepeater {
    title
    listItems {
            listItem
        }
    }
`;

interface TwoListsPanelProps {
  panel: PagePanelsPagePanelsTwoListsPanelLayout;
}

const TwoListsPanel: React.FC<TwoListsPanelProps> = ({ panel }) => {
  const { listRepeater } = panel || {};

  if (!listRepeater?.length) return null;

  return (
    <section className={styles["two-lists-panel"]}>
      <Container className={styles["two-lists-panel__inner"]}>
        {listRepeater.map((list, index) => {
          if (!list) return null;
          return (
            <div key={index} className={styles["two-lists-panel__card"]}>
              <div className={styles["two-lists-panel__card-inner"]}>
                {list.title && <p className={styles["two-lists-panel__title"]}>{list.title}</p>}
                {list.listItems && list.listItems.length > 0 && (
                  <ul className={styles["two-lists-panel__list"]}>
                    {list.listItems.map((item, itemIndex) => {
                      if (!item?.listItem) return null;
                      return (
                        <li key={itemIndex} className={styles["two-lists-panel__item"]}>
                          <span className={styles["two-lists-panel__item-text"]}>{item.listItem}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
};

export default TwoListsPanel;
