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
