import { GET_NEWS_ARTICLES } from "@/data";
import client from "@/lib/client";
import {
  NewsArticleConnection,
  NewsCategory,
  PagePanelsPagePanelsNewsListLayout,
  PagePanelsPagePanelsPostsListLayout,
  Post,
  RootQueryToNewsCategoryConnection,
} from "@/types/graphql";

import { removeNodes } from "@fridayagency/utils";
import PostsList from "../../PostsList";

import styles from "./PostsList.module.scss";
import BlogLandingSchema from "@/app/Schema/Schemas/BlogLandingSchema";

interface PostListProps {
  panel: PagePanelsPagePanelsNewsListLayout;
}

const NewsList: React.FC<PostListProps> = async ({ panel }) => {
  const { newsArticles, newsCategories } = await client.query<{
    newsArticles: NewsArticleConnection;
    newsCategories: RootQueryToNewsCategoryConnection;
  }>(GET_NEWS_ARTICLES);

  const items = newsArticles ? removeNodes(newsArticles) : [];

  const rawCategories = newsCategories ? removeNodes<NewsCategory>(newsCategories) : [];

  const featuredItem = ((panel?.featuredPost as any)?.nodes?.[0] as Post) ?? undefined;

  return (
    <>
      <BlogLandingSchema posts={items} section="news" />
      <section className={styles["posts-list"]}>
        <PostsList
          items={items}
          categories={rawCategories}
          featuredPost={featuredItem}
          activeCategory="all"
          categoryBasePath="/newsroom/category/"
        />
      </section>
    </>
  );
};

export default NewsList;
