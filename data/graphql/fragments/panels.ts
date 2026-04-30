import { ACCORDIONPANEL_FRAGMENT } from "@/app/components/Panels/AccordionPanel";
import { BLOG_LANDING_HEADER_FRAGMENT } from "@/app/components/Panels/BlogLandingHeader";
import { CALLTOACTION_FRAGMENT } from "@/app/components/Panels/CallToAction";
import { CALL_TO_ACTION_WITH_IMAGES_FRAGMENT } from "@/app/components/Panels/CallToActionWithImages";
import { CASE_STUDY_GATEWAY_FRAGMENT } from "@/app/components/Panels/CaseStudyGateway";
import { FEATURE_BLOCK_FRAGMENT } from "@/app/components/Panels/FeatureBlock";
import { FEATURE_BLOCK_GREEN_EMPHASIS_FRAGMENT } from "@/app/components/Panels/FeatureBlockGreenEmphasis";
import { HERO_HEADER_FRAGMENT } from "@/app/components/Panels/HeroHeader";
import { HERO_HEADER_SIMPLE_FRAGMENT } from "@/app/components/Panels/HeroHeaderSimple";
import { LIST_ICON_FRAGMENT } from "@/app/components/Panels/IconBlock";
import { INDUSTYCARDS_FRAGMENT } from "@/app/components/Panels/IndustryCards";
import { LETS_COMPARE_FRAGMENT } from "@/app/components/Panels/LetsCompare";
import { LOGO_BLOCK_FRAGMENT } from "@/app/components/Panels/LogoBlock";
import { OPEN_CONTENT_FRAGMENT } from "@/app/components/Panels/OpenContent";
import { PRIMARYPRODUCTSECTION_FRAGMENT } from "@/app/components/Panels/PrimaryProductSection";
import { QUICK_LINKS_FRAGMENT } from "@/app/components/Panels/QuickLinks";
import { RESOURCEDOWNLOADS_FRAGMENT } from "@/app/components/Panels/ResourceDownloads";
import { STATS_BLOCK_FRAGMENT } from "@/app/components/Panels/StatsBlock";
import { TESTIMONIAL_FRAGMENT } from "@/app/components/Panels/Testimonial";
import { FRAGMENTS } from "@fridayagency/graphql-client";

import { ACF_MEDIAITEM_FRAGMENT } from "./media";
import { LATESTNEWS_FRAGMENT, POST_LIST_FRAGMENT } from "./posts";
import { HEROHEADER_LOGOS_FRAGMENT } from "@/app/components/Panels/HeroHeaderLogos";
import { TWO_LISTS_PANEL_FRAGMENT } from "@/app/components/Panels/TwoListsPanel";
import { FAQ_CENTER_FRAGMENT } from "@/app/components/Panels/FaqCenter";

export const FORM_EMBED_FRAGMENT = `

    formEmbedCode

`;

export const PAGEPANELS_FRAGMENT = (() => {
  const mappings: [typeName: string, fragment: string][] = [
    ["PagePanelsPagePanelsHeroHeaderSimpleLayout", HERO_HEADER_SIMPLE_FRAGMENT],
    ["PagePanelsPagePanelsLogoBlockLayout", LOGO_BLOCK_FRAGMENT],
    ["PagePanelsPagePanelsFeatureBlockLayout", FEATURE_BLOCK_FRAGMENT],
    ["PagePanelsPagePanelsHeroHeaderLayout", HERO_HEADER_FRAGMENT],
    ["PagePanelsPagePanelsIconBlockLayout", LIST_ICON_FRAGMENT],
    ["PagePanelsPagePanelsStatsBlockLayout", STATS_BLOCK_FRAGMENT],
    ["PagePanelsPagePanelsCaseStudyGatewayLayout", CASE_STUDY_GATEWAY_FRAGMENT],
    ["PagePanelsPagePanelsFeatureBlockGreenEmphasisLayout", FEATURE_BLOCK_GREEN_EMPHASIS_FRAGMENT],
    ["PagePanelsPagePanelsPrimaryProductSectionLayout", PRIMARYPRODUCTSECTION_FRAGMENT],
    ["PagePanelsPagePanelsOpenContentLayout", OPEN_CONTENT_FRAGMENT],
    ["PagePanelsPagePanelsResourceDownloadsLayout", RESOURCEDOWNLOADS_FRAGMENT],
    ["PagePanelsPagePanelsCallToActionLayout", CALLTOACTION_FRAGMENT],
    ["PagePanelsPagePanelsTestimonialLayout", TESTIMONIAL_FRAGMENT],
    ["PagePanelsPagePanelsAccordionPanelLayout", ACCORDIONPANEL_FRAGMENT],
    ["PagePanelsPagePanelsIndustryCardsLayout", INDUSTYCARDS_FRAGMENT],
    ["PagePanelsPagePanelsCallToActionWithImagesLayout", CALL_TO_ACTION_WITH_IMAGES_FRAGMENT],
    ["PagePanelsPagePanelsLetsCompareLayout", LETS_COMPARE_FRAGMENT],
    ["PagePanelsPagePanelsQuickLinksLayout", QUICK_LINKS_FRAGMENT],
    ["PagePanelsPagePanelsBlogLandingHeaderLayout", BLOG_LANDING_HEADER_FRAGMENT],
    ["PagePanelsPagePanelsLatestNewsLayout", LATESTNEWS_FRAGMENT],
    ["PagePanelsPagePanelsPostsListLayout", POST_LIST_FRAGMENT],
    ["PagePanelsPagePanelsHeroHeaderLogosLayout", HEROHEADER_LOGOS_FRAGMENT],
    ["PagePanelsPagePanelsTwoListsPanelLayout", TWO_LISTS_PANEL_FRAGMENT],
    ["PagePanelsPagePanelsFaqCenterLayout", FAQ_CENTER_FRAGMENT],
    ["PagePanelsPagePanelsFormEmbedLayout", FORM_EMBED_FRAGMENT],
  ];

  const blocks = mappings.map(([type, fragment]) => `... on ${type} {\n${fragment}\n}`).join("\n      ");

  return `fragment PagePanelsFragment on PagePanels {
    pagePanels {
      __typename
      ${blocks}
    }
  }
    ${ACF_MEDIAITEM_FRAGMENT}
    ${FRAGMENTS.LINK_FRAGMENT}
  `;
})();
