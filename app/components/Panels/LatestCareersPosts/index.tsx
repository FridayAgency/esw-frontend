import { GET_CAREER_POSTS } from "@/data";
import client from "@/lib/client";
import {
  CareerPost,
  CareerPostConnection,
  NewsArticle,
  PagePanelsPagePanelsLatestCareersPostsLayout,
  Post,
} from "@/types/graphql";
import Container from "../../Container";
import PostCard from "../../PostCard";

import styles from "./LatestNews.module.scss";
import Button from "../../Button";
import { removeNodes } from "@fridayagency/utils";

interface LatestNewsProps {
  panel?: PagePanelsPagePanelsLatestCareersPostsLayout;
  title?: string;
  posts?: (Post | NewsArticle | CareerPost)[];
  currentPostId?: number;
}

const LatestCareersPosts: React.FC<LatestNewsProps> = async ({
  panel,
  title: propTitle,
  posts: propPosts,
  currentPostId,
}) => {
  const { title: panelTitle } = panel || {};

  const title = propTitle || panelTitle;

  let postsToDisplay: (Post | NewsArticle | CareerPost)[] = [];

  try {
    if (propPosts && propPosts.length > 0) {
      postsToDisplay = propPosts;
    } else {
      const { careerPosts } = await client.query<{
        careerPosts: CareerPostConnection;
      }>(GET_CAREER_POSTS, {
        variables: { first: 10 },
      });

      postsToDisplay = (removeNodes<CareerPost>(careerPosts) as CareerPost[])
        .sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime())
        .filter((p) => p.databaseId !== currentPostId)
        .slice(0, 3);
    }

    return (
      <section className={styles["latest-posts"]}>
        <Container className={styles["latest-posts__container"]}>
          <h2 className={styles["latest-posts__title"]}>{title}</h2>
          <div className={styles["latest-posts__grid"]} role="tabpanel">
            {postsToDisplay.map((post) => (
              <PostCard key={post.databaseId} post={post} postType="career" />
            ))}

            <span className={styles["latest-posts__cta"]}>
              <Button variant="text" className={styles["latest-posts__button"]} href="/careers/life-at-esw-blog/">
                View More
              </Button>
            </span>
          </div>
        </Container>
      </section>
    );
  } catch (error) {
    console.error("Error fetching posts for LatestNews panel:", error);
    return null; // or some fallback UI
  }
};

export default LatestCareersPosts;
