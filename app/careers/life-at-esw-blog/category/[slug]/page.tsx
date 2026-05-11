import PostList from "@/app/components/PostsList";
import { GET_CAREER_POSTS_BY_CATEGORY } from "@/data";
import client from "@/lib/client";
import {
  CareerCategory,
  CareerPost,
  Page,
  PagePanelsPagePanelsCareersBlogListLayout,
  RootQueryToCareerCategoryConnection,
} from "@/types/graphql";
import { processPageUri, removeNodes } from "@fridayagency/utils";

import { Metadata, NextPage } from "next";
import { generateCategorySeoMetadata } from "@/lib/seo";
import PagePanels from "@/app/components/PagePanels/PagePanels";
import styles from "./Page.module.scss";

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
    const { page, filteredCategory, careerCategories } = await client.query<{
      page: Page;
      filteredCategory: RootQueryToCareerCategoryConnection;
      careerCategories: RootQueryToCareerCategoryConnection;
    }>(GET_CAREER_POSTS_BY_CATEGORY, {
      variables: { first: 50, slug: [categorySlug] },
    });

    const categoryNode = filteredCategory?.edges?.[0]?.node;
    const items = categoryNode?.careerPosts ? removeNodes<CareerPost>(categoryNode.careerPosts as any) : [];
    const categories = careerCategories ? removeNodes<CareerCategory>(careerCategories) : [];

    const newsListPanel = page?.pagePanels?.pagePanels?.find(
      (panel): panel is PagePanelsPagePanelsCareersBlogListLayout =>
        (panel as any)?.__typename === "PagePanelsPagePanelsCareersBlogListLayout",
    );
    const featuredPost = ((newsListPanel?.featuredPost as any)?.nodes?.[0] as CareerPost) ?? undefined;

    console.log(newsListPanel);

    return (
      <>
        <PagePanels
          panels={
            page?.pagePanels?.pagePanels?.filter(
              (panel): panel is NonNullable<typeof panel> =>
                panel !== null &&
                Object.keys(panel).length > 0 &&
                (panel as any).__typename !== "PagePanelsPagePanelsPostsListLayout" &&
                (panel as any).__typename !== "PagePanelsPagePanelsNewsListLayout" &&
                (panel as any).__typename !== "PagePanelsPagePanelsCareersBlogListLayout",
            ) ?? undefined
          }
          pageTitle={page?.title ?? ""}
        />
        <section className={styles["posts-list"]}>
          <PostList
            items={items}
            categories={categories}
            activeCategory={pageUri ?? ""}
            featuredPost={featuredPost}
            categoryBasePath="/careers/life-at-esw-blog/category/"
            allPostsHref="/careers/life-at-esw-blog/"
          />
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching careers blog category data:", error);
    return <div>Error loading careers blog category.</div>;
  }
};

export default CareersBlogCategoryPage;
