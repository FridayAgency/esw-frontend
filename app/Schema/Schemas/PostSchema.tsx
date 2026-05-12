import { CareerPost, NewsArticle, Post } from "@/types/graphql";
import { createBreadcrumbSchema, generateSchemaIds, renderSchema } from "../utils";

const PostSchema: React.FC<{ post: Post | NewsArticle | CareerPost }> = ({ post }) => {
  const ids = generateSchemaIds(post.uri || "/");

  const authorNode = post?.author?.node;
  const authorSlug =
    authorNode?.slug ||
    (authorNode?.name
      ? authorNode.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "")
      : "author");
  const authorPath = `/blog/author/${authorSlug}/`;
  const authorIds = generateSchemaIds(authorPath);
  const authorBase =
    authorIds.webpageId && authorIds.webpageId.includes("#")
      ? authorIds.webpageId.split("#")[0]
      : (authorIds.webpageId || "").replace(/\/$/, "");
  const authorPersonId = `${authorBase}#person`;

  const categoryEdges =
    "categories" in post
      ? post.categories?.edges
      : "newsCategories" in post
        ? post.newsCategories?.edges
        : "careerCategories" in post
          ? post.careerCategories?.edges
          : undefined;

  const primaryCategory = categoryEdges?.find((edge: any) => edge.isPrimary)?.node as any;
  const otherCategories = categoryEdges?.filter((edge: any) => !edge.isPrimary).map((edge: any) => edge.node as any);

  const schemaObject = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${ids.pageUrl}#article`,
        headline: post.title,
        description: post.seo?.metaDesc || "",
        image: post.featuredImage?.node?.sourceUrl || "",

        datePublished: post.date,
        dateModified: post.modified,
        author: {
          "@type": "Person",
          "@id": authorPersonId,
          name: authorNode?.name || "Unknown Author",
        },
        publisher: { "@type": "Organization", "@id": ids.organizationId },
        ...(otherCategories && otherCategories.length > 0 ? { keywords: otherCategories.map((cat) => cat.name) } : {}),

        articleSection: primaryCategory?.name || otherCategories?.[0]?.name || "Uncategorized",
        wordCount: post.content ? post.content.replace(/<[^>]+>/g, "").split(/\s+/).length : 0,
      },
      {
        "@type": "WebPage",
        "@id": ids.webpageId,
        url: ids.pageUrl,
        name: post.title,
        isPartOf: { "@id": ids.websiteId },
        breadcrumb: { "@id": `${ids.pageUrl}#breadcrumb` },
        inLanguage: "en-IE",
      },
      {
        "@type": "Organization",
        "@id": ids.organizationId,
        name: "ESW",
        url: ids.websiteId,
      },
      createBreadcrumbSchema(post, `${ids.pageUrl}#breadcrumb`),
    ],
  };

  return renderSchema(schemaObject);
};

export default PostSchema;
