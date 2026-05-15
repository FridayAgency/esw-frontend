import { FRAGMENTS } from "@fridayagency/graphql-client";

import { PAGEPANELS_FRAGMENT } from "../fragments/panels";
import { CAREER_POST_FRAGMENT, NEWS_ARTICLE_FRAGMENT, POST_FRAGMENT } from "../fragments/posts";
import { SEO_FRAGMENT } from "../fragments/seo";

export const GET_CONTENTNODE = `
query GetContentNode($uri: ID!) {
  contentNode(id: $uri, idType: URI) {
    uri
    slug
    __typename

    ... on Page {
      id
      title
      date
      modified
      seo { ...PostTypeSEOFragment }
      pagePanels {
        ...PagePanelsFragment
      }
    }

    ... on Product {
      id
      title
      date
      modified
      seo { ...PostTypeSEOFragment }
      pagePanels {
        ...PagePanelsFragment
      }
    }

    ... on Campaign {
      id
      title
      date
      modified
      seo { ...PostTypeSEOFragment }
      pagePanels {
        ...PagePanelsFragment
      }
    }

    ... on CaseStudy {
      id
      title
      date
      modified
      excerpt
      seo { ...PostTypeSEOFragment }
      featuredImage {
        node {
          sourceUrl
        }
      }
      caseStudyCard {
        cardCopy
      }
      caseStudyCategories {
        edges {
          node {
            name
          }
        }
      }
      pagePanels {
        ...PagePanelsFragment
      }
    }

    ... on Industry {
      databaseId
      title
      date
      modified
      seo { ...PostTypeSEOFragment }
      pagePanels {
        ...PagePanelsFragment
      }
    }

    ... on NewsArticle {
      ...NewsArticleFragment
    }

    ... on CareerPost {
      ...CareerPostFragment
    }
  }
}
${PAGEPANELS_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${NEWS_ARTICLE_FRAGMENT}
${CAREER_POST_FRAGMENT}
${SEO_FRAGMENT}
`;

export const GET_CONTENTNODE_PREVIEW = `
query GetContentNodePreview($id: ID!) {
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

    ... on Campaign {
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

    ... on Product {
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

    ... on CaseStudy {
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

    ... on Industry {
      databaseId
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

    ... on NewsArticle {
      ...NewsArticleFragment
      revisions(first: 1, where: {orderby: {field: MODIFIED, order: DESC}}) {
        edges {
          node {
            ...NewsArticleFragment
          }
        }
      }
    }

    ... on CareerPost {
      ...CareerPostFragment
      revisions(first: 1, where: {orderby: {field: MODIFIED, order: DESC}}) {
        edges {
          node {
            ...CareerPostFragment
        }
      } 
    }
   }
  }
}
${PAGEPANELS_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${POST_FRAGMENT}
${NEWS_ARTICLE_FRAGMENT}
${CAREER_POST_FRAGMENT}
`;
