/** @format */

import { ComponentType } from "react";

// Auto-discovery: PagePanelsPagePanelsHeroHeaderLayout -> HeroHeader
function getComponentName(typename: string): string {
  return typename.replace(/^PagePanelsPagePanels/, "").replace(/Layout$/, "");
}

export async function getPanelComponent(typename: string): Promise<ComponentType<any> | null> {
  const componentName = getComponentName(typename);
  try {
    const module = await import(`../Panels/${componentName}/index`);
    return module.default ?? null;
  } catch {
    return null;
  }
}
