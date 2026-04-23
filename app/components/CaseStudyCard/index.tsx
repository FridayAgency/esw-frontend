import Link from "next/link";

import styles from "./CaseStudyCard.module.scss";
import { CaseStudy } from "@/types/graphql";
import ImageComponent from "../ImageComponent";
import Icon from "../Icon";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  fullwidth?: boolean;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, fullwidth }) => {
  const { title, caseStudyCard, uri } = caseStudy;
  return (
    <Link className={`${styles["case-study"]} ${fullwidth ? styles["case-study--fullwidth"] : ""}`} href={uri ?? "#"}>
      {caseStudyCard?.logo && (
        <div className={styles["case-study__image"]}>
          <ImageComponent image={caseStudyCard?.logo?.node} />
        </div>
      )}
      <div className={styles["case-study__content"]}>
        <div className={styles["case-study__copy"]}>
          <h3 className={styles["case-study__title"]}>{title}</h3>
          <p className={styles["case-study__description"]}>{caseStudyCard?.cardCopy}</p>
        </div>

        <div className={styles["case-study__read-more"]}>
          <Icon type="arrowRight" />
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
