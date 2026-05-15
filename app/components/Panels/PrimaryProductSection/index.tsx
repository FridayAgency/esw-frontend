import React from "react";
import Container from "../../Container";
import styles from "./PrimaryProductSection.module.scss";
import {
  PagePanelsPagePanelsPrimaryProductSectionLayout,
  Product,
  RootQueryToProductConnection,
} from "@/types/graphql";
import { removeNodes } from "@fridayagency/utils";
import ProductCard from "./ProductCard";

export const PRIMARYPRODUCTSECTION_FRAGMENT = `
  title
  copy
  products {
    edges {
      node {
        databaseId
        ... on Product {
          id
          uri
          title
          productCard {
            productCardDescription
            productCardIcon
          }
        }
      }
    }
  }
`;

interface PrimaryProductSectionProps {
  panel: PagePanelsPagePanelsPrimaryProductSectionLayout;
}

const PrimaryProductSection: React.FC<PrimaryProductSectionProps> = ({ panel }) => {
  const { title, copy, products } = panel;

  if (!products || products.edges.length === 0) {
    return null;
  }

  const productsToDisplay = products ? removeNodes<Product>(products as RootQueryToProductConnection) : [];

  return (
    <section className={styles["primary-product-section"]}>
      <Container className={styles["primary-product-section__container"]}>
        <svg
          className={styles["primary-product-section__svg"]}
          width="435"
          height="441"
          viewBox="0 0 435 441"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M218.536 0.908203C505.715 5.8421 505.676 435.013 218.536 439.908C-68.6226 434.974 -68.5839 5.80325 218.536 0.908203Z"
            stroke="#1E2221"
            strokeWidth="1.81423"
            strokeLinecap="round"
            strokeDasharray="6.83 6.83"
          />
          <path
            d="M181.359 36.3965C419.662 40.4757 419.624 396.61 181.359 400.669C-56.9254 396.59 -56.8867 40.4563 181.359 36.3965Z"
            stroke="#1E2221"
            strokeWidth="1.81423"
            strokeLinecap="round"
            strokeDasharray="6.83 6.83"
          />
          <path
            d="M143.233 75.6348C331.424 78.8787 331.386 361.975 143.233 365.181C-44.9389 361.937 -44.9196 78.8399 143.233 75.6348Z"
            stroke="#1E2221"
            strokeWidth="1.81423"
            strokeLinecap="round"
          />
          <path
            d="M102.323 118.604C236.748 120.896 236.729 319.941 102.323 322.233C-32.1018 319.941 -32.0825 120.896 102.323 118.604Z"
            stroke="#1E2221"
            strokeWidth="1.81423"
            strokeLinecap="round"
          />
          <path
            d="M59.559 159.705C137.763 161.045 137.763 277.924 59.559 279.265C-18.6447 277.924 -18.6447 161.045 59.559 159.705Z"
            fill="#DEEBE5"
            stroke="#1E2221"
            strokeWidth="1.81423"
            strokeLinecap="round"
          />
          <path
            d="M225.845 112.036C225.633 96.9045 249.297 96.9045 249.065 112.036C249.278 127.168 225.613 127.168 225.845 112.036Z"
            fill="#00D180"
            stroke="#1E2221"
            strokeWidth="1.81423"
          />
          <path
            d="M77.4236 271.3C77.2109 256.168 100.875 256.168 100.643 271.3C100.856 286.432 77.1916 286.432 77.4236 271.3Z"
            fill="#00D180"
            stroke="#1E2221"
            strokeWidth="1.81423"
          />
        </svg>

        <div className={styles["primary-product-section__list"]}>
          <h2 className={styles["primary-product-section__list-title"]}>{title}</h2>
          {copy && <p className={styles["primary-product-section__list-copy"]}>{copy}</p>}

          <ul className={styles["primary-product-section__products"]}>
            {productsToDisplay.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default PrimaryProductSection;
