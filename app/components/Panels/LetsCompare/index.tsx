import { PagePanelsPagePanelsLetsCompareLayout, PagePanelsPagePanelsRows } from "@/types/graphql";
import styles from "./LetsCompare.module.scss";
import Container from "../../Container";

export const LETS_COMPARE_FRAGMENT = `
... on PagePanelsPagePanelsLetsCompareLayout {
          column1Title
          column2Title
          title
          rows {
            category
            column1Copy
            column2Copy
          }
        }
`;

interface LetsCompareProps {
  panel: PagePanelsPagePanelsLetsCompareLayout;
}

const LetsCompare = ({ panel }: LetsCompareProps) => {
  const { title, column1Title, column2Title, rows } = panel;

  return (
    <section className={styles["lets-compare"]}>
      <Container flush className={styles["lets-compare__container"]}>
        <div className={styles["lets-compare__inner"]}>
          <h2 className={styles["lets-compare__heading"]}>{title}</h2>
          <div className={styles["lets-compare__table-wrapper"]}>
            <table className={styles["lets-compare__table"]}>
              <thead>
                <tr>
                  <th className={styles["lets-compare__th-empty"]} />
                  <th className={styles["lets-compare__th"]}>{column1Title}</th>
                  <th className={styles["lets-compare__th"]}>{column2Title}</th>
                </tr>
              </thead>
              <tbody>
                {(rows?.filter(Boolean) as PagePanelsPagePanelsRows[]).map(({ category, column1Copy, column2Copy }) => (
                  <tr className={styles["lets-compare__row"]} key={category}>
                    <th className={styles["lets-compare__row-header"]} scope="row">
                      {category}
                    </th>
                    <td className={styles["lets-compare__td--esw"]}>{column1Copy}</td>
                    <td className={styles["lets-compare__td--competitors"]}>{column2Copy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LetsCompare;
