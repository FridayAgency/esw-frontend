/** @format */

import apiClient from "@/lib/client";
import {
  CareerPost,
  Industry,
  NewsArticle,
  Page,
  Post,
  Product,
  RootQueryToCareerPostConnection,
  RootQueryToIndustryConnection,
  RootQueryToNewsArticleConnection,
  RootQueryToPageConnection,
  RootQueryToPostConnection,
  RootQueryToProductConnection,
} from "@/types/graphql";
import { removeNodes } from "@fridayagency/utils";
import HeroHeaderSimple from "../components/Panels/HeroHeaderSimple";
import Container from "../components/Container";
import styles from "./SiteMap.module.scss";

interface SitemapGroup {
  label: string;
  items: { uri?: string | null; title?: string | null }[];
}

const SiteMapPage = async () => {
  const data = await apiClient.query<{
    pages: RootQueryToPageConnection;
    posts: RootQueryToPostConnection;
    products: RootQueryToProductConnection;
    newsArticles: RootQueryToNewsArticleConnection;
    careerPosts: RootQueryToCareerPostConnection;
    caseStudies: RootQueryToPageConnection;
    industries: RootQueryToIndustryConnection;
  }>(
    `
    query GetSitemapPages {
      pages(first: 1000) {
        edges {
          node {
            uri
            title
            modified
          }
        }
      }
      posts(first: 1000) {
        edges {
          node {
            uri
            title
            modified
          }
        }
      }
      products(first: 1000) {
        edges {
          node {
            uri
            title
            modified
          }
        }
      }
      newsArticles(first: 1000) {
        edges {
          node {
            uri
            title
            modified
          }
        }
      }
      careerPosts(first: 1000) {
        edges {
          node {
            uri
            title
            modified
          }
        }
      }
      caseStudies(first: 1000) {
        edges {
          node {
            uri
            title
            modified
          }
        }
      }
      industries(first: 1000) {
        edges {
          node {
            uri
            title
            modified
          }
        }
      }
    }
  `,
  );

  const pages = removeNodes<Page>(data.pages);
  const posts = removeNodes<Post>(data.posts);
  const products = removeNodes<Product>(data.products);
  const newsArticles = removeNodes<NewsArticle>(data.newsArticles);
  const careerPosts = removeNodes<CareerPost>(data.careerPosts);
  const caseStudies = removeNodes<Page>(data.caseStudies);
  const industries = removeNodes<Industry>(data.industries);

  const sortByTitle = <T extends { title?: string | null }>(items: T[]) =>
    [...items].sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));

  const groups: SitemapGroup[] = [
    { label: "Pages", items: sortByTitle(pages) },
    { label: "Blog", items: sortByTitle(posts).map((p) => ({ ...p, uri: p.uri ? `/blog${p.uri}` : p.uri })) },
    { label: "Products", items: sortByTitle(products) },
    { label: "News", items: sortByTitle(newsArticles) },
    { label: "Case Studies", items: sortByTitle(caseStudies) },
    { label: "Industries", items: sortByTitle(industries) },
    { label: "Careers Blog", items: sortByTitle(careerPosts) },
  ].filter((group) => group.items.length > 0);

  return (
    <>
      <HeroHeaderSimple title="Site Map" />
      <section className={styles["sitemap"]}>
        <Container>
          <nav aria-label="Site map">
            <ul className={styles["sitemap__grid"]} role="list">
              {groups.map((group) => (
                <li key={group.label} className={styles["sitemap__group"]}>
                  <h2 className={styles["sitemap__group-title"]}>{group.label}</h2>
                  <ul className={styles["sitemap__list"]} role="list">
                    {group.items.map((item) =>
                      item.uri ? (
                        <li key={item.uri} className={styles["sitemap__item"]}>
                          <a href={item.uri} className={styles["sitemap__link"]}>
                            {item.title || item.uri}
                          </a>
                        </li>
                      ) : null,
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </>
  );
};

export default SiteMapPage;
