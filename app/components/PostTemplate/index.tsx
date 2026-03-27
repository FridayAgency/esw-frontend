import { Post } from "@/types/graphql";

import ImageComponent from "../ImageComponent";
import DateFormated from "../DateFormated";
import Editor from "../Editor";

import Container from "../Container";
import Breadcrumbs from "../Breadcrumbs";

import styles from "./PostTemplate.module.scss";

import { removeNodes } from "@fridayagency/utils";
import PostCard from "../PostCard";

const PostTemplate: React.FC<{ post: Post }> = async ({ post }) => {
  const { title, featuredImage, content, date, categories } = post;

  const relatedPosts = categories?.edges?.[0]?.node?.posts ? removeNodes<Post>(categories.edges[0].node.posts) : [];

  return (
    <>
      <article className={styles["post"]}>
        <section className={styles["post__header"]}>
          <Container flush className={styles["post__header-container"]}>
            <div className={styles["post__image"]}>
              <ImageComponent image={featuredImage?.node} />
            </div>
            <div className={styles["post__header-content"]}>
              <Breadcrumbs items={[{ href: "/insights-advice", label: "Insights & Advice" }]} title={title || ""} />
              <div className={styles["post__header-title"]}>
                <h1>{title}</h1>
                <div className={styles["post__header-details"]}>
                  <span className={styles["post__header-details-category"]}>
                    {categories?.edges.map(({ node }) => node.name).join(", ")}
                  </span>

                  <span className={styles["post__header-details-date"]}>
                    <span>Published: </span>
                    <DateFormated date={date ?? ""} />
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </section>
        {content && (
          <Container className={styles["post__content"]}>
            <Editor className={styles["post__content-editor"]} content={content} />
          </Container>
        )}

        {relatedPosts?.length && relatedPosts.map((post) => <PostCard key={post.databaseId} post={post} />)}
      </article>
    </>
  );
};

export default PostTemplate;
