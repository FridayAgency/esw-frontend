import PostList from "@/app/components/PostsList";
import { GET_CAREER_POSTS_BY_CATEGORY } from "@/data";
import client from "@/lib/client";
import { CareerCategory, CareerPost, RootQueryToCareerCategoryConnection } from "@/types/graphql";
import { processPageUri, removeNodes } from "@fridayagency/utils";

import { Metadata, NextPage } from "next";
import { generateCategorySeoMetadata } from "@/lib/seo";

interface PageParams {
  params: Promise<{ slug: string }>;
}

interface GenerateMetadataProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params;
  const pageUri = processPageUri(slug);

  return generateCategorySeoMetadata(pageUri, "careerCategory");
}

const CareersBlogCategoryPage: NextPage<PageParams> = async ({ params }) => {
  const { slug } = await params;

  const pageUri = processPageUri(slug);
  const categorySlug = pageUri?.replaceAll("/", "") ?? "";

  try {
    const { filteredCategory, careerCategories } = await client.query<{
      filteredCategory: RootQueryToCareerCategoryConnection;
      careerCategories: RootQueryToCareerCategoryConnection;
    }>(GET_CAREER_POSTS_BY_CATEGORY, {
      variables: { first: 50, slug: [categorySlug] },
    });

    const categoryNode = filteredCategory?.edges?.[0]?.node;
    const items = categoryNode?.careerPosts ? removeNodes<CareerPost>(categoryNode.careerPosts as any) : [];
    const categories = careerCategories ? removeNodes<CareerCategory>(careerCategories) : [];

    return (
      <PostList
        items={items}
        categories={categories}
        activeCategory={pageUri ?? ""}
        categoryBasePath="/life-at-esw-blog/category/"
        allPostsHref="/life-at-esw-blog/"
      />
    );
  } catch (error) {
    console.error("Error fetching careers blog category data:", error);
    return <div>Error loading careers blog category.</div>;
  }
};

export default CareersBlogCategoryPage;
