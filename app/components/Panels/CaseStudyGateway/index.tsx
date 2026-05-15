import { CaseStudy, PagePanelsPagePanelsCaseStudyGatewayLayout, RootQueryToCaseStudyConnection } from "@/types/graphql";
import Button from "../../Button";
import Carousel from "../../Carousel";
import CaseStudyCard from "../../CaseStudyCard";
import Container from "../../Container";

import styles from "./CaseStudyGateway.module.scss";
import { removeNodes } from "@fridayagency/utils";

export const CASE_STUDY_GATEWAY_FRAGMENT = `
    ... on PagePanelsPagePanelsCaseStudyGatewayLayout {
          title
          caseStudies{
            edges{
              node{
                      ... on CaseStudy {
                  id
                  title
                  uri
                  databaseId
                  caseStudyCard {
                    cardCopy
                    logo {
                      ...AcfMediaItem
                    }
                  }
                }
              }
            }
          }
        }
`;

interface CaseStudyGatewayProps {
  panel: PagePanelsPagePanelsCaseStudyGatewayLayout;
}

const CaseStudyGateway: React.FC<CaseStudyGatewayProps> = ({ panel }) => {
  const { title, caseStudies } = panel || {};

  const caseStudyList = caseStudies ? removeNodes<CaseStudy>(caseStudies as RootQueryToCaseStudyConnection) : [];

  return (
    <section className={styles["case-study-gateway"]}>
      <Container flush className={styles["case-study-gateway__container"]}>
        <div className={styles["case-study-gateway__header"]}>
          {title && (
            <h2 suppressHydrationWarning className={styles["case-study-gateway__title"]}>
              {title}
            </h2>
          )}
          <div className={styles["case-study-gateway__cta-desktop"]}>
            <Button href="/customer-success-stories/" variant="text" colour="dark">
              Read All
            </Button>
          </div>
        </div>

        {/* TODO : ADD case studies mapping */}
        {caseStudyList && caseStudyList.length > 0 && (
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
              {caseStudyList.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.databaseId} caseStudy={caseStudy} />
              ))}
            </Carousel>
          </div>
        )}

        <div className={styles["case-study-gateway__cta-mobile"]}>
          <Button href="/customer-success-stories/" variant="text" colour="light">
            Read All
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CaseStudyGateway;
