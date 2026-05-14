import Container from "@/app/components/Container";
import Image from "next/image";
import image from "@/public/assets/ck.png";
import { ClassName } from "@fridayagency/classnames";

import parse from "html-react-parser";

import styles from "./Image50Text50.module.scss";
import {
  PagePanelsPagePanelsBlocksImage50Text50Layout,
  PostfieldsOpenContentImage50Text50Layout,
} from "@/types/graphql";
import ImageComponent from "@/app/components/ImageComponent/ImageComponent";

interface Image50Text50Props {
  panel: PagePanelsPagePanelsBlocksImage50Text50Layout | PostfieldsOpenContentImage50Text50Layout;
}

const Image50Text50: React.FC<Image50Text50Props> = ({ panel }) => {
  const { imagePosition, text, image } = panel || {};
  const containerClass = new ClassName(styles["image-50-text-50"])
    .add(imagePosition === "left" ? styles["image-left"] : styles["image-right"])
    .toString();

  return (
    <Container flush className={containerClass}>
      {image && image.node && (
        <figure className={styles["image-50-text-50__figure"]}>
          <ImageComponent image={image.node} />
          {image?.node?.caption && (
            <figcaption suppressHydrationWarning className={styles["image-50-text-50__caption"]}>
              {parse(image.node.caption)}
            </figcaption>
          )}
        </figure>
      )}

      {text && (
        <div suppressHydrationWarning className={styles["image-50-text-50__content"]}>
          {parse(text ?? "")}
        </div>
      )}
    </Container>
  );
};

export default Image50Text50;
