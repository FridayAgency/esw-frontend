import React from "react";
import { createBreadcrumbSchema, generateSchemaIds, renderSchema } from "../utils";
import { CareerCategory, CareerPost, Category, NewsArticle, NewsCategory, Page, Post } from "@/types/graphql";

const URI = process.env.NEXT_PUBLIC_LOCAL_URL;

type AnyPost = Pick<Post | NewsArticle | CareerPost, "title" | "uri">;
type AnyCategory = Pick<Category | NewsCategory | CareerCategory, "slug" | "seo">;

type Section = "blog" | "news" | "careers";

const SECTION_CONFIG: Record<
  Section,
  { basePath: string; categoryPath: string; breadcrumbText: string; listName: string }
> = {
  blog: {
    basePath: "/blog/",
    categoryPath: "/blog/category/",
    breadcrumbText: "Blog",
    listName: "Recent Blog Posts",
  },
  news: {
    basePath: "/newsroom/",
    categoryPath: "/newsroom/category/",
    breadcrumbText: "Newsroom",
    listName: "Recent News Articles",
  },
  careers: {
    basePath: "/careers/life-at-esw-blog/",
    categoryPath: "/careers/life-at-esw-blog/category/",
    breadcrumbText: "Life at ESW Blog",
    listName: "Recent Career Posts",
  },
};

const BlogLandingSchema: React.FC<{
  posts: AnyPost[];
  section: Section;
  page?: Page;
  category?: AnyCategory;
}> = ({ posts, section, page, category }) => {
  const config = SECTION_CONFIG[section];
  const uri = category ? config.categoryPath + category.slug : config.basePath;

  const ids = generateSchemaIds(uri);

  const schemaObject = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": category ? "CollectionPage" : "Blog",
        "@id": ids.webpageId,
        url: ids.pageUrl,
        name: page?.seo?.title || category?.seo?.title || "",
        description: page?.seo?.metaDesc || category?.seo?.metaDesc || "",
        isPartOf: { "@id": ids.websiteId },
        about: { "@id": ids.organizationId },
        inLanguage: "en-IE",
        breadcrumb: { "@id": ids.breadcrumbId },
        ...(posts.length > 0 && {
          mainEntity: {
            "@type": "ItemList",
            name: config.listName,
            itemListElement: posts.slice(0, 9).map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${URI}${post.uri}`,
              name: post.title,
            })),
          },
        }),
      },
      createBreadcrumbSchema(
        {
          seo: {
            breadcrumbs: [
              { url: `${URI}/`, text: "Home" },
              { url: `${URI}${config.basePath}`, text: config.breadcrumbText },
              ...(category
                ? [{ url: `${URI}${config.categoryPath}${category.slug}/`, text: category.seo?.title || "" }]
                : []),
            ],
          },
        } as Page,
        ids.breadcrumbId,
      ),
    ],
  };

  return renderSchema(schemaObject);
};

export default BlogLandingSchema;
