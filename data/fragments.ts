import { ACCORDIONPANEL_FRAGMENT } from "@/app/components/Panels/AccordionPanel";
import { BLOG_LANDING_HEADER_FRAGMENT } from "@/app/components/Panels/BlogLandingHeader";
import { CALLTOACTION_FRAGMENT } from "@/app/components/Panels/CallToAction";
import { CALL_TO_ACTION_WITH_IMAGES_FRAGMENT } from "@/app/components/Panels/CallToActionWithImages";
import { CASE_STUDY_GATEWAY_FRAGMENT } from "@/app/components/Panels/CaseStudyGateway";
import { CONTACTPANEL_FRAGMENT } from "@/app/components/Panels/ContactPanel";
import { EDITORCONTENT_FRAGMENT } from "@/app/components/Panels/EditorContent";
import { FEATURE_BLOCK_FRAGMENT } from "@/app/components/Panels/FeatureBlock";
import { FEATURE_BLOCK_GREEN_EMPHASIS_FRAGMENT } from "@/app/components/Panels/FeatureBlockGreenEmphasis";
import { HERO_HEADER_FRAGMENT } from "@/app/components/Panels/HeroHeader";
import { HERO_HEADER_SIMPLE_FRAGMENT } from "@/app/components/Panels/HeroHeaderSimple";
import { LIST_ICON_FRAGMENT } from "@/app/components/Panels/IconBlock";
import { INDUSTYCARDS_FRAGMENT } from "@/app/components/Panels/IndustryCards";
import { LATESTNEWS_FRAGMENT } from "@/app/components/Panels/LatestNews";
import { LETS_COMPARE_FRAGMENT } from "@/app/components/Panels/LetsCompare";
import { LOGO_BLOCK_FRAGMENT } from "@/app/components/Panels/LogoBlock";
import { OPEN_CONTENT_FRAGMENT } from "@/app/components/Panels/OpenContent";
import { PAGEHEADER_FRAGMENT } from "@/app/components/Panels/PageHeader";
import { PRIMARYPRODUCTSECTION_FRAGMENT } from "@/app/components/Panels/PrimaryProductSection";
import { QUICK_LINKS_FRAGMENT } from "@/app/components/Panels/QuickLinks";
import { RESOURCEDOWNLOADS_FRAGMENT } from "@/app/components/Panels/ResourceDownloads";
import { STATS_BLOCK_FRAGMENT } from "@/app/components/Panels/StatsBlock";
import { TESTIMONIAL_FRAGMENT } from "@/app/components/Panels/Testimonial";

import { FRAGMENTS } from "@fridayagency/graphql-client";

export const ACF_MEDIAITEM_FRAGMENT = `
fragment AcfMediaItem on AcfMediaItemConnectionEdge {
  node {
    altText
    sourceUrl
    srcSet
    databaseId
    caption
    mediaDetails {
      height
      width
    }
  }
}
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

export const POST_FRAGMENT = `
fragment PostFragment on Post {
  __typename
  databaseId
  title
  slug
  uri
  date
  excerpt
  content
  postfields {
      tldr {
        listItem
      }
      openContent {
        __typename
        ... on PostfieldsOpenContentTextPanelLayout {
          content
          callToAction {
            ...AcfLinkFragment
          }
        }
        ... on PostfieldsOpenContentFullWidthImageLayout {
          image {
            ...AcfMediaItem
          }
        }
        ... on PostfieldsOpenContentImage50Text50Layout {
          imagePosition
          text
          image {
            ...AcfMediaItem
          }
        }
        ... on PostfieldsOpenContentQuoteLayout {
          quote
        }
        ... on PostfieldsOpenContentDividerLayout {
          fieldGroupName
        }
      }
    }
  featuredImage {
    ...MediaItemFragment
  }
  author {
    node {
      name
      uri
      description
      avatar(size: 120) {
        url
      }
    }
  }
  categories {
    edges {
      node {
        name
        databaseId
        posts(first:3){
          edges{
            node{
              databaseId
              title
              slug
              uri
              date
              excerpt
              content
              featuredImage {
                ...MediaItemFragment
              }
              author {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_CONTENTNODE = `
query GetContentNode($uri: ID!) {
  contentNode(id: $uri, idType: URI) {
    uri
    slug
    __typename
    ... on Page {
      id
      title
      pagePanels {
        ...PagePanelsFragment
      }
      seo {
        schema {
          raw
        }
      }
    }

    ... on Product {
      id
      title
      pagePanels {
        ...PagePanelsFragment
      }
      seo {
        schema {
          raw
        }
      }
    }

    ... on Post {
      ...PostFragment
    }
  }
}
${PAGEPANELS_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${POST_FRAGMENT}
`;

export const GET_CONTENTNODE_PREVIEW = `
query GetContentNode($id: ID!) {
  contentNode(id: $id, idType: DATABASE_ID) {
    uri
    slug
    __typename
    ... on Page {
      id
      title
      pagePanels {
        ...PagePanelsFragment
      }
      revisions(first: 1, where: {orderby: {field: MODIFIED, order: DESC}}) {
        edges {
          node {
            pagePanels {
              ...PagePanelsFragment
            }
          }
        }
      }
    }

    ... on Post {
      ...PostFragment
      revisions(first: 1, where: {orderby: {field: MODIFIED, order: DESC}}) {
        edges {
          node {
            ...PostFragment
          }
        }
      }
    }
  }
}
${PAGEPANELS_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${POST_FRAGMENT}
`;

export const GET_FOOTER_DATA = `
query GetFooterData {
  footerMenu: menu(id: "Footer Menu", idType: NAME) {
    menuItems(first: 50) {
      edges {
        node {
          ...MenuItemFragment
          childItems(first: 50) {
            edges {
              node {
                ...MenuItemFragment
              }
            }
          }
        }
      }
    }
  }
}
${FRAGMENTS.MENU_ITEM_FRAGMENT}
`;

export const CATEHORY_FRAGMENT = `
fragment CategoryFragment on Category {
  name
  slug
  databaseId
}
`;

export const GET_POSTS = `
query GetPosts($first: Int = 50) {
  posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
    edges {
      node {
        ...PostFragment
      }
    }
  }
   categories(first: $first) {
    edges {
      node {
        ...CategoryFragment
      }
    }
  }
}
${POST_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${CATEHORY_FRAGMENT}
`;

export const GET_POSTS_BY_CATEGORY = `
query NewQuery($first: Int = 50, $categoryName: String) {
  posts(
    where: {categoryName: $categoryName, orderby: {field: DATE, order: DESC}}
    first: $first
  ) {
    edges {
      node {
        ...PostFragment
      }
    }
  }
   categories(first: $first) {
    edges {
      node {
        ...CategoryFragment
      }
    }
  }
}
${POST_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${CATEHORY_FRAGMENT}
`;

export const GET_POSTS_BY_AUTHOR = `
query NewQuery($first: Int = 50, $authorName: String) {
  posts(
    where: {authorName: $authorName, orderby: {field: DATE, order: DESC}}
    first: $first
  ) {
    edges {
      node {
        ...PostFragment
      }
    }
  }

}
${POST_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}

`;

const COMMON_SEO_FIELDS = `
  canonical
  metaDesc
  metaKeywords
  metaRobotsNofollow
  metaRobotsNoindex
  opengraphDescription
  opengraphImage {
    sourceUrl
  }
  opengraphSiteName
  opengraphTitle
  opengraphUrl
  opengraphType
  schema {
    raw
  }
  title
  twitterDescription
  twitterImage {
    sourceUrl
  }
  twitterTitle
`;

export const SEO_FRAGMENT = `
  fragment PostTypeSEOFragment on PostTypeSEO {
    ${COMMON_SEO_FIELDS}
    cornerstone
    opengraphAuthor
    opengraphModifiedTime
    opengraphPublishedTime
    opengraphPublisher
  }
`;

export const TAXONOMY_SEO_FRAGMENT = `
  fragment TaxonomySEOFragment on TaxonomySEO {
    ${COMMON_SEO_FIELDS}
  }
`;

export const USER_SEO_FRAGMENT = `
  fragment UserSEOFragment on UserSEO {
    ${COMMON_SEO_FIELDS}
  }
`;

export const GET_CATEGORY_SEO = `
query GetCategorySeo($id: ID! ) {
  category(id: $id, idType: SLUG) {
    id
    seo {
      ...TaxonomySEOFragment
    }
  }
}
${TAXONOMY_SEO_FRAGMENT}

`;

export const GET_AUTHOR_SEO = `
query GetAuthorSeo($id: ID! ) {
   user(id: $id, idType: SLUG) {
    id
    seo {
      breadcrumbTitle
      canonical
      fullHead
      language
      metaDesc
      metaRobotsNofollow
      metaRobotsNoindex
      opengraphDescription
      opengraphTitle
      region
      title
      twitterDescription
      twitterTitle
    }
  }
}

`;

export const GET_SEO = `query GetSeo($uri: ID!) {
  contentNode(id: $uri, idType: URI) {
    seo {
      ...PostTypeSEOFragment
    }
  }
}
${SEO_FRAGMENT}
`;

export const GET_MENU = `
query GetMenu($id: ID!) {
  menu(id: $id, idType: NAME) {
    menuItems(first: 50) {
      edges {
        node {
          ...MenuItemFragment
          childItems(first: 50) {
            edges {
              node {
                ...MenuItemFragment
                childItems(first: 50) {
                  edges {
                    node {
                      ...MenuItemFragment
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
${FRAGMENTS.MENU_ITEM_FRAGMENT}
`;

export const GET_INTEGRATIONS = `
query GetIntegrations {
  integrations(first: 200) {
    edges {
      node {
        title
        databaseId
        featuredImage{
         ...MediaItemFragment
        }
        integrationContent {
          integrationUrl
          cardDiscription
        }
        integrationCategories {
          edges {
            node {
              slug
              name
              databaseId
            }
          }
        }
      }
    }
  }
  integrationCategories{
    edges{
      node{
        name
        databaseId
        uri
      }
    }
  }
}
  ${FRAGMENTS.MEDIAITEM_FRAGMENT}
`;
