import Container from "../../Container";

import styles from "./Faqs.module.scss";

interface FaqsProps {}

const Faqs: React.FC<FaqsProps> = () => {
  return (
    <section className={styles["faqs"]}>
      <Container className={styles["faqs__container"]}>
        <div className={styles["faqs__content"]}>
          <h2 className={styles["faqs__title"]}>Common Questions</h2>
          <ul className={styles["faqs__list"]}>
            <li className={styles["faqs__item"]}>
              <a className={styles["faqs__link"]}>How does it integrate with our existing ecommerce platform? </a>
            </li>
            <li className={styles["faqs__item"]}>
              <a className={styles["faqs__link"]}>How does it integrate with our existing ecommerce platform?</a>
            </li>
            <li className={styles["faqs__item"]}>
              <a className={styles["faqs__link"]}>How does it integrate with our existing ecommerce platform?</a>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default Faqs;
