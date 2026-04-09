import { PagePanelsPagePanelsHeroHeaderSimpleLayout } from "@/types/graphql";
import Button from "../../Button";
import Container from "../../Container";

import styles from "./HeroHeaderSimple.module.scss";
import ImageComponent from "../../ImageComponent";

export const HERO_HEADER_SIMPLE_FRAGMENT = `
  copy
  title
  callToAction {
    ...AcfLinkFragment
  }
  image {
    ...AcfMediaItem
  }
`;

interface HeroHeaderSimpleProps {
  panel: PagePanelsPagePanelsHeroHeaderSimpleLayout;
}

const HeroHeaderSimple: React.FC<HeroHeaderSimpleProps> = ({ panel }) => {
  const { title, copy, callToAction, image } = panel || {};

  return (
    <section className={styles["header"]}>
      <div className={styles["header__background"]}></div>
      <Container className={styles["header__container"]}>
        {image && (
          <div className={styles["header__image"]}>
            <ImageComponent image={image.node} />
          </div>
        )}
        <div className={styles["header__content"]}>
          {title && <h1>{title}</h1>}
          {copy && <p>{copy}</p>}
          {callToAction && <Button href={callToAction.url ?? ""}>{callToAction.title}</Button>}
        </div>
      </Container>
    </section>
  );
};

export default HeroHeaderSimple;
