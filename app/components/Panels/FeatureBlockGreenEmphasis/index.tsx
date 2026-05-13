import globe from "@/public/assets/glob.gif";

import Image from "next/image";
import Container from "../../Container";
import Button from "../../Button";
import ScrollTriggerWrapper from "../../ScrollTriggerWrapper";

import styles from "./FeatureBlock.module.scss";

import Globe from "./GlobeClient";
import { PagePanelsPagePanelsFeatureBlockGreenEmphasisLayout } from "@/types/graphql";

import parse from "html-react-parser";
import Divider from "../../Divider";

export const FEATURE_BLOCK_GREEN_EMPHASIS_FRAGMENT = `
  copy
  title
  callToAction {
    ...AcfLinkFragment
  }
`;

export interface FeatureBlockProps {
  panel: PagePanelsPagePanelsFeatureBlockGreenEmphasisLayout;
}

const FeatureBlockGreenEmphasis: React.FC<FeatureBlockProps> = ({ panel }) => {
  const { copy, title, callToAction } = panel || {};

  return (
    <ScrollTriggerWrapper
      as="section"
      className={styles["feature-block"]}
      triggerClassName={styles["feature-block--triggered"]}
    >
      <Container flush className={styles["feature-block__container"]}>
        <div className={styles["feature-block__image"]}>
          <Globe
            className={styles["feature-block__globe-mobile"]}
            primaryColor="#00D180"
            neutralColor="#00D180"
            globeColor="#007A4E"
            showAtmosphere={false}
            globeOpacity={0.5}
          />
          <Globe
            className={styles["feature-block__globe-desktop"]}
            primaryColor="#00D180"
            neutralColor="#00D180"
            globeColor="#007A4E"
            showAtmosphere={false}
            globeOpacity={0.5}
            width={950}
            height={870}
          />
        </div>
        <div className={styles["feature-block__content"]}>
          <Divider colour="foundation-green" />
          <div className={styles["feature-block__text"]}>
            {title && <h2 className={styles["feature-block__title"]}>{title}</h2>}
            <div className={styles["feature-block__description"]}>{parse(copy || "")}</div>
            {callToAction && (
              <Button href={callToAction.url ?? ""} variant="text">
                {callToAction.title}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </ScrollTriggerWrapper>
  );
};

export default FeatureBlockGreenEmphasis;
