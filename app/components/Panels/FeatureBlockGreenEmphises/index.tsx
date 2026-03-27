import globe from "@/public/assets/glob.gif";

import Image from "next/image";
import Container from "../../Container";
import Button from "../../Button";
import ScrollTriggerWrapper from "../../ScrollTriggerWrapper";

import styles from "./FeatureBlock.module.scss";

export interface FeatureBlockProps {}

const FeatureBlockGreenEmphises: React.FC<FeatureBlockProps> = () => {
  return (
    <ScrollTriggerWrapper
      as="section"
      className={styles["feature-block"]}
      triggerClassName={styles["feature-block--triggered"]}
    >
      <Container flush className={styles["feature-block__container"]}>
        <div className={styles["feature-block__image"]}>
          <Image src={globe} alt="Globe" />
        </div>
        <div className={styles["feature-block__content"]}>
          <div className={`${styles["feature-block__texture"]} `}></div>
          <div className={styles["feature-block__text"]}>
            <p className={styles["feature-block__subtitle"]}>Global Commerce Technology Platform</p>
            <h2 className={styles["feature-block__title"]}>
              ESW is a Designed for Enterprise Brands Expanding Internationally. 
            </h2>
            <p className={styles["feature-block__description"]}>
              We bring structure, judgement and discipline to one of the most complex phases of growth. 
            </p>
            <Button variant="text">Read More</Button>
          </div>
        </div>
      </Container>
    </ScrollTriggerWrapper>
  );
};

export default FeatureBlockGreenEmphises;
