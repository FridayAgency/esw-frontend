import Container from "../../Container";

import image from "@/public/assets/image.png";

import Image from "next/image";
import TextRevealHeading from "../../TextRevealHeading";
import Button from "../../Button";

import styles from "./FeatureBlock.module.scss";
import { ClassName } from "@fridayagency/classnames";
import ImageWithTexture from "../../ImageWithTexture/Index";
import Devider from "../../Divider";

interface FeatureBlockProps {
  dark?: boolean;
  imagePosition?: "left" | "right";
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ dark, imagePosition = "right" }) => {
  const sectionClass = new ClassName([styles["feature-block"], styles[imagePosition]]);

  if (dark) {
    sectionClass.add(styles["feature-block--dark"]);
  }

  console.log(dark);

  return (
    <section className={sectionClass.toString()}>
      <Container className={styles["feature-block__container"]}>
        <div className={styles["feature-block__image"]}>
          <ImageWithTexture />
        </div>
        <div className={styles["feature-block__content"]}>
          <Devider />
          <div className={styles["feature-block__text"]}>
            <div className={styles["feature-block__heading"]}>
              <p className={styles["feature-block__subtitle"]}> Why ESW?</p>
              <TextRevealHeading blockColour="#00D180">
                <h2 className={styles["feature-block__title"]}>Because We’ve Done this Before. </h2>
              </TextRevealHeading>
            </div>
            <div className={styles["feature-block__description"]}>
              <p>
                <strong>At Scale, in Real Markets, with Real Revenue on the Line.</strong>
              </p>
              <p>
                At scale, payments, compliance, localisation, logistics and customer experience do
                not operate independently. They interact.
              </p>
              <p>
                ESW has built the expertise to navigate these interactions, and the relationships to make them work.
                When you choose ESW, you’re not just choosing a provider, you’re choosing a partner with a proven track
                record of success.
              </p>
              <p>ESW becomes your partner in these critical choices.</p>
            </div>

            <Button variant="text" colour={dark ? "light" : "dark"}>
              Read More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeatureBlock;
