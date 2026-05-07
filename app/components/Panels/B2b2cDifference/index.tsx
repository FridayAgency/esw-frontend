import { PagePanelsPagePanelsB2b2cDifferenceLayout, PagePanelsPagePanelsStats } from "@/types/graphql";
import Button from "../../Button";
import Container from "../../Container";
import Divider from "../../Divider";
import styles from "./B2b2cDifference.module.scss";

export const B2B2C_DIFFERECNCE_FRAGMENT = `

    subtitle
    title
    callToAction {
      ...AcfLinkFragment
    }
    bcstats {
      subtitle
      stat
      copy
    }

`;

interface B2b2cDifferenceProps {
  panel: PagePanelsPagePanelsB2b2cDifferenceLayout;
}

const B2b2cDifference: React.FC<B2b2cDifferenceProps> = ({ panel }) => {
  const { title, subtitle, bcstats, callToAction } = panel;

  return (
    <section className={styles["b2b2c-difference"]}>
      <Container className={styles["b2b2c-difference__container"]}>
        <div className={styles["b2b2c-difference__card"]}>
          <div className={styles["b2b2c-difference__card-body"]}>
            <Divider className={styles["b2b2c-difference__divider"]} />
            <div className={styles["b2b2c-difference__content"]}>
              <div className={styles["b2b2c-difference__header"]}>
                {subtitle && <p className={styles["b2b2c-difference__subtitle"]}>{subtitle}</p>}
                {title && <h2 className={styles["b2b2c-difference__title"]}>{title}</h2>}
              </div>

              {bcstats && bcstats.length > 0 && (
                <div className={styles["b2b2c-difference__stats"]}>
                  {bcstats.map((stat, i) => (
                    <div
                      key={i}
                      className={`${styles["b2b2c-difference__stat"]} ${i === 0 ? styles["b2b2c-difference__stat--retail"] : styles["b2b2c-difference__stat--b2b2c"]}`}
                    >
                      <p className={styles["b2b2c-difference__stat-label"]}>{stat?.subtitle}</p>
                      <p className={styles["b2b2c-difference__stat-value"]}>{stat?.stat}</p>
                      <p className={styles["b2b2c-difference__stat-description"]}>{stat?.copy}</p>
                    </div>
                  ))}
                </div>
              )}

              {callToAction?.url && (
                <Button href={callToAction.url} target={callToAction.target ?? "_self"} variant="primary" colour="dark">
                  {callToAction.title ?? "Talk to Us"}
                </Button>
              )}
            </div>
          </div>
          <div className={styles["b2b2c-difference__underline"]} />
        </div>
      </Container>
    </section>
  );
};

export default B2b2cDifference;
