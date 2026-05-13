import PostList from "@/app/components/PostsList";
import { GET_NEWS_ARTICLES_BY_CATEGORY } from "@/data";
import client from "@/lib/client";
import {
  NewsArticle,
  NewsCategory,
  Page,
  PagePanelsPagePanelsNewsListLayout,
  RootQueryToNewsCategoryConnection,
} from "@/types/graphql";
import { processPageUri, removeNodes } from "@fridayagency/utils";

import { Metadata, NextPage } from "next";
import { generateCategorySeoMetadata } from "@/lib/seo";
import PagePanels from "@/app/components/PagePanels";

import styles from "./Page.module.scss";
import BlogLandingSchema from "@/app/Schema/Schemas/BlogLandingSchema";

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

  return generateCategorySeoMetadata(pageUri, "newsCategory");
}

const NewsCategoryPage: NextPage<PageParams> = async ({ params }) => {
  const { slug } = await params;

  const pageUri = processPageUri(slug);
  const categorySlug = pageUri?.replaceAll("/", "") ?? "";

  try {
    const { page, filteredCategory, newsCategories } = await client.query<{
      page: Page;
      filteredCategory: RootQueryToNewsCategoryConnection;
      newsCategories: RootQueryToNewsCategoryConnection;
    }>(GET_NEWS_ARTICLES_BY_CATEGORY, {
      variables: { first: 50, slug: [categorySlug] },
    });

    const categoryNode = filteredCategory?.edges?.[0]?.node;
    const items = categoryNode?.newsArticles ? removeNodes<NewsArticle>(categoryNode.newsArticles as any) : [];
    const categories = newsCategories ? removeNodes<NewsCategory>(newsCategories) : [];

    const newsListPanel = page?.pagePanels?.pagePanels?.find(
      (panel): panel is PagePanelsPagePanelsNewsListLayout =>
        (panel as any)?.__typename === "PagePanelsPagePanelsNewsListLayout",
    );
    const featuredPost = ((newsListPanel?.featuredPost as any)?.nodes?.[0] as NewsArticle) ?? undefined;

    return (
      <>
        <BlogLandingSchema
          posts={items}
          section="news"
          category={categories.find((cat) => cat.slug === categorySlug)}
        />
        <PagePanels
          panels={
            page?.pagePanels?.pagePanels?.filter(
              (panel): panel is NonNullable<typeof panel> =>
                panel !== null &&
                Object.keys(panel).length > 0 &&
                (panel as any).__typename !== "PagePanelsPagePanelsPostsListLayout" &&
                (panel as any).__typename !== "PagePanelsPagePanelsNewsListLayout",
            ) ?? undefined
          }
          pageTitle={page?.title ?? ""}
        />
        <section className={styles["posts-list"]}>
          <PostList
            items={items}
            categories={categories}
            activeCategory={pageUri ?? ""}
            categoryBasePath="/newsroom/category"
            allPostsHref="/newsroom"
            featuredPost={featuredPost}
          />
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching news category data:", error);
    return <div>Error loading news category.</div>;
  }
};

export default NewsCategoryPage;
