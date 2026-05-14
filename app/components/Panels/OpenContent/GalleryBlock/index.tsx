import Carousel from "@/app/components/Carousel";
import Container from "@/app/components/Container";
import ImageComponent from "@/app/components/ImageComponent";
import { MediaItem, PagePanelsPagePanelsBlocksGalleryLayout } from "@/types/graphql";

import parse from "html-react-parser";

import styles from "./GalleryBlock.module.scss";

interface GalleryBlockProps {
  panel: PagePanelsPagePanelsBlocksGalleryLayout;
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({ panel }) => {
  const images = panel?.images?.edges || [];

  return (
    <Container className={styles["image"]}>
      <div className={styles["image__container"]}>
        <Carousel className={styles["image__carousel"]} dark loop={false} centerArrows>
          {images.map((image, index) => {
            const node = image?.node as MediaItem | undefined;
            return (
              <div key={index}>
                <figure className={styles["image__figure"]}>
                  <ImageComponent image={node} />
                  {node?.caption && (
                    <figcaption suppressHydrationWarning className={styles["image__caption"]}>
                      {parse(node?.caption || "")}
                    </figcaption>
                  )}
                </figure>
              </div>
            );
          })}
        </Carousel>
      </div>
    </Container>
  );
};

export default GalleryBlock;
