import Button from "../../Button";
import Container from "../../Container";
import PostCard from "../../PostCard";

import styles from "./LatestPosts.module.scss";

const placeholderPosts = [
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
];

const LatestPosts: React.FC = () => {
  return (
    <section className={styles["latest-posts"]}>
      <Container className={styles["latest-posts__container"]}>
        <h2 className={styles["latest-posts__title"]}>Articles of Interest</h2>
        <div className={styles["latest-posts__grid"]} role="tabpanel">
          {placeholderPosts.map((post) => (
            <PostCard key={post.databaseId} post={post} />
          ))}

          <span className={styles["latest-posts__cta"]}>
            <Button variant="outline" className={styles["latest-posts__button"]} href="/blog">
              View More
            </Button>
          </span>
        </div>
      </Container>
    </section>
  );
};

export default LatestPosts;
