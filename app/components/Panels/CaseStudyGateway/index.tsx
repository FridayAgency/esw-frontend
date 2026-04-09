import { PagePanelsPagePanelsCaseStudyGatewayLayout } from "@/types/graphql";
import Button from "../../Button";
import Carousel from "../../Carousel";
import CaseStudyCard from "../../CaseStudyCard";
import Container from "../../Container";

import styles from "./CaseStudyGateway.module.scss";

export const CASE_STUDY_GATEWAY_FRAGMENT = `
    ... on PagePanelsPagePanelsCaseStudyGatewayLayout {
          title
        }
`;

interface CaseStudyGatewayProps {
  panel: PagePanelsPagePanelsCaseStudyGatewayLayout;
}

const CaseStudyGateway: React.FC<CaseStudyGatewayProps> = ({ panel }) => {
  const { title } = panel || {};

  return (
    <section className={styles["case-study-gateway"]}>
      <Container flush className={styles["case-study-gateway__container"]}>
        <div className={styles["case-study-gateway__header"]}>
          {title && <h2 className={styles["case-study-gateway__title"]}>{title}</h2>}
          <div className={styles["case-study-gateway__cta-desktop"]}>
            <Button variant="text">Read All</Button>
          </div>
        </div>

        {/* TODO : ADD case studies mapping */}
        <div>
          <Carousel
            className={styles["case-study-gateway__carousel"]}
            gap={16}
            slidesVisible="auto"
            showArrows
            showDots
            disableAt={1024}
            peekInset={16}
          >
            <CaseStudyCard />
            <CaseStudyCard />
            <CaseStudyCard />
          </Carousel>
        </div>

        <div className={styles["case-study-gateway__cta-mobile"]}>
          <Button variant="text" colour="light">
            Read All
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CaseStudyGateway;
