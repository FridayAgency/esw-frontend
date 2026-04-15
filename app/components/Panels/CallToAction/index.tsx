import { PagePanelsPagePanelsCallToActionLayout } from "@/types/graphql";
import Button from "../../Button";
import Container from "../../Container";

import styles from "./CallToAction.module.scss";
import { sub } from "date-fns";
import Divider from "../../Divider";

export const CALLTOACTION_FRAGMENT = `
    subtitle
    title
    callToAction {
     ...AcfLinkFragment
    }
`;

interface CallToActionProps {
  // Define any props for the CallToAction component here
  panel: PagePanelsPagePanelsCallToActionLayout;
}

const CallToAction: React.FC<CallToActionProps> = ({ panel }) => {
  const { title, subtitle, callToAction } = panel || {};
  return (
    <section className={styles["cta"]}>
      <Container className={styles["cta__container"]}>
        <div className={styles["cta__content"]}>
          <Divider className={styles["cta__divider"]} colour="white" />
          <div className={styles["cta__text"]}>
            <div className={styles["cta__header"]}>
              {subtitle && <p className={styles["cta__subtitle"]}>{subtitle}</p>}
              {title && <h2 className={styles["cta__title"]}>{title}</h2>}
            </div>
            <div className={styles["cta__button"]}>
              {callToAction?.url && callToAction?.title && (
                <Button
                  href={callToAction.url}
                  target={callToAction.target ?? "_self"}
                  variant="outline"
                  colour="light"
                >
                  {callToAction?.title || "Talk To Us"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;
