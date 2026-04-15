import Container from "@/app/components/Container";

import styles from "./FullwidthImage.module.scss";
import { PagePanelsPagePanelsBlocksFullWidthImageLayout } from "@/types/graphql";
import ImageComponent from "@/app/components/ImageComponent";

import parse from "html-react-parser";

interface FullWidthImageProps {
  panel: PagePanelsPagePanelsBlocksFullWidthImageLayout;
}

const FullWidthImage: React.FC<FullWidthImageProps> = ({ panel }) => {
  const { image } = panel || {};

  if (!image || !image.node) {
    return null;
  }

  return (
    <Container flush className={styles["image"]}>
      <figure className={styles["image__figure"]}>
        <ImageComponent image={image?.node} />
        {image?.node?.caption && (
          <figcaption className={styles["image__caption"]}>{parse(image?.node?.caption || "")}</figcaption>
        )}
      </figure>
    </Container>
  );
};

export default FullWidthImage;
