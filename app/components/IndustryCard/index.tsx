import Link from "next/link";
import Icon from "../Icon";

import styles from "./IndustryCard.module.scss";
import { Industry } from "@/types/graphql";

interface IndustryCardProps {
  industry: Industry;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ industry }) => {
  const { title, industryCardDetails, uri } = industry;

  return (
    <Link className={styles["industry"]} href={uri || "#"}>
      {industryCardDetails?.icon && (
        <div className={styles["industry__icon"]}>
          <Icon type={industry.industryCardDetails?.icon as any} />
        </div>
      )}

      <div className={styles["industry__content"]}>
        {title && <h3 className={styles["industry__title"]}>{title}</h3>}
        {industryCardDetails?.cardStats && (
          <ul className={styles["industry__list"]}>
            {industry.industryCardDetails?.cardStats?.map((stat, index) => (
              <li key={index} className={styles["industry__list-item"]}>
                {stat?.stat}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles["industry__arrow"]}>
        <Icon type="arrowRight" />
      </div>
    </Link>
  );
};

export default IndustryCard;
