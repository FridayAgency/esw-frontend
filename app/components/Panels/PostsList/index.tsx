import { GET_POSTS } from "@/data";
import client from "@/lib/client";
import {
  Category,
  PagePanelsPagePanelsPostsListLayout,
  Post,
  PostConnection,
  RootQueryToCategoryConnection,
} from "@/types/graphql";

import { removeNodes } from "@fridayagency/utils";
import PostsList from "../../PostsList";

import styles from "./PostsList.module.scss";
import BlogLandingSchema from "@/app/Schema/Schemas/BlogLandingSchema";

interface PostListProps {
  panel: PagePanelsPagePanelsPostsListLayout;
}

const PostList: React.FC<PostListProps> = async ({ panel }) => {
  const { posts, categories } = await client.query<{
    posts: PostConnection;
    categories: RootQueryToCategoryConnection;
  }>(GET_POSTS);

  const items = posts ? removeNodes<Post>(posts) : [];

  const rawCategories = categories ? removeNodes<Category>(categories) : [];

  const activeCategoryIds = new Set(
    items.flatMap((post) => post.categories?.edges?.map((e) => e?.node?.databaseId).filter(Boolean) ?? []),
  );
  const filteredCategories = rawCategories.filter((cat) => activeCategoryIds.has(cat.databaseId));

  const featuredItem = ((panel?.featuredPost as any)?.nodes?.[0] as Post) ?? undefined;

  return (
    <>
      <BlogLandingSchema posts={items} section="blog" />
      <section className={styles["posts-list"]}>
        <PostsList items={items} categories={filteredCategories} featuredPost={featuredItem} activeCategory="all" />
      </section>
    </>
  );
};

export default PostList;
