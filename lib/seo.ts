import { convertSeo } from "@fridayagency/utils";
import { Metadata } from "next";
import client from "./client";
import { Category, ContentNode, User } from "@/types/graphql";
import { GET_AUTHOR_SEO, GET_CATEGORY_SEO, GET_SEO } from "@/data";

/**
 * Helper to create fallback metadata
 */
function createFallbackMetadata(title: string, description: string): Metadata {
  return { title, description };
}

/**
 * Helper to handle SEO errors consistently
 */
function handleSeoError(error: unknown, type: string, identifier: string, fallbackTitle: string): Metadata {
  console.error(`Error generating ${type} metadata:`, identifier, error);
  return createFallbackMetadata(fallbackTitle, `The requested ${type} could not be found.`);
}

/**
 * Helper to convert SEO data with environment URL replacement
 */
function convertSeoWithEnv(seoData: any): Metadata {
  return convertSeo(seoData, process.env.NEXT_PUBLIC_WORDPRESS_URL ?? "", process.env.NEXT_PUBLIC_LOCAL_URL ?? "");
}

/**
 * Generate metadata for any post type (page, post, job, work)
 * @param uri - The URI to fetch SEO data for (can be null for error handling)
 * @param postType - The GraphQL post type (page, post, job, work)
 * @param fallbackTitle - Optional fallback title if SEO data not found
 * @returns Metadata object
 */
export async function generateSeoMetadata(uri: string | null, fallbackTitle = "Page Not Found"): Promise<Metadata> {
  if (!uri) {
    return createFallbackMetadata(fallbackTitle, "The requested page could not be found.");
  }

  try {
    const seo = await client
      .query<{ contentNode: ContentNode }>(GET_SEO, {
        variables: { uri },
      })
      .then((res) => res.contentNode);

    if (!seo) {
      return createFallbackMetadata(fallbackTitle, "The requested page could not be found.");
    }

    return convertSeoWithEnv(seo);
  } catch (error) {
    return handleSeoError(error, "page", uri, fallbackTitle);
  }
}

export async function generateCategorySeoMetadata(
  slug: string | null,
  fallbackTitle = "Page Not Found",
): Promise<Metadata> {
  if (!slug) {
    return createFallbackMetadata(fallbackTitle, "The requested page could not be found.");
  }

  try {
    const { category } = await client.query<{ category: Category }>(GET_CATEGORY_SEO, {
      variables: { id: slug },
    });

    if (!category?.seo) {
      return createFallbackMetadata(fallbackTitle, "The requested page could not be found.");
    }

    return convertSeoWithEnv(category?.seo);
  } catch (error) {
    return handleSeoError(error, "page", slug, fallbackTitle);
  }
}

export async function generateAuthorSeoMetadata(
  slug: string | null,
  fallbackTitle = "Page Not Found",
): Promise<Metadata> {
  if (!slug) {
    return createFallbackMetadata(fallbackTitle, "The requested page could not be found.");
  }

  try {
    const { user } = await client.query<{ user: User }>(GET_AUTHOR_SEO, {
      variables: { id: slug },
    });

    if (!user?.seo) {
      return createFallbackMetadata(fallbackTitle, "The requested page could not be found.");
    }

    return convertSeoWithEnv(user?.seo);
  } catch (error) {
    return handleSeoError(error, "page", slug, fallbackTitle);
  }
}
