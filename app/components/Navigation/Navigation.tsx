/** @format */

import { Menu, MenuToMenuItemConnectionEdge } from "@/types/graphql";
import { FRAGMENTS } from "@fridayagency/graphql-client";
import client from "@/lib/client";
import { logError } from "@/utils/logError";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const Navigation: React.FC = async () => {
  try {
    const { menu } = await client.query<{ menu: Menu }>(
      `query GetMenu($id: ID!) {
        menu(id: $id, idType: NAME) {
          menuItems(first:100) {
            edges {
              node {
                ...MenuItemFragment
                cssClasses
                childItems(first:100) {
                  edges {
                    node {
                      ...MenuItemFragment
                      cssClasses
                    
                    }
                  }
                }
              }
            }
          }
        }
      }

  ${FRAGMENTS.MENU_ITEM_FRAGMENT}
`,
      { variables: { id: "Main Menu" } },
    );

    if (!menu?.menuItems?.edges) {
      return null;
    }

    const filteredMenu = {
      ...menu,
      menuItems: {
        ...menu.menuItems,
        edges: (menu.menuItems.edges as MenuToMenuItemConnectionEdge[]).filter(
          ({ node }) => !node.cssClasses?.includes("footer-only"),
        ),
      },
    };

    return (
      <>
        <MobileNav menu={filteredMenu as Menu} />
        <DesktopNav menu={filteredMenu as Menu} />
      </>
    );
  } catch (error) {
    logError("Failed to fetch navigation menu", error);
    return null;
  }
};

export default Navigation;
