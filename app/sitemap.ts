/** @format */

import apiClient from "@/lib/client";
import { Page, Post, RootQueryToPageConnection, RootQueryToPostConnection } from "@/types/graphql";
import { removeNodes } from "@fridayagency/utils";

import { MetadataRoute } from "next";

export const formatDateForSitemap = (dateString: string): string => {
  // Parse input as UTC to prevent unintended shifts
  const date = new Date(`${dateString}Z`);

  // Get Ireland's timezone offset dynamically
  const offsetMinutes = date.getTimezoneOffset(); // Offset in minutes
  const offsetHours = Math.abs(offsetMinutes) / 60;
  const offsetSign = offsetMinutes <= 0 ? "+" : "-"; // Flip sign since getTimezoneOffset() is negative for UTC+

  // Format offset as ±HH:MM
  const formattedOffset = `${offsetSign}${String(Math.floor(offsetHours)).padStart(2, "0")}:${String(
    Math.abs(offsetMinutes) % 60,
  ).padStart(2, "0")}`;

  // Manually reconstruct the correct date string without any timezone conversion
  const isoString = date.toISOString().slice(0, 19); // Keep only YYYY-MM-DDTHH:mm:ss

  return `${isoString}${formattedOffset}`;
};

export const dynamic = "force-dynamic";

const URL = process.env.NEXT_PUBLIC_LOCAL_URL ?? "";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const uris = await apiClient.query<{ pages: RootQueryToPageConnection; posts: RootQueryToPostConnection }>(
    `
    query GetSitemapPages {
      pages(first: 1000) {
        edges {
          node {
            slug
            modified
          }
        }
      }
      posts(first: 1000) {
        edges {
          node {
            slug
            modified
          }
        }
      }
    }
  `,
  );

  const pages = removeNodes<Page>(uris.pages);
  const posts = removeNodes<Post>(uris.posts);

  const urisFormatted = pages.map((page) => ({
    url: `${URL}/${page.slug}`,
    lastModified: formatDateForSitemap(page.modified ?? ""),
  }));

  const postsFormatted = posts.map((post) => ({
    url: `${URL}/${post.slug}`,
    lastModified: formatDateForSitemap(post.modified ?? ""),
  }));

  return [...urisFormatted, ...postsFormatted];
}
