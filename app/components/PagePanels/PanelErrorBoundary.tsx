"use client";

import { logError } from "@/utils/logError";
import { Component, ErrorInfo, ReactNode } from "react";

interface PanelErrorBoundaryProps {
  children: ReactNode;
  panelType?: string;
}

interface PanelErrorBoundaryState {
  hasError: boolean;
}

class PanelErrorBoundary extends Component<PanelErrorBoundaryProps, PanelErrorBoundaryState> {
  state: PanelErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): PanelErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logError("Panel render error", error, { panelType: this.props.panelType, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{ backgroundColor: "#fffbeb", borderLeft: "4px solid #f59e0b", padding: "16px", margin: "16px 0" }}
          data-panel-type={this.props.panelType || "unknown"}
        >
          <p style={{ fontSize: "14px", color: "#92400e" }}>
            This panel couldn&apos;t be displayed.
            {this.props.panelType ? (
              <>
                {" "}
                <code
                  style={{
                    fontFamily: "monospace",
                    backgroundColor: "#fef3c7",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                >
                  {this.props.panelType}
                </code>
              </>
            ) : null}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PanelErrorBoundary;
