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
      {featuredImage ? (
        <div className={styles["integration__image"]}>
          <ImageComponent image={featuredImage.node} />
        </div>
      ) : (
        <div className={styles["integration__image"]}>
          <svg width="125" height="126" viewBox="0 0 125 126" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M52.9035 35H37.2335C35.5035 35 34.1035 36.4 34.1035 38.13V60.06C34.1035 61.79 35.5035 63.19 37.2335 63.19H52.9035C54.6335 63.19 56.0335 61.79 56.0335 60.06V38.13C56.0335 36.4 54.6335 35 52.9035 35Z"
              stroke="#BECCC5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M87.364 34.9991H71.6939C69.9639 34.9991 68.5639 36.3991 68.5639 38.1291C69.1939 40.8991 66.5239 50.859 71.6939 50.659H87.364C89.094 50.659 90.494 49.2591 90.494 47.5291C89.864 44.7591 92.534 34.7991 87.364 34.9991Z"
              stroke="#BECCC5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M87.3645 63.1914H71.6945C69.9645 63.1914 68.5645 64.5914 68.5645 66.3214V88.2514C68.5645 89.9814 69.9645 91.3814 71.6945 91.3814H87.3645C89.0945 91.3814 90.4945 89.9814 90.4945 88.2514V66.3214C90.4945 64.5914 89.0945 63.1914 87.3645 63.1914Z"
              stroke="#BECCC5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M52.903 75.7217H37.233C35.503 75.7217 34.103 77.1217 34.103 78.8517C34.733 81.6217 32.063 91.5818 37.233 91.3818H52.903C54.633 91.3818 56.033 89.9817 56.033 88.2517C55.403 85.4817 58.073 75.5217 52.903 75.7217Z"
              stroke="#BECCC5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M55.9433 44.0006C61.1333 43.9206 61.1333 52.0806 55.9433 52.0006C50.7533 52.0806 50.7533 43.9206 55.9433 44.0006Z"
              fill="#8F9A95"
              stroke="#BECCC5"
              strokeWidth="3"
            />
          </svg>
        </div>
      )}
      <div className={styles["integration__content"]}>
        <div className={styles["integration__text"]}>
          <h3 className={styles["integration__title"]}>{title}</h3>
          <p className={styles["integration__description"]}>{integrationContent?.integrationContent}</p>
        </div>
        {/* <Icon type="arrowRight" /> */}
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
