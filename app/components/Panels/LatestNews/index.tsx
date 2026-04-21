import { GET } from "@/app/api/submit-contact/route";
import { GET_POSTS } from "@/data/fragments";
import client from "@/lib/client";
import { PagePanelsPagePanelsLatestNewsLayout, Post, PostConnection } from "@/types/graphql";
import Container from "../../Container";
import PostCard from "../../PostCard";

import styles from "./LatestNews.module.scss";
import Button from "../../Button";
import { removeNodes } from "@fridayagency/utils";

interface LatestNewsProps {
  panel?: PagePanelsPagePanelsLatestNewsLayout;
  title?: string;
  posts?: Post[];
}

const LatestNews: React.FC<LatestNewsProps> = async ({ panel, title: propTitle, posts: propPosts }) => {
  const { title: panelTitle } = panel || {};

  const title = propTitle || panelTitle;

  let postsToDisplay: Post[] = [];

  try {
    if (propPosts && propPosts.length > 0) {
      postsToDisplay = propPosts;
    } else {
      const { posts } = await client.query<{ posts: PostConnection }>(GET_POSTS, {
        variables: { first: 3 },
      });

      postsToDisplay = posts ? removeNodes<Post>(posts) : [];
    }

    return (
      <section className={styles["latest-posts"]}>
        <Container className={styles["latest-posts__container"]}>
          <h2 className={styles["latest-posts__title"]}>{title}</h2>
          <div className={styles["latest-posts__grid"]} role="tabpanel">
            {postsToDisplay.map((post) => (
              <PostCard key={post.databaseId} post={post} />
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
