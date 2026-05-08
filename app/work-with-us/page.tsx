import { processPageUri } from "@fridayagency/utils";
import { generateSeoMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import client from "@/lib/client";
import { Campaign, CareerPost, CaseStudy, Industry, NewsArticle, Page, Post, Product } from "@/types/graphql";
import { GET_CONTENTNODE } from "@/data";
import { Metadata } from "next";

import PagePanelsTemplate from "../components/Templates/PagePanelsTemplate";

import OpenRolesClient from "./OpenRolesClient";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata(processPageUri("/work-with-us/"), "page");
}

const CatchallPage = async () => {
  const { contentNode } = await client.query<{
    contentNode: Page | Post | Product | CaseStudy | Industry | NewsArticle | CareerPost | Campaign;
  }>(GET_CONTENTNODE, { variables: { uri: "/work-with-us/" } });

  if (!contentNode) notFound();

  const node = contentNode as Page;

  return (
    <>
      {node?.pagePanels && <PagePanelsTemplate panels={node.pagePanels.pagePanels as any} />}
      <OpenRolesClient />
    </>
  );
};

export default CatchallPage;
