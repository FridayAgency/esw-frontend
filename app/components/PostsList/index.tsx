"use client";

import { CaseStudy, Category, Post } from "@/types/graphql";
import { useState, useMemo } from "react";
import Container from "../Container";
import styles from "./PostsList.module.scss";
import PostCard from "../PostCard";
import PostCardFeatured from "../PostCardFeatured";
import Button from "../Button";
import Icon from "../Icon";

const ITEMS_PER_PAGE = 6;

interface PostsListProps {
  items: Post[];
  itemsPerPage?: number;
  categories?: Category[];
}
export const PostsList: React.FC<PostsListProps> = ({ items, itemsPerPage = ITEMS_PER_PAGE, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const featuredItem = items[0] ?? null;

  const filteredItems = useMemo(() => {
    const rest = items.slice(1);
    if (!selectedCategory) return rest;
    return rest.filter((item) => {
      const postCategoryIds: number[] =
        item.categories?.edges?.map((e: any) => e.node?.databaseId).filter(Boolean) ?? [];
      return postCategoryIds.includes(selectedCategory);
    });
  }, [items, selectedCategory]);

  const gridItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  const handleCategoryClick = (databaseId: number | null) => {
    setSelectedCategory(databaseId);
    setVisibleCount(itemsPerPage);
  };

  return (
    <Container flush className={styles.posts}>
      {featuredItem && (
        <div className={styles["posts__featured"]}>
          <PostCardFeatured post={featuredItem} />
        </div>
      )}

      <div className={styles["posts__content"]}>
        {" "}
        {categories && categories.length > 0 && (
          <div className={styles["posts__categories"]}>
            <h2>Categories</h2>
            <nav aria-label="Filter by category">
              <ul>
                <li>
                  <button
                    onClick={() => handleCategoryClick(null)}
                    className={!selectedCategory ? styles["posts__categories--active"] : ""}
                  >
                    All
                  </button>
                </li>
                {categories.map((cat) => {
                  const key = String(cat?.slug ?? cat?.databaseId ?? cat?.name ?? "cat");
                  const isActive = selectedCategory === cat.databaseId;
                  return (
                    <li key={key}>
                      <button
                        onClick={() => handleCategoryClick(cat.databaseId ?? null)}
                        className={isActive ? styles["posts__categories--active"] : ""}
                      >
                        {cat.name ?? cat.slug}
                      </button>
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
