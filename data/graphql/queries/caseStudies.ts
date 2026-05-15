import { FRAGMENTS } from "@fridayagency/graphql-client";

export const GET_CASE_STUDIES = `
  query GetCaseStudies {
    caseStudyCategories {
      edges {
        node {
          name
          uri
          databaseId
             caseStudies(first: 200) {
                  edges {
                    node {
                      id
                      title
                    }
                  }
                }
        }
      }
    }
caseStudies(first: 200, where: {orderby: {field: MENU_ORDER, order: ASC}}) {
      edges {
        node {
          id
          title
          uri
          databaseId
          caseStudyCard {
            cardCopy
            logo {
              ...AcfMediaItem
            }
          }
          caseStudyCategories {
            edges {
              node {
                databaseId
                name
              }
            }
          }
        }
      }
    }
  }
    ${FRAGMENTS.ACF_MEDIA_ITEM}
`;
