import { SEO_FRAGMENT, TAXONOMY_SEO_FRAGMENT, USER_SEO_FRAGMENT } from "../fragments/seo";

export const GET_SEO = `
query GetSeo($uri: ID!) {
  contentNode(id: $uri, idType: URI) {
    seo {
      ...PostTypeSEOFragment
    }
  }
}
${SEO_FRAGMENT}
`;

export const GET_CATEGORY_SEO = `
query GetCategorySeo($id: ID!) {
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
query GetAuthorSeo($id: ID!) {
  user(id: $id, idType: SLUG) {
    id
    seo {
      ...UserSEOFragment
    }
  }
}
${USER_SEO_FRAGMENT}
`;
