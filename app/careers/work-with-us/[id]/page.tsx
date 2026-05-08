import JobDetails from "./JobDetails";
import LatestCareersPosts from "@/app/components/Panels/LatestCareersPosts";
import { Campaign, CareerPost, NewsArticle, Page } from "@/types/graphql";
import notFound from "@/app/not-found";
import { GET_CONTENTNODE } from "@/data/graphql/queries/content";
import client from "@/lib/client";
import PagePanelsTemplate from "@/app/components/Templates/PagePanelsTemplate";

const OpenRolePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { contentNode } = await client.query<{
    contentNode: Page;
  }>(GET_CONTENTNODE, { variables: { uri: "/job/" } });

  if (!contentNode) notFound();

  const node = contentNode as Page;

  return (
    <>
      <JobDetails id={id} />

      {node?.pagePanels && <PagePanelsTemplate panels={node.pagePanels.pagePanels as any} />}
      <LatestCareersPosts title="Life at ESW Blogs" />
    </>
  );
};

export default OpenRolePage;
