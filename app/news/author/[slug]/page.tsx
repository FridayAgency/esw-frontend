import PostList from "@/app/components/PostsList";
import { GET_POSTS_BY_AUTHOR } from "@/data/fragments";
import client from "@/lib/client";
import { RootQueryToPostConnection } from "@/types/graphql";
import { processPageUri, removeNodes } from "@fridayagency/utils";

import { Metadata, NextPage } from "next";
import { generateAuthorSeoMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ slug: string }>;
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string }>;
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
  const { slug } = await params;
  const pageUri = processPageUri(slug) || "";
  return generateAuthorSeoMetadata(pageUri.replaceAll("/", ""), "author");
}

const NewsAuthorPage: NextPage<PageParams> = async ({ params }) => {
  const { slug } = await params;

  const pageUri = processPageUri(slug);

  console.log("Fetching news for author slug:", pageUri);

  try {
    const { posts } = await client.query<{
      posts: RootQueryToPostConnection;
    }>(GET_POSTS_BY_AUTHOR, {
      variables: { first: 50, authorName: pageUri },
    });

    const items = posts ? removeNodes(posts) : [];

    return <PostList items={items} />;
  } catch (error) {
    console.error("Error fetching news author data:", error);
    return <div>Error loading news author.</div>;
  }
};

export default NewsAuthorPage;
