import Container from "../../Container";
import IndustryCard from "../../IndustryCard";

import styles from "./Industries.module.scss";

interface IndustriesProps {}

const Industries: React.FC<IndustriesProps> = () => {
  return (
    <section className={styles["industries"]}>
      <Container className={styles["industries__container"]}>
        <ul className={styles["industries__list"]}>
          <li>
            <IndustryCard />
          </li>
          <li>
            <IndustryCard />
          </li>
          <li>
            <IndustryCard />
          </li>
          <li>
            <IndustryCard />
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default Industries;
