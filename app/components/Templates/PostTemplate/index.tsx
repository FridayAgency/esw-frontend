import { Post, PostfieldsOpenContent_Layout, PostfieldsTldr } from "@/types/graphql";

import styles from "./PostTemplate.module.scss";

import { removeNodes } from "@fridayagency/utils";
import BlogLandingHeader from "../../Panels/BlogLandingHeader";
import FullWidthImage from "../../Panels/OpenContent/FullwidthImage";
import PostTLDR from "../../PostTLDR";
import PostContent from "../../PostContent";
import PostAuthor from "../../PostAuthor";
import LatestNews from "../../Panels/LatestNews";

const PostTemplate: React.FC<{ post: Post }> = async ({ post }) => {
  const { title, featuredImage, postfields, categories } = post;

  const relatedPosts = categories?.edges?.[0]?.node?.posts ? removeNodes<Post>(categories.edges[0].node.posts) : [];

  const tldr = postfields?.tldr ? postfields.tldr : null;

  const content = postfields?.openContent ? postfields.openContent : null;

  return (
    <>
      <article className={styles["post"]}>
        <BlogLandingHeader title={(title as string) ?? ""} reducedPadding />
        {/* TODO: ADD BREADCRUMBS */}
        <FullWidthImage image={featuredImage} />
        {tldr && <PostTLDR tldr={tldr as PostfieldsTldr[]} />}

        {content && <PostContent content={content as PostfieldsOpenContent_Layout[]} />}
        {post.author?.node && <PostAuthor author={post.author.node} />}
        {relatedPosts?.length && <LatestNews posts={relatedPosts} title="More Like This" />}
      </article>
    </>
  );
};

export default PostTemplate;
