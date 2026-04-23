import PagePanels from "@/app/components/PagePanels";
import PostTemplate from "@/app/components/PostTemplate";
import { GET_CONTENTNODE_PREVIEW } from "@/data";
import client from "@/lib/client";
import { Page, Post } from "@/types/graphql";

import { notFound } from "next/navigation";
import { cookies } from "next/headers";

interface PageParams {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CatchallPage = async ({ params }: PageParams) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const authCookie = cookieStore.get("wp_preview_auth")?.value;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authCookie}`,
  };

  const { contentNode } = await client.query<{ contentNode: Page | Post }>(
    GET_CONTENTNODE_PREVIEW,
    {
      variables: { id },
      headers,
      // Ensure we bypass cache for preview
    },
    0,
  );

  if (!contentNode) notFound();

  let content = contentNode;

  if (content?.revisions?.edges.length) {
    const latestRevision = content.revisions.edges[0].node;

    content = latestRevision;
  } else {
    console.warn("No revisions found for preview, using original content");
  }

  switch (contentNode.__typename) {
    case "Page":
      const page = content as Page;
      return (
        <PagePanels
          panels={page?.pagePanels?.pagePanels?.filter((panel) => panel !== null) ?? undefined}
          pageTitle={page.title ?? ""}
        />
      );

    case "Post":
      const post = content as Post;
      return <PostTemplate post={post} />;

    default:
      notFound();
  }
};

export default CatchallPage;
