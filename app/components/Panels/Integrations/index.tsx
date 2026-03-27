import Container from "../../Container";
import IntegrationCard from "../../IntegrationCard";

import styles from "./Integrations.module.scss";

interface IntegrationsProps {}

const Integrations: React.FC<IntegrationsProps> = () => {
  return (
    <section className={styles["integrations"]}>
      <Container className={styles["integrations__container"]}>
        <ul className={styles["integrations__list"]}>
          <li>
            <IntegrationCard />
          </li>
          <li>
            <IntegrationCard />
          </li>
          <li>
            <IntegrationCard />
          </li>
          <li>
            <IntegrationCard />
          </li>
          <li>
            <IntegrationCard />
          </li>
          <li>
            <IntegrationCard />
          </li>
          <li>
            <IntegrationCard />
          </li>
          <li>
            <IntegrationCard />
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default Integrations;
