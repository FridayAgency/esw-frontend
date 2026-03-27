import Button from "../../Button";
import Container from "../../Container";

import styles from "./HeroHeaderSimple.module.scss";

interface HeroHeaderSimpleProps {}

const HeroHeaderSimple: React.FC<HeroHeaderSimpleProps> = () => {
  return (
    <section className={styles["header"]}>
      <div className={styles["header__background"]}></div>
      <Container className={styles["header__container"]}>
        <div className={styles["header__image"]}></div>
        <div className={styles["header__content"]}>
          <h1>Global Checkout</h1>
          <p>The Platform Behind Successful Global Ecommerce.</p>
          <Button>Loriem ipsum</Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroHeaderSimple;
