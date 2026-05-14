import { MediaItem, PagePanelsPagePanelsCallToActionWithImagesLayout } from "@/types/graphql";
import parse from "html-react-parser";
import Button from "../../Button";
import Container from "../../Container";
import Divider from "../../Divider";
import ImageComponent from "../../ImageComponent";

import styles from "./CallToActionWithImages.module.scss";
import ImageWithTexture from "../../ImageWithTexture/Index";

export const CALL_TO_ACTION_WITH_IMAGES_FRAGMENT = `
          copy
          title
          subtitle
          images {
            edges {
              ...AcfMediaItem
            }
          }
          callToAction {
            ...AcfLinkFragment
          }
`;

interface CallToActionWithImagesProps {
  panel: PagePanelsPagePanelsCallToActionWithImagesLayout;
}

const CallToActionWithImages: React.FC<CallToActionWithImagesProps> = ({ panel }) => {
  const { title, subtitle, copy, images, callToAction } = panel;

  const imageList = images?.edges?.map((edge) => edge.node) as MediaItem[] | undefined;

  return (
    <section className={styles["cta-with-images"]}>
      <Container>
        <div className={styles["cta-with-images__card"]}>
          <div className={styles["cta-with-images__inner"]}>
            <div className={styles["cta-with-images__content"]}>
              <Divider colour="signal-green" />
              <div className={styles["cta-with-images__text"]}>
                <div className={styles["cta-with-images__header"]}>
                  {subtitle && <p className={styles["cta-with-images__subtitle"]}>{subtitle}</p>}
                  {title && <h2 className={styles["cta-with-images__title"]}>{title}</h2>}
                </div>
                {copy && (
                  <div suppressHydrationWarning className={styles["cta-with-images__copy"]}>
                    {parse(copy)}
                  </div>
                )}
                {callToAction?.url && callToAction?.title && (
                  <div className={styles["cta-with-images__button"]}>
                    <Button
                      href={callToAction.url}
                      target={callToAction.target ?? "_self"}
                      variant="primary"
                      colour="dark"
                    >
                      {callToAction.title}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {imageList && imageList.length > 0 && (
              <div className={styles["cta-with-images__images"]}>
                {imageList.map((image, index) => (
                  <div key={index} className={styles["cta-with-images__image-frame"]}>
                    <ImageWithTexture variant="frame" image={image} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CallToActionWithImages;
