import { GET_CAREER_POSTS, GET_LATEST_POSTS_AND_NEWS } from "@/data";
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
  panel: PagePanelsPagePanelsLatestCareersPostsLayout;
}

const LatestCareersPosts: React.FC<LatestNewsProps> = async ({ panel }) => {
  const { title } = panel || {};

  let postsToDisplay: (Post | NewsArticle | CareerPost)[] = [];

  try {
    const { careerPosts } = await client.query<{
      careerPosts: CareerPostConnection;
    }>(GET_CAREER_POSTS, {
      variables: { first: 3 },
    });

    postsToDisplay = removeNodes<CareerPost>(careerPosts);

    return (
      <section className={styles["latest-posts"]}>
        <Container className={styles["latest-posts__container"]}>
          <h2 className={styles["latest-posts__title"]}>{title}</h2>
          <div className={styles["latest-posts__grid"]} role="tabpanel">
            {postsToDisplay.map((post) => (
              <PostCard
                key={post.databaseId}
                post={post}
                postType={
                  post.__typename === "NewsArticle" ? "news" : post.__typename === "CareerPost" ? "career" : "blog"
                }
              />
            ))}

            <span className={styles["latest-posts__cta"]}>
              <Button variant="text" className={styles["latest-posts__button"]} href="/blog">
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
