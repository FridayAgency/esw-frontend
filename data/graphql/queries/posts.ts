import { FRAGMENTS } from "@fridayagency/graphql-client";

import { CATEGORY_FRAGMENT } from "../fragments/categories";
import { POST_FRAGMENT, POST_LIST_FRAGMENT } from "../fragments/posts";

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
${FRAGMENTS.LINK_FRAGMENT}
${FRAGMENTS.ACF_MEDIA_ITEM}
${CATEGORY_FRAGMENT}
`;

export const GET_POSTS_BY_CATEGORY = `
query GetPostsByCategory($first: Int = 50, $categoryName: String) {
  page(id: "blog", idType: URI) {
    id
    pagePanels {
      pagePanels {
        ... on PagePanelsPagePanelsBlogLandingHeaderLayout {
          __typename
          copy
          title
        }
        ... on PagePanelsPagePanelsPostsListLayout {
          __typename
          ${POST_LIST_FRAGMENT}
        }
      }
    }
  }
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
${FRAGMENTS.LINK_FRAGMENT}
${FRAGMENTS.ACF_MEDIA_ITEM}
${CATEGORY_FRAGMENT}
`;

export const GET_POSTS_BY_AUTHOR = `
query GetPostsByAuthor($first: Int = 50, $authorName: String) {
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
