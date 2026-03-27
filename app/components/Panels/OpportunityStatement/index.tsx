import Button from "../../Button";
import Container from "../../Container";
import ScrollTriggerWrapper from "../../ScrollTriggerWrapper";

import styles from "./OpportunityStatement.module.scss";

export interface OpportunityStatementProps {}

const OpportunityStatement: React.FC<OpportunityStatementProps> = () => {
  return (
    <section className={styles["opportunity-statement"]}>
      <Container>
        <div className={styles["opportunity-statement__container"]}>
          <div className={styles["opportunity-statement__divider"]}></div>
          <div className={styles["opportunity-statement__text"]}>
            <p className={styles["opportunity-statement__subtitle"]}>Cross Border E-Comnmerce</p>
            <h2 className={styles["opportunity-statement__title"]}>
              Global cross-border e-commerce now exceeds 
              <ScrollTriggerWrapper
                as="span"
                from={{ background: "transparent", color: "inherit" }}
                to={{
                  background: "#00D180",
                  color: " #1E2221",
                }}
                duration={0.75}
              >
                $1 trillion annually
              </ScrollTriggerWrapper>
               and continues to grow faster than domestic e-commerce!{" "}
            </h2>
            <p className={styles["opportunity-statement__description"]}>
              International performance is a defining driver of long-term growth.
            </p>
          </div>
          <Button variant="text" colour="light">
            Read More
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default OpportunityStatement;
