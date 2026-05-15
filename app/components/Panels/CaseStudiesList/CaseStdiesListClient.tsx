"use client";

import { useState } from "react";
import styles from "./CaseStudiesList.module.scss";
import CaseStudyCard from "../../CaseStudyCard";
import Container from "../../Container";
import Icon from "../../Icon";
import { CaseStudyCategory } from "@/types/graphql";
import { CaseStudy } from "@/types/graphql";

const PAGE_SIZE = 6;

interface CaseStdiesListClientProps {
  caseStudies: CaseStudy[];
  caseStudyCategories: CaseStudyCategory[];
}

const CaseStdiesListClient: React.FC<CaseStdiesListClientProps> = ({ caseStudies, caseStudyCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered =
    selectedCategory === null
      ? caseStudies
      : caseStudies.filter((cs) =>
          cs.caseStudyCategories?.edges?.some((e) => e?.node?.databaseId === selectedCategory),
        );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (id: number | null) => {
    setSelectedCategory(id);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section>
      {caseStudyCategories && caseStudyCategories.length > 0 && (
        <div className={styles["case-study-gateway__filters"]}>
          <Container flush className={styles["case-study-gateway__filters-container"]}>
            <p className={styles["case-study-gateway__filters-label"]}>Categories</p>
            <div className={styles["case-study-gateway__filter-pills"]}>
              <button
                className={`${styles["case-study-gateway__pill"]} ${selectedCategory === null ? styles["case-study-gateway__pill--active"] : ""}`}
                onClick={() => handleCategoryChange(null)}
              >
                All
              </button>
              {caseStudyCategories.map((category) => {
                if (!category?.caseStudies?.edges?.length) return null;

                return (
                  <button
                    key={category.databaseId}
                    className={`${styles["case-study-gateway__pill"]} ${selectedCategory === category.databaseId ? styles["case-study-gateway__pill--active"] : ""}`}
                    onClick={() => handleCategoryChange(category.databaseId)}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </Container>
        </div>
      )}
      <div className={styles["case-study-gateway"]}>
        <Container className={styles["case-study-gateway__container"]}>
          {visible.length > 0 && (
            <div className={styles["case-study-gateway__grid"]}>
              {visible.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.databaseId} caseStudy={caseStudy} fullwidth />
              ))}
            </div>
          )}

          {hasMore && (
            <div className={styles["case-study-gateway__load-more"]}>
              <button
                className={styles["case-study-gateway__load-more-btn"]}
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                <Icon type="chevronDown" />
                <span>Load More</span>
              </button>
            </div>
          )}
        </Container>
      </div>
    </section>
  );
};

export default CaseStdiesListClient;
