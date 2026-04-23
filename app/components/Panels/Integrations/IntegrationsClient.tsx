"use client";

import { useState, useMemo } from "react";
import IntegrationCard from "../../IntegrationCard";
import Container from "../../Container";
import styles from "./Integrations.module.scss";
import { Integration, IntegrationCategory } from "@/types/graphql";

interface Props {
  integrationList: Integration[];
  integrationCategoryList: IntegrationCategory[];
}

const IntegrationsClient: React.FC<Props> = ({ integrationList, integrationCategoryList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return integrationList.filter((integration) => {
      const matchesSearch = !searchTerm || integration.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === null ||
        integration.integrationCategories?.edges?.some(
          (edge) => (edge?.node as IntegrationCategory)?.databaseId === selectedCategory,
        );
      return matchesSearch && matchesCategory;
    });
  }, [integrationList, searchTerm, selectedCategory]);

  return (
    <>
      <div className={styles["integrations__filter-area"]}>
        <Container className={styles["integrations__filter-container"]} flush>
          <div className={styles["integrations__search"]}>
            <p className={styles["integrations__search-label"]}>Find Your Integration</p>
            <label className={styles["integrations__search-bar"]}>
              <svg
                className={styles["integrations__search-icon"]}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <g opacity="0.5">
                  <path
                    d="M9.16209 15.8252C12.842 15.8252 15.8252 12.842 15.8252 9.16209C15.8252 5.48218 12.842 2.49902 9.16209 2.49902C5.48218 2.49902 2.49902 5.48218 2.49902 9.16209C2.49902 12.842 5.48218 15.8252 9.16209 15.8252Z"
                    stroke="#8F9A95"
                    strokeWidth="1.66577"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.4906 17.4906L13.9092 13.9092"
                    stroke="#8F9A95"
                    strokeWidth="1.66577"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
              <input
                type="text"
                placeholder="Search by name of integration"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles["integrations__search-input"]}
              />
            </label>
          </div>
          {integrationCategoryList.length > 0 && (
            <div className={styles["integrations__categories"]}>
              <p className={styles["integrations__categories-label"]}>Categories</p>
              <div className={styles["integrations__category-pills"]}>
                <button
                  type="button"
                  className={[
                    styles["integrations__category-pill"],
                    selectedCategory === null ? styles["integrations__category-pill--active"] : "",
                  ].join(" ")}
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </button>
                {integrationCategoryList.map((cat) => (
                  <button
                    key={cat.databaseId}
                    type="button"
                    className={[
                      styles["integrations__category-pill"],
                      selectedCategory === cat.databaseId ? styles["integrations__category-pill--active"] : "",
                    ].join(" ")}
                    onClick={() => setSelectedCategory(cat.databaseId)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
      <section className={styles["integrations"]}>
        <Container>
          <ul className={styles["integrations__list"]}>
            {filtered.map((integration) => (
              <li key={integration.databaseId}>
                <IntegrationCard integration={integration} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
};

export default IntegrationsClient;
