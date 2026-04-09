import Container from "../../Container";

import image from "@/public/assets/image.png";

import Image from "next/image";
import TextRevealHeading from "../../TextRevealHeading";
import Button from "../../Button";

import styles from "./FeatureBlock.module.scss";
import { ClassName } from "@fridayagency/classnames";
import ImageWithTexture from "../../ImageWithTexture/Index";
import Devider from "../../Divider";
import { PagePanelsPagePanelsFeatureBlockLayout } from "@/types/graphql";

import parse from "html-react-parser";
import { sub } from "date-fns";

export const FEATURE_BLOCK_FRAGMENT = `

          background
          text
          subtitle
          title
          image {
            ...AcfMediaItem
          }
          callToAction {
            ...AcfLinkFragment
          }
          imagePosition

`;

interface FeatureBlockProps {
  panel: PagePanelsPagePanelsFeatureBlockLayout;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ panel }) => {
  const { background, text, title, image, callToAction, imagePosition, subtitle } = panel || {};

  const sectionClass = new ClassName([styles["feature-block"], styles[imagePosition ?? "right"]]);

  if (background === "dark") {
    sectionClass.add(styles["feature-block--dark"]);
  }

  if (!image) {
    sectionClass.add(styles["feature-block--no-image"]);
  }

  return (
    <section className={sectionClass.toString()}>
      <Container className={styles["feature-block__container"]}>
        {image && image?.node && (
          <div className={styles["feature-block__image"]}>
            <ImageWithTexture image={image.node} variant="frame" />
          </div>
        )}
        <div className={styles["feature-block__content"]}>
          <Devider />
          <div className={styles["feature-block__text"]}>
            <div className={styles["feature-block__heading"]}>
              {subtitle && <p className={styles["feature-block__subtitle"]}>{subtitle}</p>}
              {title && (
                <TextRevealHeading blockColour="#00D180">
                  <h2 className={styles["feature-block__title"]}>{title}</h2>
                </TextRevealHeading>
              )}
            </div>
            <div className={styles["feature-block__description"]}>{text && parse(text)}</div>

            <Button variant="text" colour={background === "dark" ? "light" : "dark"}>
              Read More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureBlock;
