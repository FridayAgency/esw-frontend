import Link from "next/link";
import Icon from "../Icon";

import styles from "./Integration.module.scss";
import { Integration } from "@/types/graphql";
import ImageComponent from "../ImageComponent";

interface IntegrationCardProps {
  integration: Integration;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration }) => {
  const { title, featuredImage, integrationContent } = integration;

  const inner = (
    <>
      {featuredImage && (
        <div className={styles["integration__image"]}>
          <ImageComponent image={featuredImage.node} />
        </div>
      )}
      <div className={styles["integration__content"]}>
        <div className={styles["integration__text"]}>
          <h3 className={styles["integration__title"]}>{title}</h3>
          <p className={styles["integration__description"]}>{integrationContent?.integrationContent}</p>
        </div>
        <Icon type="arrowRight" />
      </div>
    </>
  );

  if (integrationContent?.integrationUrl) {
    return (
      <Link className={styles["integration"]} href={integrationContent.integrationUrl}>
        {inner}
      </Link>
    );
  }

  return <div className={styles["integration"]}>{inner}</div>;
};

export default IntegrationCard;
