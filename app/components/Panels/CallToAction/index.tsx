import Button from "../../Button";
import Container from "../../Container";

import styles from "./CallToAction.module.scss";

interface CallToActionProps {
  // Define any props for the CallToAction component here
}

const CallToAction: React.FC<CallToActionProps> = () => {
  return (
    <section className={styles["cta"]}>
      <Container className={styles["cta__container"]}>
        <div className={styles["cta__content"]}>
          <div className={styles["cta__texture"]}></div>
          <div className={styles["cta__text"]}>
            <div className={styles["cta__header"]}>
              <p className={styles["cta__subtitle"]}>TALK TO AN EXPERT</p>
              <h2 className={styles["cta__title"]}>Talk to us About Your Expansion Priorities.</h2>
            </div>
            <div className={styles["cta__button"]}>
              <Button variant="outline" colour="light">
                Talk To Us
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallToAction;
