import { processPageUri } from "@fridayagency/utils";
import { generateSeoMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import client from "@/lib/client";
import { CareerPost, CaseStudy, Industry, NewsArticle, Page, Post, Product } from "@/types/graphql";
import { GET_CONTENTNODE } from "@/data";
import { Metadata } from "next";
import PostTemplate from "../components/Templates/PostTemplate";
import PagePanelsTemplate from "../components/Templates/PagePanelsTemplate";

export interface PageParams {
  params: Promise<{ uri: string[] }>;
}

type NodeWithPanels = Page | Product | CaseStudy | Industry;

function extractPanels(node: NodeWithPanels) {
  return (node as Page).pagePanels?.pagePanels?.filter((panel) => panel !== null) ?? undefined;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { uri } = await params;
  return generateSeoMetadata(processPageUri(uri), "page");
}

const CatchallPage = async ({ params }: PageParams) => {
  const { uri } = await params;
  const pageUri = processPageUri(uri);

  if (!pageUri) notFound();

  const { contentNode } = await client.query<{
    contentNode: Page | Post | Product | CaseStudy | Industry | NewsArticle | CareerPost;
  }>(GET_CONTENTNODE, { variables: { uri: pageUri } });

  if (!contentNode) notFound();

  switch (contentNode.__typename) {
    case "Page":
    case "Product":
    case "CaseStudy":
    case "Industry": {
      const node = contentNode as NodeWithPanels;
      return <PagePanelsTemplate panels={extractPanels(node)} pageTitle={node.title ?? ""} />;
    }

    case "Post":
    case "NewsArticle": {
      return <PostTemplate post={contentNode as Post | NewsArticle | CareerPost} />;
    }

    default:
      notFound();
  }
};

export default CatchallPage;
