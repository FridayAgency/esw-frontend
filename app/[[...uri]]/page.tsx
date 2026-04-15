import { processPageUri } from "@fridayagency/utils";
import { generateSeoMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import client from "@/lib/client";
import { Page, Post, Product } from "@/types/graphql";
import { GET_CONTENTNODE } from "@/data/fragments";
import PagePanels from "../components/PagePanels";
import PostTemplate from "../components/PostTemplate";
import LatestPosts from "../components/Panels/LatestPosts";
import { Metadata } from "next";

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
        <PagePanels
          panels={page?.pagePanels?.pagePanels?.filter((panel) => panel !== null) ?? undefined}
          pageTitle={page.title ?? ""}
        />
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

// const PageTest = () => {
//   return (
//     <div style={{ paddingBottom: "10rem" }}>
//       <HeroHeader />

//       <FeatureBlockGreenEmphises />
//       <HeroHeaderSimple />

//       <IconBlock />

//       <FeatureBlock />
//       <FeatureBlock imagePosition="left" />
//       <StatsBlock />
//       <PrimaryProductSection />

//       <CaseStudyGateway />
//       <LatestPosts />

//       <LogoBlock />

//       <Testimonial />

//       <LetsCompare />

//       {/* <FeatureBlock />
//       <StatsBlock />
//       <PrimaryProductSection />

//       <ResourceDownloads
//         panel={{
//           title: "Resource Downloads",
//           callToAction: { url: "#", title: "loriem" },
//           resources: [
//             {
//               resourceTitle: "Download this Document",
//               file: {
//                 node: {
//                   id: "1",
//                   sourceUrl: "https://example.com/resource1.pdf",
//                 },
//               },
//             },
//             {
//               resourceTitle: "Download this Document",
//               file: {
//                 node: {
//                   id: "2",
//                   sourceUrl: "https://example.com/resource2.pdf",
//                 },
//               },
//             },
//           ],
//         }}
//       />
//       <Faqs />
//       <TextPanel />
//       <FullWidthImage />
//       <Quote />
//       <Image50Text50 imagePosition="left" />
//       <Image50Text50 imagePosition="right" />
//       <CaseStudyGateway />
//       <CallToAction />
//       <Testimonial />

//       <LatestPosts />

//       <Industries />

//       <FaqCategories />

//       <StayConnected />

//       <AccessReport />

//       <LetsCompare />

//       <ApplicationProcess />

//       <Integrations />

//       <div style={{ padding: "0 2rem" }}>
//         <PostTLDR
//           items={[
//             "Lorem ipsum dolor sit amet consectetur. Amet ac malesuada lectus sed tempor enim auctor eget.",
//             "Tincidunt lacus sit a suscipit massa facilisis vitae.",
//             "Lorem ipsum dolor sit amet consectetur. Amet ac malesuada lectus sed tempor enim auctor eget.",
//           ]}
//         />

//         <BlogHeroArticle
//           category="Category"
//           title="Signal Report: Commerce Trends Predicted for 2030."
//           authorName="Author Name"
//           authorImage="/assets/ck.png"
//           articleImage="/assets/ck.png"
//           href="/path/to/article"
//         /> */}
//     </div>
//   );
// };

// export default PageTest;
