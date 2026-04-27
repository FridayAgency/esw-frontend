"use client";

import { Category, NewsArticle, NewsCategory, Post } from "@/types/graphql";
import { useState, useMemo } from "react";
import Link from "next/link";
import Container from "../Container";
import styles from "./PostsList.module.scss";
import PostCard from "../PostCard";
import PostCardFeatured from "../PostCardFeatured";
import Button from "../Button";
import Icon from "../Icon";

const ITEMS_PER_PAGE = 6;

interface PostsListProps {
  items: Post[] | NewsArticle[];
  itemsPerPage?: number;
  categories?: Category[] | NewsCategory[];
  featuredPost?: Post;
  activeCategory?: string;
}
export const PostsList: React.FC<PostsListProps> = ({
  items,
  itemsPerPage = ITEMS_PER_PAGE,
  categories,
  featuredPost,
  activeCategory,
}) => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const filteredItems = useMemo(() => {
    return featuredPost ? items.filter((p) => p.databaseId !== featuredPost.databaseId) : items;
  }, [items, featuredPost]);

  const gridItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  return (
    <Container flush className={styles.posts}>
      {featuredPost && (
        <div className={styles["posts__featured"]}>
          <PostCardFeatured post={featuredPost} />
        </div>
      )}

      <div className={styles["posts__content"]}>
        {" "}
        {categories && categories.length > 0 && (
          <div className={styles["posts__categories"]}>
            <h2>Categories</h2>
            <nav aria-label="Browse by category">
              <ul>
                <li>
                  <Link href="/blog" className={activeCategory?.replaceAll("/", "") === "all" ? styles["active"] : ""}>
                    All
                  </Link>
                </li>
                {categories.map((cat) => {
                  const key = String(cat?.slug ?? cat?.databaseId ?? cat?.name ?? "cat");
                  return (
                    <li key={key}>
                      <Link
                        href={`/blog/category/${cat.slug}`}
                        className={activeCategory?.replaceAll("/", "") === cat.slug ? styles["active"] : ""}
                      >
                        {cat.name ?? cat.slug}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
        <div className={styles["posts__list-container"]}>
          {filteredItems.length === 0 ? (
            <div className={styles["posts__no-results"]}>
              <p>No posts found.</p>
            </div>
          ) : (
            <>
              {gridItems.length > 0 && (
                <div className={styles["posts__list"]}>
                  {gridItems.map((item) => (
                    <PostCard key={item.databaseId ?? item.id ?? item.slug} post={item} showAuthor showDate />
                  ))}
                </div>
              )}

              {hasMore && (
                <div className={styles["posts__load-more"]}>
                  <button onClick={() => setVisibleCount((c) => c + itemsPerPage)}>
                    <Icon type="chevronDown" />
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PostsList;
