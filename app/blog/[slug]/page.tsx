import { processPageUri } from "@fridayagency/utils";
import { generateSeoMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import client from "@/lib/client";
import { CareerPost, CaseStudy, Industry, NewsArticle, Page, Post, Product } from "@/types/graphql";
import { GET_CONTENTNODE, GET_POST_BY_SLUG } from "@/data";
import { Metadata } from "next";

import { calculateReadTime } from "@/lib/readTime";
import PostTemplate from "@/app/components/Templates/PostTemplate";

export interface PageParams {
  params: Promise<{ slug: string }>;
}

type NodeWithPanels = Page | Product | CaseStudy | Industry;

function extractPanels(node: NodeWithPanels) {
  return (node as Page).pagePanels?.pagePanels?.filter((panel) => panel !== null) ?? undefined;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  return generateSeoMetadata(processPageUri(slug), "page");
}

const CatchallPage = async ({ params }: PageParams) => {
  const { slug } = await params;
  const pageUri = processPageUri(slug);

  if (!pageUri) notFound();

  const { post } = await client.query<{
    post: Post;
  }>(GET_POST_BY_SLUG, { variables: { slug: pageUri } });

  if (!post) notFound();

  return <PostTemplate post={post as Post | NewsArticle | CareerPost} />;
};

export default CatchallPage;
