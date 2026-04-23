import { FRAGMENTS } from "@fridayagency/graphql-client";

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
