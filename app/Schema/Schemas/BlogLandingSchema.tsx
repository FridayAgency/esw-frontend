import React from "react";
import { createBreadcrumbSchema, generateSchemaIds, renderSchema } from "../utils";
import { Category, Page, Post } from "@/types/graphql";

const URI = process.env.NEXT_PUBLIC_LOCAL_URL;

const BlogLandingSchema: React.FC<{ posts: Post[]; page?: Page; category?: Category }> = ({
  posts,
  page,
  category,
}) => {
  const uri = category ? "/blog/category/" + category.slug : "/blog/";

  const ids = generateSchemaIds(uri);

  const schemaObject = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": ids.webpageId,
        url: ids.pageUrl,
        name: page?.seo?.title || category?.seo?.title || "",
        description: page?.seo?.metaDesc || category?.seo?.metaDesc || "",
        breadcrumb: { "@id": ids.breadcrumbId },
        ...(posts.length > 0 && {
          mainEntity: {
            "@type": "ItemList",
            name: "Recent Articles",
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
              { url: `${URI}/news/`, text: "News" },
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
