import Container from "@/app/components/Container";

import styles from "./FullwidthImage.module.scss";
import {
  MediaItem,
  PagePanelsPagePanelsBlocksFullWidthImageLayout,
  PostfieldsOpenContentFullWidthImageLayout,
} from "@/types/graphql";
import ImageComponent from "@/app/components/ImageComponent";

import parse from "html-react-parser";

interface FullWidthImageProps {
  panel?: PagePanelsPagePanelsBlocksFullWidthImageLayout | PostfieldsOpenContentFullWidthImageLayout;
  image?: any;
}

const FullWidthImage: React.FC<FullWidthImageProps> = ({ panel, image: propImage }) => {
  const { image: panelImage } = panel || {};
  const image = propImage || panelImage;

  if (!image || !image.node) {
    return null;
  }

  return (
    <Container flush className={styles["image"]}>
      <figure className={styles["image__figure"]}>
        <ImageComponent image={image?.node} />
        {image?.node?.caption && (
          <figcaption suppressHydrationWarning className={styles["image__caption"]}>
            {parse(image?.node?.caption || "")}
          </figcaption>
        )}
      </figure>
    </Container>
  );
};

export default FullWidthImage;
