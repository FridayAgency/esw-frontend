import Link from "next/link";

import styles from "./CaseStudyCard.module.scss";

const CaseStudyCard = () => {
  return (
    <Link className={styles["case-study"]} href="#">
      <div className={styles["case-study__image"]}></div>
      <div className={styles["case-study__content"]}>
        <h3 className={styles["case-study__title"]}>Charlotte Tilbury</h3>
        <p className={styles["case-study__description"]}>
          How Charlotte Tilbury turned International Complexity into a Growth Advantage
        </p>

        <div className={styles["case-study__read-more"]}>
          <span className={styles["ellipse"]}></span>
          <span>Read More</span>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
