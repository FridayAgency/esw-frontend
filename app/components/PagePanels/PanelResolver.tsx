/** @format */

import { ComponentType } from "react";

/**
 * Auto-discovery pattern that maps panel types to components based on naming convention
 * Server-side dynamic imports for optimal performance - components render on server by default
 */
class PanelComponentResolver {
  private static instance: PanelComponentResolver;
  private componentCache = new Map<string, Promise<ComponentType<any> | null>>();
  private failedImports = new Set<string>();

  private constructor() {}

  /**
   * Get the singleton instance
   */
  static getInstance(): PanelComponentResolver {
    if (!PanelComponentResolver.instance) {
      PanelComponentResolver.instance = new PanelComponentResolver();
    }
    return PanelComponentResolver.instance;
  }

  /**
   * Convert GraphQL typename to component path
   * PagePanelsPagePanelsHeroHeaderLayout -> HeroHeader
   */
  private getComponentName(typename: string): string {
    return typename.replace(/^PagePanelsPagePanels/, "").replace(/Layout$/, "");
  }

  /**
   * Async get component for server-side rendering
   * Components are loaded dynamically but rendered on the server
   */
  async getComponentAsync(typename: string): Promise<ComponentType<any> | null> {
    // Return cached promise if available
    if (this.componentCache.has(typename)) {
      return this.componentCache.get(typename)!;
    }

    // Don't retry failed imports
    if (this.failedImports.has(typename)) {
      return null;
    }

    const componentName = this.getComponentName(typename);

    // Create a promise for the dynamic import
    const componentPromise = import(`../Panels/${componentName}/index`)
      .then((module) => module.default)
      .catch((error) => {
        console.warn(`Failed to load panel component: ${componentName} (${typename})`, error);
        this.failedImports.add(typename);
        return null;
      });

    this.componentCache.set(typename, componentPromise);
    return componentPromise;
  }

  /**
   * Clear the component cache (useful for testing or hot reloading)
   */
  clearCache(): void {
    this.componentCache.clear();
    this.failedImports.clear();
  }
}

// Export singleton instance
export const panelResolver = PanelComponentResolver.getInstance();

export default panelResolver;
