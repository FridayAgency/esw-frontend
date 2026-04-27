import PagePanelsTemplate from "@/app/components/Templates/PagePanelsTemplate";
import PostTemplate from "@/app/components/Templates/PostTemplate";
import { GET_CONTENTNODE_PREVIEW } from "@/data";
import client from "@/lib/client";
import { CaseStudy, Industry, Page, Post, Product } from "@/types/graphql";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

interface PageParams {
  params: Promise<{ id: string }>;
}

type ContentNode = Page | Post | Product | CaseStudy | Industry;

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CatchallPreviewPage = async ({ params }: PageParams) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("wp_preview_auth")?.value;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authCookie}`,
  };

  const { contentNode } = await client.query<{ contentNode: ContentNode }>(
    GET_CONTENTNODE_PREVIEW,
    { variables: { id }, headers },
    0,
  );

  if (!contentNode) notFound();

  const content = contentNode.revisions?.edges.length ? contentNode.revisions.edges[0].node : contentNode;

  switch (contentNode.__typename) {
    case "Page":
    case "Product":
    case "CaseStudy":
    case "Industry": {
      const node = content as Page;
      return <PagePanelsTemplate panels={node?.pagePanels?.pagePanels} pageTitle={node.title ?? ""} />;
    }

    case "Post": {
      return <PostTemplate post={content as Post} />;
    }

    default:
      notFound();
  }
};

export default CatchallPreviewPage;
