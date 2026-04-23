import { PageParams } from "@/app/[[...uri]]/page";
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

const BlogCategoryPage = async ({ params }: PageParams) => {
  const { uri } = await params;

  const pageUri = processPageUri(uri);

  if (!pageUri) notFound();

  console.log("Blog category URI:", pageUri);

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
