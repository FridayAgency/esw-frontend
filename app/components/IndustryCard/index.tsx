import Link from "next/link";
import Icon from "../Icon";

import styles from "./IndustryCard.module.scss";

interface IndustryCardProps {}

const IndustryCard: React.FC<IndustryCardProps> = () => {
  return (
    <Link className={styles["industry"]} href="#">
      <div className={styles["industry__icon"]}>
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M47.999 0.4375C111.421 1.50824 111.413 94.4974 48 95.5615C-15.4208 94.4898 -15.4122 1.5025 47.999 0.4375Z"
            fill="#1E2221"
            stroke="#00D180"
            strokeWidth="0.875"
          />
          <path
            d="M67.5167 38.6065H28.7789C25.3009 38.5227 26.5762 43.7569 26.3597 45.7684C26.3597 47.0865 27.4418 48.1531 28.7789 48.1531H67.5167C70.9947 48.2369 69.7195 43.0026 69.9359 40.9912C69.9359 39.6731 68.8538 38.6065 67.5167 38.6065Z"
            stroke="#00D180"
            strokeWidth="2.625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48.1465 38.6055V69.6378"
            stroke="#00D180"
            strokeWidth="2.625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M65.0958 48.1523C65.7605 77.5162 65.8841 68.0533 36.0424 69.638C33.4455 69.6914 31.15 67.4285 31.2041 64.8609V48.1523"
            stroke="#00D180"
            strokeWidth="2.625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M37.2565 38.6061C20.6701 34.3318 41.608 14.1337 48.1544 38.6061C54.7163 14.1184 75.6233 34.3546 59.0523 38.6061"
            stroke="#00D180"
            strokeWidth="2.625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48.2312 55.6176C52.2425 55.5567 52.2425 61.7738 48.2312 61.7129C44.2198 61.7738 44.2198 55.5567 48.2312 55.6176Z"
            fill="white"
            stroke="#00D180"
            strokeWidth="2.625"
          />
        </svg>
      </div>

      <div className={styles["industry__content"]}>
        <h3 className={styles["industry__title"]}>Retail</h3>
        <ul className={styles["industry__list"]}>
          <li>24% annual growth</li>
          <li>€2bn global ecommerce GMV</li>
        </ul>
      </div>
      <div className={styles["industry__arrow"]}>
        {" "}
        <Icon type="arrowRight" />
      </div>
    </Link>
  );
};

export default IndustryCard;
