import {
  PagePanelsPagePanelsOpenContentLayout,
  PagePanelsPagePanelsBlocksTextPanelLayout,
  PagePanelsPagePanelsBlocksFullWidthImageLayout,
  PagePanelsPagePanelsBlocksImage50Text50Layout,
  PagePanelsPagePanelsBlocksQuoteLayout,
  PagePanelsPagePanelsBlocksDividerLayout,
  PagePanelsPagePanelsBlocksGalleryLayout,
} from "@/types/graphql";

import TextPanel from "./TextPanel";
import FullWidthImage from "./FullwidthImage";
import Image50Text50 from "./Image50Text50";
import Quote from "./Quote";
import styles from "./OpenContent.module.scss";
import Divider from "./Divider";

type OpenContentBlock =
  | PagePanelsPagePanelsBlocksTextPanelLayout
  | PagePanelsPagePanelsBlocksFullWidthImageLayout
  | PagePanelsPagePanelsBlocksImage50Text50Layout
  | PagePanelsPagePanelsBlocksQuoteLayout
  | PagePanelsPagePanelsBlocksDividerLayout
  | PagePanelsPagePanelsBlocksGalleryLayout;

export const OPEN_CONTENT_FRAGMENT = `

    blocks {
        __typename
        ... on PagePanelsPagePanelsBlocksTextPanelLayout {
            content
            callToAction{
              ...AcfLinkFragment
            }
        }
        ... on PagePanelsPagePanelsBlocksFullWidthImageLayout {
            image {
                ...AcfMediaItem
            }
        }
        ... on PagePanelsPagePanelsBlocksImage50Text50Layout {
            text
            image {
                ...AcfMediaItem
            }
            imagePosition
        }
        ... on PagePanelsPagePanelsBlocksQuoteLayout {
            quote
        }
                   ... on PagePanelsPagePanelsBlocksDividerLayout {
              __typename
            }
            ... on PagePanelsPagePanelsBlocksGalleryLayout {
              images {
                edges {
                  node {
                    altText
                  }
                }
              }
            }
    }


`;

interface OpenContentProps {
  panel: PagePanelsPagePanelsOpenContentLayout;
}

const OpenContent: React.FC<OpenContentProps> = ({ panel }) => {
  const { blocks } = panel || {};

  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={styles["open-content"]}>
      {/* <div className={styles["open-content__texture"]} aria-hidden="true">
        <img src="/assets/pattern-5.svg" alt="" />
      </div> */}
      {(blocks.filter(Boolean) as OpenContentBlock[]).map((block, index) => {
        switch (block.__typename) {
          case "PagePanelsPagePanelsBlocksTextPanelLayout":
            return <TextPanel key={index} panel={block} />;

          case "PagePanelsPagePanelsBlocksFullWidthImageLayout":
            return <FullWidthImage key={index} panel={block} />;

          case "PagePanelsPagePanelsBlocksImage50Text50Layout":
            return <Image50Text50 key={index} panel={block} />;
          case "PagePanelsPagePanelsBlocksQuoteLayout":
            return <Quote key={index} panel={block} />;
          case "PagePanelsPagePanelsBlocksDividerLayout":
            return <Divider key={index} panel={block} />;
          // case "PagePanelsPagePanelsBlocksGalleryLayout":
          //   return <div key={index} className={styles["gallery"]} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default OpenContent;
