import { GET } from "@/app/api/submit-contact/route";
import { GET_LATEST_POSTS_AND_NEWS, GET_POSTS } from "@/data";
import client from "@/lib/client";
import {
  CareerPost,
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
  posts?: (Post | NewsArticle | CareerPost)[];
}

const LatestNews: React.FC<LatestNewsProps> = async ({ panel, title: propTitle, posts: propPosts }) => {
  const { title: panelTitle } = panel || {};

  const title = propTitle || panelTitle;

  let postsToDisplay: (Post | NewsArticle | CareerPost)[] = [];

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
                postType={
                  post.__typename === "NewsArticle"
                    ? "news"
                    : post.__typename === "CareerPost"
                      ? "career"
                      : "blog"
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

export default LatestNews;
