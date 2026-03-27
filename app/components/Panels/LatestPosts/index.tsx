"use client";

import { useState } from "react";
import Container from "../../Container";
import PostCard from "../../PostCard";

import styles from "./LatestPosts.module.scss";

const tabs = ["News", "Blog"] as const;

const placeholderPosts = {
  News: [
    {
      databaseId: 1,
      title: "Understanding Renewable Energy Markets",
      uri: "/news/understanding-renewable-energy-markets",
      date: "2026-03-10T12:00:00",
      excerpt: "<p>An overview of the latest trends shaping renewable energy markets across Europe.</p>",
      featuredImage: null,
      categories: { edges: [{ node: { databaseId: 10, name: "Energy" } }] },
      author: { node: { name: "Jane Doe" } },
    },
    {
      databaseId: 2,
      title: "ESW Expands Operations in the UK",
      uri: "/news/esw-expands-operations-uk",
      date: "2026-03-05T12:00:00",
      excerpt: "<p>We are pleased to announce the expansion of our operations across the United Kingdom.</p>",
      featuredImage: null,
      categories: { edges: [{ node: { databaseId: 11, name: "Company" } }] },
      author: { node: { name: "John Smith" } },
    },
    {
      databaseId: 3,
      title: "New Regulations for Waste Management",
      uri: "/news/new-regulations-waste-management",
      date: "2026-02-28T12:00:00",
      excerpt: "<p>Key regulatory changes coming into effect this year for waste management providers.</p>",
      featuredImage: null,
      categories: { edges: [{ node: { databaseId: 12, name: "Regulation" } }] },
      author: { node: { name: "Alice Johnson" } },
    },
  ],
  Blog: [
    {
      databaseId: 5,
      title: "Reducing Carbon Footprint for a Major Retailer",
      uri: "/case-studies/reducing-carbon-footprint-retailer",
      date: "2026-03-01T12:00:00",
      excerpt: "<p>How we helped a leading retailer cut emissions by 40% in just two years.</p>",
      featuredImage: null,
      categories: { edges: [{ node: { databaseId: 13, name: "Retail" } }] },
    },
    {
      databaseId: 6,
      title: "Waste-to-Energy Solution for Local Council",
      uri: "/case-studies/waste-to-energy-local-council",
      date: "2026-02-15T12:00:00",
      excerpt: "<p>Implementing a waste-to-energy programme that transformed local waste processing.</p>",
      featuredImage: null,
      categories: { edges: [{ node: { databaseId: 14, name: "Public Sector" } }] },
    },
    {
      databaseId: 7,
      title: "Sustainable Packaging for Food Industry",
      uri: "/case-studies/sustainable-packaging-food-industry",
      date: "2026-02-01T12:00:00",
      excerpt: "<p>Designing sustainable packaging solutions for a national food manufacturer.</p>",
      featuredImage: null,
      categories: { edges: [{ node: { databaseId: 15, name: "Food & Beverage" } }] },
    },
  ],
};

const LatestPosts: React.FC = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("News");

  return (
    <section className={styles["latest-posts"]}>
      <Container className={styles["latest-posts__container"]}>
        <h2 className={styles["latest-posts__title"]}>Latest Posts</h2>

        <div className={styles["latest-posts__tabs"]} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`${styles["latest-posts__tab"]} ${activeTab === tab ? styles["latest-posts__tab--active"] : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className={styles.ellipse}></span>
              {tab}
            </button>
          ))}
        </div>
        <div className={styles["latest-posts__grid"]} role="tabpanel">
          {placeholderPosts[activeTab].map((post) => (
            <PostCard key={post.databaseId} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestPosts;
