import { FRAGMENTS } from "@fridayagency/graphql-client";

import { PAGEPANELS_FRAGMENT } from "../fragments/panels";
import { CAREER_POST_FRAGMENT, NEWS_ARTICLE_FRAGMENT, POST_FRAGMENT } from "../fragments/posts";

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
    }

    ... on Product {
      id
      title
      pagePanels {
        ...PagePanelsFragment
      }
    }

    ... on Post {
      ...PostFragment
    }

    ... on CaseStudy {
      id
      title
      pagePanels {
        ...PagePanelsFragment
      }
    }

    ... on Industry {
      databaseId
      title
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
${POST_FRAGMENT}
${NEWS_ARTICLE_FRAGMENT}
${CAREER_POST_FRAGMENT}
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
    }

    ... on CareerPost {
      ...CareerPostFragment
    }
  }
}
${PAGEPANELS_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${POST_FRAGMENT}
${NEWS_ARTICLE_FRAGMENT}
${CAREER_POST_FRAGMENT}
`;
