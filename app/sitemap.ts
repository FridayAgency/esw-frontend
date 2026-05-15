/** @format */

import apiClient from "@/lib/client";
import {
  Campaign,
  CareerPost,
  Industry,
  NewsArticle,
  Page,
  Post,
  Product,
  RootQueryToCampaignConnection,
  RootQueryToCareerPostConnection,
  RootQueryToIndustryConnection,
  RootQueryToNewsArticleConnection,
  RootQueryToPageConnection,
  RootQueryToPostConnection,
  RootQueryToProductConnection,
} from "@/types/graphql";
import { removeNodes } from "@fridayagency/utils";

import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_LOCAL_URL ?? "";

const toSitemapEntry = (uri: string, modified: string | null | undefined) => ({
  url: `${SITE_URL}${uri}`,
  lastModified: modified ? new Date(modified) : new Date(),
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const uris = await apiClient.query<{
    pages: RootQueryToPageConnection;
    posts: RootQueryToPostConnection;
    products: RootQueryToProductConnection;
    newsArticles: RootQueryToNewsArticleConnection;
    careerPosts: RootQueryToCareerPostConnection;
    caseStudies: RootQueryToPageConnection;
    campaigns: RootQueryToCampaignConnection;
    industries: RootQueryToIndustryConnection;
  }>(
    `
    query GetSitemapPages {
      pages(first: 1000) {
        edges {
          node {
            uri
            modified
          }
        }
      }
      posts(first: 1000) {
        edges {
          node {
            uri
            modified
          }
        }
      }
      products(first: 1000) {
        edges {
          node {
            uri
            modified
          }
        }
      }
      newsArticles(first: 1000) {
        edges {
          node {
            uri
            modified
          }
        }
      }
      careerPosts(first: 1000) {
        edges {
          node {
            uri
            modified
          }
        }
      }
      caseStudies(first: 1000) {
        edges {
          node {
            uri
            modified
          }
        }
      }
      campaigns(first: 1000) {
        edges {
          node {
            uri
            modified
          }
        }
      }
      industries(first: 1000) {
        edges {
          node {
            uri
            modified
          }
        }
      }
    }
  `,
  );

  const pages = removeNodes<Page>(uris.pages);
  const posts = removeNodes<Post>(uris.posts);
  const products = removeNodes<Product>(uris.products);
  const newsArticles = removeNodes<NewsArticle>(uris.newsArticles);
  const careerPosts = removeNodes<CareerPost>(uris.careerPosts);
  const caseStudies = removeNodes<Page>(uris.caseStudies);
  const campaigns = removeNodes<Campaign>(uris.campaigns);
  const industries = removeNodes<Industry>(uris.industries);

  const allEntries = [
    ...pages.map((p) => toSitemapEntry(p.uri ?? "", p.modified)),
    ...posts.map((p) => toSitemapEntry(`/blog${p.uri ?? ""}`, p.modified)),
    ...products.map((p) => toSitemapEntry(p.uri ?? "", p.modified)),
    ...newsArticles.map((p) => toSitemapEntry(p.uri ?? "", p.modified)),
    ...careerPosts.map((p) => toSitemapEntry(p.uri ?? "", p.modified)),
    ...caseStudies.map((p) => toSitemapEntry(p.uri ?? "", p.modified)),
    ...campaigns.map((p) => toSitemapEntry(p.uri ?? "", p.modified)),
    ...industries.map((p) => toSitemapEntry(p.uri ?? "", p.modified)),
  ];

  const seen = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of allEntries) {
    const existing = seen.get(entry.url);
    if (!existing || (entry.lastModified as Date) > (existing.lastModified as Date)) {
      seen.set(entry.url, entry);
    }
  }

  return Array.from(seen.values());
}
