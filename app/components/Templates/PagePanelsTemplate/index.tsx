import React from "react";
import PagePanels from "../../PagePanels";
import { Maybe, PagePanelsPagePanels_Layout } from "@/types/graphql";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface PagePanelsTemplateProps {
  panels: Maybe<Maybe<PagePanelsPagePanels_Layout>[]> | undefined;
  pageTitle?: string;
  showBreadcrumbs?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  readTime?: number;
}

const PagePanelsTemplate: React.FC<PagePanelsTemplateProps> = ({
  panels,
  pageTitle,
  showBreadcrumbs,
  breadcrumbs,
  readTime,
}) => {
  return (
    <PagePanels
      panels={panels?.filter((panel) => panel !== null) ?? undefined}
      pageTitle={pageTitle ?? ""}
      showBreadcrumbs={showBreadcrumbs}
      breadcrumbs={breadcrumbs}
      readTime={readTime}
    />
  );
};

export default PagePanelsTemplate;
