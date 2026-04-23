import { FRAGMENTS } from "@fridayagency/graphql-client";

export const GET_INTEGRATIONS = `
query GetIntegrations {
  integrations(first: 200) {
    edges {
      node {
        title
        databaseId
        featuredImage {
          ...MediaItemFragment
        }
        integrationContent {
          integrationUrl
          integrationContent
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
  integrationCategories {
    edges {
      node {
        name
        databaseId
        uri
      }
    }
  }
}
${FRAGMENTS.MEDIAITEM_FRAGMENT}
`;
