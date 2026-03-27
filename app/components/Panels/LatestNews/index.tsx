import { GET } from "@/app/api/submit-contact/route";
import { GET_POSTS } from "@/data/fragments";
import client from "@/lib/client";
import { PagePanelsPagePanelsLatestNewsLayout, PostConnection } from "@/types/graphql";
import Container from "../../Container";
import PostCard from "../../PostCard";

import style from "./LatestNews.module.scss";

export const LATESTNEWS_FRAGMENT = `
    fieldGroupName
    subtitle
    title
`;

const LatestNews: React.FC<{ panel: PagePanelsPagePanelsLatestNewsLayout }> = async ({ panel }) => {
  const { title, subtitle } = panel;

  try {
    const { posts } = await client.query<{ posts: PostConnection }>(GET_POSTS, {
      variables: { first: 4 },
    });

    return (
      <section className={style["latest-news"]}>
        <Container grid className={style["latest-news__container"]}>
          <div className={style["latest-news__content"]}>
            {subtitle && <p className={style["latest-news__subtitle"]}>{subtitle}</p>}
            {title && <h2 className={style["latest-news__title"]}>{title}</h2>}
          </div>
          {posts && posts.edges.length > 0 && (
            <div className={style["latest-news__posts"]}>
              {posts.edges.map(({ node }) => (
                <PostCard key={node.databaseId} post={node} />
              ))}
            </div>
          )}
        </Container>
      </section>
    );
  } catch (error) {
    console.error("Error fetching posts for LatestNews panel:", error);
    return null; // or some fallback UI
  }
};

export default LatestNews;
