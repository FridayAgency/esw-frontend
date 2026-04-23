import { processPageUri } from "@fridayagency/utils";
import { generateSeoMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import client from "@/lib/client";
import { Page, Post, Product } from "@/types/graphql";
import { GET_CONTENTNODE } from "@/data";
import PagePanels from "../components/PagePanels";
import PostTemplate from "../components/PostTemplate";

import { Metadata } from "next";

export interface PageParams {
  params: Promise<{ uri: string[] }>;
}

interface GenerateMetadataProps {
  params: Promise<{ uri: string[] }>;
}

/**
 * Generate static parameters for the catch-all route
 * Returns empty array to enable ISR (Incremental Static Regeneration)
 */
export async function generateStaticParams() {
  return [];
}

/**
 * Generate metadata for SEO optimization
 * Fetches page SEO data and converts it to Next.js metadata format
 */
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { uri } = await params;
  const pageUri = processPageUri(uri);
  return generateSeoMetadata(pageUri, "page");
}

const CatchallPage = async ({ params }: PageParams) => {
  const { uri } = await params;

  const pageUri = processPageUri(uri);

  if (!pageUri) notFound();

  const { contentNode } = await client.query<{ contentNode: Page | Post | Product }>(GET_CONTENTNODE, {
    variables: { uri: pageUri },
  });

  if (!contentNode) notFound();

  switch (contentNode.__typename) {
    case "Page":
      const page = contentNode as Page;
      return (
        <>
          <PagePanels
            panels={page?.pagePanels?.pagePanels?.filter((panel) => panel !== null) ?? undefined}
            pageTitle={page.title ?? ""}
          />
        </>
      );

    case "Product":
      const product = contentNode as Product;
      return (
        <PagePanels
          panels={product?.pagePanels?.pagePanels?.filter((panel) => panel !== null) ?? undefined}
          pageTitle={product.title ?? ""}
        />
      );

    case "Post":
      const post = contentNode as Post;
      return <PostTemplate post={post} />;

    default:
      notFound();
  }
};

export default CatchallPage;
