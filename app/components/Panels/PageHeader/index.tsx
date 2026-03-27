import { PagePanelsPagePanelsPageHeaderLayout } from "@/types/graphql";
import Container from "../../Container";
import Button from "../../Button";
import ImageComponent from "../../ImageComponent";

import parse from "html-react-parser";

import styles from "./PageHeader.module.scss";

export const PAGEHEADER_FRAGMENT = `
    copy
    title
    image {
        ...AcfMediaItem
    }
    link {
        ...AcfLinkFragment
    }
`;

const PageHeader: React.FC<{ panel: PagePanelsPagePanelsPageHeaderLayout }> = ({ panel }) => {
  const { title, copy, image, link } = panel;

  // Early return if no content
  if (!title && !copy && !image) return null;

  return (
    <section className={styles["page-header"]}>
      <Container grid className={styles["page-header__container"]}>
        <div className={styles["page-header__image"]}>
          <ImageComponent image={image?.node} />
        </div>
        <div className={styles["page-header__content"]}>
          <div className={styles["page-header__text"]}>
            {title && <h1>{title}</h1>}
            {copy && <div className={styles["page-header__copy"]}>{parse(copy)}</div>}
          </div>
          {link?.url && (
            <div className={styles["page-header__link"]}>
              <Button href={link.url} target={link.target || undefined}>
                {link.title}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PageHeader;
