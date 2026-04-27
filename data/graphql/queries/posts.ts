import { FRAGMENTS } from "@fridayagency/graphql-client";

import { CATEGORY_FRAGMENT } from "../fragments/categories";
import { CAREER_POST_FRAGMENT, NEWS_ARTICLE_FRAGMENT, POST_FRAGMENT, POST_LIST_FRAGMENT } from "../fragments/posts";

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

export const GET_NEWS_ARTICLES = `
query GetNewsArticles($first: Int = 50) {
  newsArticles(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
    edges {
      node {
        ...NewsArticleFragment
      }
    }
  }
  newsCategories(first: $first) {
    edges {
      node {
        name
        slug
        databaseId
      }
    }
  }
}
${NEWS_ARTICLE_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${FRAGMENTS.LINK_FRAGMENT}
${FRAGMENTS.ACF_MEDIA_ITEM}
`;

export const GET_NEWS_ARTICLES_BY_CATEGORY = `
query GetNewsArticlesByCategory($first: Int = 50, $categoryName: String) {
  newsArticles(
    where: {newsCategoryName: $categoryName, orderby: {field: DATE, order: DESC}}
    first: $first
  ) {
    edges {
      node {
        ...NewsArticleFragment
      }
    }
  }
  newsCategories(first: $first) {
    edges {
      node {
        name
        slug
        databaseId
      }
    }
  }
}
${NEWS_ARTICLE_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${FRAGMENTS.LINK_FRAGMENT}
${FRAGMENTS.ACF_MEDIA_ITEM}
`;

export const GET_CAREER_POSTS = `
query GetCareerPosts($first: Int = 50) {
  careerPosts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
    edges {
      node {
        ...CareerPostFragment
      }
    }
  }
  careerCategories(first: $first) {
    edges {
      node {
        name
        slug
        databaseId
      }
    }
  }
}
${CAREER_POST_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${FRAGMENTS.LINK_FRAGMENT}
${FRAGMENTS.ACF_MEDIA_ITEM}
`;

export const GET_CAREER_POSTS_BY_CATEGORY = `
query GetCareerPostsByCategory($first: Int = 50, $categoryName: String) {
  careerPosts(
    where: {careerCategoryName: $categoryName, orderby: {field: DATE, order: DESC}}
    first: $first
  ) {
    edges {
      node {
        ...CareerPostFragment
      }
    }
  }
  careerCategories(first: $first) {
    edges {
      node {
        name
        slug
        databaseId
      }
    }
  }
}
${CAREER_POST_FRAGMENT}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
${FRAGMENTS.LINK_FRAGMENT}
${FRAGMENTS.ACF_MEDIA_ITEM}
`;
