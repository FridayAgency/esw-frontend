import { GET_LATEST_POSTS_AND_NEWS } from "@/data";
import client from "@/lib/client";
import {
  NewsArticle,
  NewsArticleConnection,
  PagePanelsPagePanelsLatestNewsLayout,
  Post,
  PostConnection,
} from "@/types/graphql";
import Container from "../../Container";
import PostCard from "../../PostCard";

import styles from "./LatestNews.module.scss";
import Button from "../../Button";
import { removeNodes } from "@fridayagency/utils";

interface LatestNewsProps {
  panel?: PagePanelsPagePanelsLatestNewsLayout;
  title?: string;
  posts?: (Post | NewsArticle)[];
  currentPostId?: number;
}

const LatestNews: React.FC<LatestNewsProps> = async ({ panel, title: propTitle, posts: propPosts, currentPostId }) => {
  const { title: panelTitle } = panel || {};

  const title = propTitle || panelTitle;

  let postsToDisplay: (Post | NewsArticle)[] = [];

  try {
    if (propPosts && propPosts.length > 0) {
      postsToDisplay = propPosts;
    } else {
      const { posts, newsArticles } = await client.query<{
        posts: PostConnection;
        newsArticles: NewsArticleConnection;
      }>(GET_LATEST_POSTS_AND_NEWS, {
        variables: { first: 10 },
      });

      const allPosts = [
        ...(posts ? (removeNodes<Post>(posts) as Post[]) : []),
        ...(newsArticles ? (removeNodes<NewsArticle>(newsArticles) as NewsArticle[]) : []),
      ];

      postsToDisplay = allPosts
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
              <PostCard
                key={post.databaseId}
                post={post}
                postType={post.__typename === "NewsArticle" ? "news" : "blog"}
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

export default LatestNews;
