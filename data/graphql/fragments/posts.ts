export const LATESTNEWS_FRAGMENT = `
    title
`;

export const NEWS_ARTICLE_FRAGMENT = `
fragment NewsArticleFragment on NewsArticle {
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
  newsCategories {
    edges {
      node {
        name
        databaseId
        slug
        newsArticles(first: 3) {
          edges {
            node {
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

export const CAREER_POST_FRAGMENT = `
fragment CareerPostFragment on CareerPost {
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
  careerCategories {
    edges {
      node {
        name
        databaseId
        slug
        careerPosts(first: 3) {
          edges {
            node {
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

export const POST_LIST_FRAGMENT = `
featuredPost {
  nodes {
    ... on Post {
      databaseId
      uri
      title
      featuredImage {
        node {
          altText
          sourceUrl
          srcSet
          mediaDetails {
            height
            width
          }
        }
      }
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      categories {
        edges {
          node {
            name
          }
        }
      }
    }
  }
}
`;

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
