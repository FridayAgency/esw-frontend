import { Industry, PagePanelsPagePanelsIndustryCardsLayout, RootQueryToIndustryConnection } from "@/types/graphql";
import Container from "../../Container";
import IndustryCard from "../../IndustryCard";

import styles from "./Industries.module.scss";
import { removeNodes } from "@fridayagency/utils";

export const INDUSTYCARDS_FRAGMENT = `

          industries {
            edges {
              node {
                ... on Industry {
                  id
                  title
                  uri
                  slug
                  industryCardDetails {
                    icon
                    cardStats {
                      stat
                    }
                  }
                  databaseId
                }
              }
            }
          }

`;

interface IndustryCardsProps {
  panel: PagePanelsPagePanelsIndustryCardsLayout;
}

const IndustryCards: React.FC<IndustryCardsProps> = ({ panel }) => {
  const { industries } = panel || {};

  const industriesList = industries ? removeNodes<Industry>(industries as RootQueryToIndustryConnection) : [];

  return (
    <section className={styles["industries"]}>
      <Container className={styles["industries__container"]}>
        <ul className={styles["industries__list"]}>
          {industriesList.map((industry) => (
            <li key={industry.databaseId}>
              <IndustryCard industry={industry} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default IndustryCards;
