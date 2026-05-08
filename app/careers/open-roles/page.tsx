import { processPageUri } from "@fridayagency/utils";
import { generateSeoMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import client from "@/lib/client";
import { Campaign, CareerPost, CaseStudy, Industry, NewsArticle, Page, Post, Product } from "@/types/graphql";
import { GET_CONTENTNODE } from "@/data";
import { Metadata } from "next";

import PagePanelsTemplate from "../../components/Templates/PagePanelsTemplate";

import OpenRolesClient, { type Job } from "./OpenRolesClient";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata(processPageUri("/careers/open-roles/"), "page");
}

const WorkWithUsPage = async () => {
  const { contentNode } = await client.query<{
    contentNode: Page | Post | Product | CaseStudy | Industry | NewsArticle | CareerPost | Campaign;
  }>(GET_CONTENTNODE, { variables: { uri: "/careers/open-roles/" } });

  if (!contentNode) notFound();

  const node = contentNode as Page;

  let jobs: Job[] = [];
  let fetchError: string | undefined;

  const jobsResponse = await fetch("https://boards-api.greenhouse.io/v1/boards/esw/jobs/?content=true");
  if (!jobsResponse.ok) {
    console.error("Error fetching career open roles");
    fetchError = "We couldn't load open roles right now. Please try again later.";
  } else {
    const jobsData = await jobsResponse.json();
    jobs = jobsData.jobs;
  }

  return (
    <>
      {node?.pagePanels && <PagePanelsTemplate panels={node.pagePanels.pagePanels as any} />}
      <OpenRolesClient jobs={jobs} fetchError={fetchError} />
    </>
  );
};

export default WorkWithUsPage;
