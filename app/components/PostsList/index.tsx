"use client";

import { CareerCategory, CareerPost, Category, NewsArticle, NewsCategory, Post } from "@/types/graphql";
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
  items: (Post | NewsArticle | CareerPost)[];
  itemsPerPage?: number;
  categories?: Category[] | NewsCategory[] | CareerCategory[];
  featuredPost?: Post | NewsArticle | CareerPost;
  activeCategory?: string;
  title?: string;
  categoryBasePath?: string;
  allPostsHref?: string;
}
export const PostsList: React.FC<PostsListProps> = ({
  items,
  itemsPerPage = ITEMS_PER_PAGE,
  categories,
  featuredPost,
  activeCategory,
  title,
  categoryBasePath = "/blog/category",
  allPostsHref = "/blog",
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
        {title && !categories?.length && (
          <div className={styles["posts__title"]}>
            <h2>{title}</h2>
          </div>
        )}
        {categories && categories.length > 0 && (
          <div className={styles["posts__categories"]}>
            <h2>Categories</h2>
            <nav aria-label="Browse by category">
              <ul>
                <li>
                  <Link
                    scroll={false}
                    href={allPostsHref}
                    className={activeCategory?.replaceAll("/", "") === "all" ? styles["active"] : ""}
                  >
                    All
                  </Link>
                </li>
                {categories.map((cat) => {
                  const key = String(cat?.slug ?? cat?.databaseId ?? cat?.name ?? "cat");
                  return (
                    <li key={key}>
                      <Link
                        scroll={false}
                        href={`${categoryBasePath}/${cat.slug}`}
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
                    <PostCard key={item.databaseId ?? item.slug} post={item} showAuthor showDate />
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
