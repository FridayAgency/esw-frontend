import { CareerPost, NewsArticle, Post, PostfieldsOpenContent_Layout, PostfieldsTldr } from "@/types/graphql";

import styles from "./PostTemplate.module.scss";

import { removeNodes } from "@fridayagency/utils";
import BlogLandingHeader from "../../Panels/BlogLandingHeader";
import Breadcrumbs from "../../Breadcrumbs";
import FullWidthImage from "../../Panels/OpenContent/FullwidthImage";
import PostTLDR from "../../PostTLDR";
import PostContent from "../../PostContent";
import PostAuthor from "../../PostAuthor";
import LatestNews from "../../Panels/LatestNews";
import LatestCareersPosts from "../../Panels/LatestCareersPosts";
import PostSchema from "@/app/Schema/Schemas/PostSchema";
import { calculateReadTime } from "@/lib/readTime";

const PostTemplate: React.FC<{ post: Post | NewsArticle | CareerPost }> = async ({ post }) => {
  const { title, featuredImage, postfields } = post;

  let relatedPosts: (Post | NewsArticle | CareerPost)[] = [];
  if ("categories" in post && post.categories?.edges?.[0]?.node?.posts) {
    relatedPosts = removeNodes<Post>(post.categories.edges[0].node.posts);
  } else if ("newsCategories" in post && post.newsCategories?.edges?.[0]?.node?.newsArticles) {
    relatedPosts = removeNodes<NewsArticle>(post.newsCategories.edges[0].node.newsArticles);
  } else if ("careerCategories" in post && post.careerCategories?.edges?.[0]?.node?.careerPosts) {
    relatedPosts = removeNodes<CareerPost>(post.careerCategories.edges[0].node.careerPosts);
  }

  relatedPosts = relatedPosts.filter((p) => p.databaseId !== post.databaseId);

  const tldr = postfields?.tldr ? postfields.tldr : null;

  const content = postfields?.openContent ? postfields.openContent : null;

  const isCareerPost = post.__typename === "CareerPost";

  const breadcrumbItems =
    post.__typename === "NewsArticle"
      ? [{ href: "/newsroom", label: "Newsroom" }]
      : post.__typename === "CareerPost"
        ? [{ href: "/careers/life-at-esw-blog", label: "Life at ESW Blog" }]
        : [{ href: "/blog", label: "Blog" }];

  const readTime = content ? calculateReadTime(content as unknown[]) : undefined;

  return (
    <>
      <PostSchema post={post} />
      <article className={styles["post"]}>
        <BlogLandingHeader title={(title as string) ?? ""} reducedPadding />
        <Breadcrumbs items={breadcrumbItems} title={(title as string) ?? ""} readTime={readTime} />
        <FullWidthImage image={featuredImage} />
        {tldr && <PostTLDR tldr={tldr as PostfieldsTldr[]} />}

        {content && <PostContent content={content as PostfieldsOpenContent_Layout[]} />}
        {post.author?.node && <PostAuthor author={post.author.node} />}
        {isCareerPost ? (
          <LatestCareersPosts
            posts={relatedPosts.length ? (relatedPosts as CareerPost[]) : undefined}
            title="More Like This"
            currentPostId={post.databaseId}
          />
        ) : (
          <LatestNews
            posts={relatedPosts.length ? (relatedPosts as (Post | NewsArticle)[]) : undefined}
            title="More Like This"
            currentPostId={post.databaseId}
          />
        )}
      </article>
    </>
  );
};

export default PostTemplate;
