import { GET_CAREER_POSTS } from "@/data";
import client from "@/lib/client";
import {
  CareerCategory,
  CareerPost,
  CareerPostConnection,
  PagePanelsPagePanelsCareersBlogListLayout,
  Post,
  RootQueryToCareerCategoryConnection,
} from "@/types/graphql";

import { removeNodes } from "@fridayagency/utils";
import PostsList from "../../PostsList";

import styles from "./PostsList.module.scss";
import BlogLandingSchema from "@/app/Schema/Schemas/BlogLandingSchema";

interface PostListProps {
  panel: PagePanelsPagePanelsCareersBlogListLayout;
}

const CareersBlogList: React.FC<PostListProps> = async ({ panel }) => {
  const { careerPosts, careerCategories } = await client.query<{
    careerPosts: CareerPostConnection;
    careerCategories: RootQueryToCareerCategoryConnection;
  }>(GET_CAREER_POSTS);

  const items = careerPosts ? removeNodes<CareerPost>(careerPosts) : [];

  const rawCategories = careerCategories ? removeNodes<CareerCategory>(careerCategories) : [];

  const activeCategorySlugs = new Set(
    items.flatMap((post) => post.careerCategories?.edges?.map((e) => e?.node?.slug).filter(Boolean) ?? []),
  );
  const categories = rawCategories.filter((cat) => cat.slug && activeCategorySlugs.has(cat.slug));

  const featuredItem = ((panel?.featuredPost as any)?.nodes?.[0] as Post) ?? undefined;

  return (
    <>
      <BlogLandingSchema posts={items} section="careers" />
      <section className={styles["posts-list"]}>
        <PostsList
          items={items}
          categories={categories}
          featuredPost={featuredItem}
          activeCategory="all"
          categoryBasePath="/careers/life-at-esw-blog/category"
        />
      </section>
    </>
  );
};

export default CareersBlogList;
