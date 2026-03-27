import Link from "next/link";
import Icon from "../Icon";

import styles from "./Integration.module.scss";

interface IntegrationCardProps {}

const IntegrationCard: React.FC<IntegrationCardProps> = () => {
  return (
    <Link className={styles["integration"]} href="#">
      <div className={styles["integration__image"]}></div>
      <div className={styles["integration__content"]}>
        <div className={styles["integration__text"]}>
          <h3 className={styles["integration__title"]}>Adobe Commerce</h3>
          <p className={styles["integration__description"]}>
            Adobe Commerce integration for seamless global ecommerce expansion.
          </p>
        </div>
        <Icon type="arrowRight" />
      </div>
    </Link>
  );
};

export default IntegrationCard;
