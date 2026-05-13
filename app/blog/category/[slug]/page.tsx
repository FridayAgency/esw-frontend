import PagePanels from "@/app/components/PagePanels/PagePanels";
import PostsList from "@/app/components/PostsList";
import notFound from "@/app/not-found";
import { GET_POSTS_BY_CATEGORY } from "@/data";
import client from "@/lib/client";
import {
  Category,
  Page,
  PagePanelsPagePanelsPostsListLayout,
  Post,
  RootQueryToCategoryConnection,
  RootQueryToPostConnection,
} from "@/types/graphql";
import { processPageUri, removeNodes } from "@fridayagency/utils";

import styles from "./Page.module.scss";
import { generateCategorySeoMetadata } from "@/lib/seo";
import { Metadata } from "next";
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

  return generateCategorySeoMetadata(pageUri, "category");
}

const BlogCategoryPage = async ({ params }: PageParams) => {
  const { slug } = await params;

  const pageUri = processPageUri(slug);

  if (!pageUri) notFound();

  const { page, posts, categories } = await client.query<{
    page: Page;
    posts: RootQueryToPostConnection;
    categories: RootQueryToCategoryConnection;
  }>(GET_POSTS_BY_CATEGORY, {
    variables: { categoryName: pageUri },
  });

  const postsLists = posts ? removeNodes<Post>(posts) : [];
  const rawCategories = categories ? removeNodes<Category>(categories) : [];

  const postsListPanel = page?.pagePanels?.pagePanels?.find(
    (panel): panel is PagePanelsPagePanelsPostsListLayout =>
      (panel as any)?.__typename === "PagePanelsPagePanelsPostsListLayout",
  );
  const featuredPost = ((postsListPanel?.featuredPost as any)?.nodes?.[0] as Post) ?? undefined;

  return (
    <>
      <BlogLandingSchema
        posts={postsLists}
        section="blog"
        category={rawCategories.find((cat) => cat.slug === pageUri)}
      />
      <PagePanels
        panels={
          page?.pagePanels?.pagePanels?.filter(
            (panel): panel is NonNullable<typeof panel> =>
              panel !== null &&
              Object.keys(panel).length > 0 &&
              (panel as any).__typename !== "PagePanelsPagePanelsPostsListLayout",
          ) ?? undefined
        }
        pageTitle={page.title ?? ""}
      />
      <section className={styles["posts-list"]}>
        <PostsList
          items={postsLists}
          categories={rawCategories}
          featuredPost={featuredPost}
          activeCategory={pageUri ?? ""}
        />
      </section>
    </>
  );
};

export default BlogCategoryPage;
