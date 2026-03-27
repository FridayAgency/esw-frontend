/** @format */

import { PagePanelsPagePanels_Layout } from "@/types/graphql";
import { logError } from "@/utils/logError";
import { panelResolver } from "./PanelResolver";
import PanelErrorBoundary from "./PanelErrorBoundary";

interface PanelProps {
  panel: PagePanelsPagePanels_Layout & {
    __typename?: string;
    [key: string]: unknown;
  };
  pageTitle?: string;
  [key: string]: unknown;
}

const PanelFallback = ({ message, panelType }: { message: string; panelType?: string }) => {
  return (
    <div
      style={{ backgroundColor: "#fffbeb", borderLeft: "4px solid #f59e0b", padding: "16px", margin: "16px 0" }}
      data-panel-type={panelType || "unknown"}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flexShrink: 0 }}>
          <svg style={{ height: "20px", width: "20px", color: "#f59e0b" }} viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div style={{ marginLeft: "12px" }}>
          <p style={{ fontSize: "14px", color: "#92400e" }}>
            {message}
            {panelType ? (
              <>
                {": "}
                <code
                  style={{
                    fontFamily: "monospace",
                    backgroundColor: "#fef3c7",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                >
                  {panelType}
                </code>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Server component that dynamically loads and renders panels
 * Renders on server by default for optimal performance
 */
const Panel = async ({ panel, pageTitle, ...props }: PanelProps) => {
  const typename = panel.__typename || "";

  if (!typename) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Panel missing __typename:", panel);
    }
    return <PanelFallback message="Panel missing __typename property" />;
  }

  let ComponentToRender;

  try {
    ComponentToRender = await panelResolver.getComponentAsync(typename);
  } catch (error) {
    logError("Panel failed to render", error, { panelType: typename });
    return <PanelFallback message="Panel failed to render" panelType={typename} />;
  }

  if (!ComponentToRender) {
    return <PanelFallback message="Panel component not found" panelType={typename} />;
  }

  return <ComponentToRender panel={panel} pageTitle={pageTitle} {...props} />;
};

interface PagePanelsProps {
  panels?: Array<
    PagePanelsPagePanels_Layout & {
      __typename?: string;
      [key: string]: unknown;
    }
  >;
  pageTitle?: string;
  [key: string]: unknown;
}

/**
 * Server component that renders all panels
 * Each panel is server-rendered by default for optimal performance and SEO
 */
const PagePanels = async ({ panels, pageTitle, ...props }: PagePanelsProps) => {
  if (!panels || panels.length === 0) {
    return null;
  }

  return (
    <>
      {panels.map((panel, index) => {
        // Stable key prioritizing panel.id over index
        const panelId = panel.id;
        const panelKey =
          typeof panelId === "string" || typeof panelId === "number"
            ? panelId
            : `${panel.__typename || "panel"}-${index}`;

        return (
          <PanelErrorBoundary key={panelKey} panelType={panel.__typename || "unknown"}>
            <Panel panel={panel} pageTitle={pageTitle} {...props} />
          </PanelErrorBoundary>
        );
      })}
    </>
  );
};

export default PagePanels;
