import { PagePanelsPagePanelsTextAndImagePanelLayout } from "@/types/graphql";
import Container from "../../Container";
import parse from "html-react-parser";
import ImageComponent from "../../ImageComponent";

import styles from "./TextAndImagePanel.module.scss";
import Button from "../../Button";
import { ClassName } from "@fridayagency/classnames";

export const TEXTANDIMAGEPANEL_FRAGMENT = `
  copy
  callToAction {
    ...AcfLinkFragment
  }
  image {
    ...AcfMediaItem
  }
  imagePosition
`;

const generateClassName = (base: string, modifier?: string) => {
  const className = new ClassName(base);
  if (modifier) {
    className.add(modifier);
  }
  return className.toString();
};

const TextAndImagePanel: React.FC<{ panel: PagePanelsPagePanelsTextAndImagePanelLayout }> = ({ panel }) => {
  const { copy, callToAction, image, imagePosition } = panel;

  console.log("Rendering TextAndImagePanel with imagePosition:", imagePosition);

  const imageClass = generateClassName(
    styles["text-and-image__image"],
    imagePosition?.toLowerCase() === "right" ? styles.reverse : undefined,
  );

  const contentClass = generateClassName(
    styles["text-and-image__content"],
    imagePosition?.toLowerCase() === "right" ? styles.reverse : undefined,
  );

  return (
    <section className={styles["text-and-image"]}>
      <Container grid className={styles["text-and-image__container"]}>
        {image?.node && (
          <div className={imageClass}>
            <ImageComponent image={image.node} />
          </div>
        )}
        <div className={contentClass}>
          {copy && <div className={styles["text-and-image__copy"]}>{parse(copy)}</div>}
          {callToAction?.url && callToAction?.title && (
            <Button colour="blue" href={callToAction.url}>
              {callToAction.title}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default TextAndImagePanel;
