import { PagePanelsPagePanelsHeroHeaderTwoImagesLayout, MediaItem } from "@/types/graphql";
import Button from "../../Button";
import Container from "../../Container";
import Breadcrumbs from "../../Breadcrumbs";

import styles from "./HeroHeaderTwoImages.module.scss";
import ImageComponent from "../../ImageComponent";
import ImageWithTexture from "../../ImageWithTexture/Index";

export const HERO_HEADER_TWO_IMAGES_FRAGMENT = `
          title
          copy
          image {
            edges {
              ...AcfMediaItem
            }
          }
            callToAction {
              ...AcfLinkFragment
            }
`;

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface HeroHeaderTwoImagesProps {
  panel: PagePanelsPagePanelsHeroHeaderTwoImagesLayout;
  showBreadcrumbs?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  readTime?: number;
}

const HeroHeaderTwoImages: React.FC<HeroHeaderTwoImagesProps> = ({ panel, showBreadcrumbs, breadcrumbs, readTime }) => {
  const { title, copy, callToAction, image } = panel || {};
  const images = (image?.edges.map((e) => e.node) ?? []) as MediaItem[];

  return (
    <>
      <section className={styles["header"]}>
        <div className={styles["header__background"]}></div>
        <Container className={styles["header__container"]}>
          {images.length > 0 && (
            <div className={styles["header__image"]}>
              {images.map((node, index) => (
                <ImageWithTexture variant="frame-no-padding" key={index} image={node} />
              ))}
            </div>
          )}
          <div className={styles["header__content"]}>
            {title && <h1>{title}</h1>}
            {copy && <p>{copy}</p>}
            {callToAction && <Button href={callToAction.url ?? ""}>{callToAction.title}</Button>}
          </div>
        </Container>
      </section>

      {showBreadcrumbs && breadcrumbs && <Breadcrumbs items={breadcrumbs} title={title ?? ""} readTime={readTime} />}
    </>
  );
};

export default HeroHeaderTwoImages;
