import parse from "html-react-parser";
import { MediaItem, PagePanelsPagePanelsThankYouHeaderLayout } from "@/types/graphql";
import Container from "../../Container";
import Button from "../../Button";
import ImageWithTexture from "../../ImageWithTexture/Index";
import styles from "./ThankYouHeader.module.scss";

export const THANK_YOU_HEADER_FRAGMENT = `
    copy
    title
    callToAction {
      ...AcfLinkFragment
    }
    images {
      edges {
        ...AcfMediaItem
      }
    }
`;

interface ThankYouHeaderProps {
  panel: PagePanelsPagePanelsThankYouHeaderLayout;
}

const ThankYouHeader: React.FC<ThankYouHeaderProps> = ({ panel }) => {
  const { copy, title, callToAction, images } = panel;

  const imageList = images?.edges?.map((edge) => edge.node) as MediaItem[] | undefined;

  return (
    <section className={styles["thank-you-header"]}>
      <Container className={styles["thank-you-header__container"]}>
        <div className={styles["thank-you-header__content"]}>
          <svg
            className={styles["thank-you-header__icon"]}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28 60C12.56 60 0 47.44 0 32C0 16.56 12.56 4 28 4C43.44 4 56 16.56 56 32C56 47.44 43.44 60 28 60ZM28 8C14.7597 8 4 18.7597 4 32C4 45.2403 14.7597 56 28 56C41.2403 56 52 45.2403 52 32C52 18.7597 41.2403 8 28 8ZM27.56 43.2397L43.56 23.2397C44.24 22.3797 44.1 21.1197 43.24 20.4197C42.38 19.7197 41.12 19.8797 40.42 20.7397L25.5202 39.3797L17.0204 34.2797C16.0803 33.7197 14.8404 34.0197 14.2804 34.9597C13.7204 35.8997 14.0204 37.1397 14.9604 37.6997L24.9604 43.6997C25.2804 43.8997 25.6404 43.9797 25.9804 43.9797C26.5804 43.9797 27.1605 43.7197 27.5404 43.2197L27.56 43.2397Z"
              fill="#00D180"
            />
          </svg>

          <div className={styles["thank-you-header__text"]}>
            {title && <h1 className={styles["thank-you-header__title"]}>{title}</h1>}
            {copy && <div className={styles["thank-you-header__copy"]}>{parse(copy)}</div>}
          </div>

          {callToAction?.url && callToAction?.title && (
            <Button href={callToAction.url} target={callToAction.target ?? "_self"} variant="primary" colour="dark">
              {callToAction.title}
            </Button>
          )}
        </div>

        {imageList && imageList.length > 0 && (
          <div className={styles["thank-you-header__images"]}>
            {imageList.map((image, index) => (
              <div key={index} className={styles["thank-you-header__image-frame"]}>
                <ImageWithTexture variant="frame" image={image} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ThankYouHeader;
