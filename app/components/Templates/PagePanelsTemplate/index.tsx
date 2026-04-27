import React from "react";
import PagePanels from "../../PagePanels";
import { Maybe, PagePanelsPagePanels_Layout } from "@/types/graphql";

interface PagePanelsTemplateProps {
  panels: Maybe<Maybe<PagePanelsPagePanels_Layout>[]> | undefined;
  pageTitle?: string;
}

const PagePanelsTemplate: React.FC<PagePanelsTemplateProps> = ({ panels, pageTitle }) => {
  return <PagePanels panels={panels?.filter((panel) => panel !== null) ?? undefined} pageTitle={pageTitle ?? ""} />;
};

export default PagePanelsTemplate;
