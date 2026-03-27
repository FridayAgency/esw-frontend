import { GET_CONTENTNODE } from "@/data/fragments";
import client from "@/lib/client";
import { Page, Post } from "@/types/graphql";
import { processPageUri } from "@fridayagency/utils";
import { notFound } from "next/navigation";
import PagePanels from "../components/PagePanels";

import PostTemplate from "../components/PostTemplate";
import { generateSeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
import Container from "../components/Container";
import Button from "../components/Button";
import HeroHeader from "../components/Panels/HeroHeader";

import OpportunityStatement from "../components/Panels/OpportunityStatement";
import Icon from "../components/Icon";
import IconBlock from "../components/Panels/IconBlock";
import FeatureBlockGreenEmphises from "../components/Panels/FeatureBlockGreenEmphises";
import FeatureBlock from "../components/Panels/FeatureBlock";
import { Stats } from "node:fs";
import StatsBlock from "../components/Panels/StatsBlock";
import PrimaryProductSection from "../components/Panels/PrimaryProductSection";
import LatestPosts from "../components/Panels/LatestPosts";
import CallToAction from "../components/Panels/CallToAction";
import CaseStudyGateway from "../components/Panels/CaseStudyGateway";
import Testimonial from "../components/Panels/Testimonial";
import HeroHeaderSimple from "../components/Panels/HeroHeaderSimple";
import ResourceDownloads from "../components/Panels/ResourceDownloads";
import Faqs from "../components/Panels/Faqs";
import TextPanel from "../components/Panels/OpenContent/TextPanel";
import FullWidthImage from "../components/Panels/OpenContent/FullwidthImage";
import Quote from "../components/Panels/OpenContent/Quote";
import Image50Text50 from "../components/Panels/OpenContent/Image50Text50";
import Industries from "../components/Panels/Industries";
import Integrations from "../components/Panels/Integrations";

interface PageParams {
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
// export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
//   const { uri } = await params;
//   const pageUri = processPageUri(uri);
//   return generateSeoMetadata(pageUri, "page");
// }

// const CatchallPage = async ({ params }: PageParams) => {
//   const { uri } = await params;

//   const pageUri = processPageUri(uri);

//   if (!pageUri) notFound();

//   const { contentNode } = await client.query<{ contentNode: Page | Post }>(GET_CONTENTNODE, {
//     variables: { uri: pageUri },
//   });

//   if (!contentNode) notFound();

//   switch (contentNode.__typename) {
//     case "Page":
//       const page = contentNode as Page;
//       return (
//         <PagePanels
//           panels={page?.pagePanels?.pagePanels?.filter((panel) => panel !== null) ?? undefined}
//           pageTitle={page.title ?? ""}
//         />
//       );

//     case "Post":
//       const post = contentNode as Post;
//       return <PostTemplate post={post} />;

//     default:
//       notFound();
//   }
// };

// export default CatchallPage;

const PageTest = () => {
  return (
    <div style={{ paddingBottom: "10rem" }}>
      <HeroHeader />

      <FeatureBlockGreenEmphises />
      <HeroHeaderSimple />
      <OpportunityStatement />
      <IconBlock />
      <FeatureBlock />
      <StatsBlock />
      <PrimaryProductSection />

      <ResourceDownloads
        panel={{
          title: "Resource Downloads",
          callToAction: { url: "#", title: "loriem" },
          resources: [
            {
              resourceTitle: "Download this Document",
              file: {
                node: {
                  id: "1",
                  sourceUrl: "https://example.com/resource1.pdf",
                },
              },
            },
            {
              resourceTitle: "Download this Document",
              file: {
                node: {
                  id: "2",
                  sourceUrl: "https://example.com/resource2.pdf",
                },
              },
            },
          ],
        }}
      />
      <Faqs />
      <TextPanel />
      <FullWidthImage />
      <Quote />
      <Image50Text50 imagePosition="left" />
      <Image50Text50 imagePosition="right" />
      <CaseStudyGateway />
      <CallToAction />
      <Testimonial />

      <LatestPosts />

      <Industries />

      <Integrations />
    </div>
  );
};

export default PageTest;
