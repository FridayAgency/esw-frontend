import Container from "../../Container";

import ck from "@/public/assets/ck.png";

import styles from "./Testimonial.module.scss";

interface TestimonialProps {}

const Testimonial: React.FC<TestimonialProps> = () => {
  return (
    <section className={styles["testimonial"]}>
      <Container className={styles["testimonial__container"]}>
        <div className={styles["testimonial__logo"]}></div>

        <div className={styles["testimonial__content"]}>
          <div className={styles["testimonial__text"]}>
            <p>ESW helped us expand internationally while protecting the brand experience our customers expect.</p>
            <p>
              Their localisation and checkout products let us launch new markets faster with full control of pricing and
              payments.
            </p>
          </div>

          <div className={styles["testimonial__author"]}>
            <div className={styles["testimonial__author-image"]}></div>
            <p>VP Ecommerce, Calvin Klein</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
