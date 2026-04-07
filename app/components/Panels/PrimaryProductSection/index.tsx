import React from "react";
import Container from "../../Container";
import Button from "../../Button";
import Icon from "../../Icon";

import styles from "./PrimaryProductSection.module.scss";
import Link from "next/link";

interface ProductProps {
  title: string;
  content: string;
}

const Product: React.FC<ProductProps> = ({ title, content }) => {
  return (
    <li>
      <Link className={styles["primary-product-section__product"]} href="#">
        <span className={styles["primary-product-section__product-icon"]}>
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M26.4678 21.9813V62.6506C26.4678 63.9976 27.0034 65.2959 27.953 66.2452C28.9106 67.2027 30.2011 67.7383 31.5483 67.7383H72.2248"
              stroke="#1E2221"
              strokeWidth="2.02041"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M57.0739 47.5514H38.927C37.4954 47.5514 36.3369 48.7042 36.3369 50.1288V55.2918C36.3369 56.7164 37.4954 57.8692 38.927 57.8692H57.0739C58.5055 57.8692 59.664 56.7164 59.664 55.2918V50.1288C59.664 48.7042 58.5055 47.5514 57.0739 47.5514Z"
              stroke="#1E2221"
              strokeWidth="2.02041"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M64.7128 26.9159H38.9143C37.4897 26.9159 36.3369 28.0687 36.3369 29.4933V34.6563C36.3369 36.0808 37.4897 37.2336 38.9143 37.2336H64.7128C66.1374 37.2336 67.2902 36.0808 67.2902 34.6563V29.4933C67.2902 28.0687 66.1374 26.9159 64.7128 26.9159Z"
              stroke="#1E2221"
              strokeWidth="2.02041"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.6916 35.4393C28.5498 35.4393 30.0561 33.9329 30.0561 32.0748C30.0561 30.2166 28.5498 28.7103 26.6916 28.7103C24.8335 28.7103 23.3271 30.2166 23.3271 32.0748C23.3271 33.9329 24.8335 35.4393 26.6916 35.4393Z"
              fill="#00D180"
              stroke="#1E2221"
              strokeWidth="2.02041"
            />
          </svg>
        </span>
        <div className={styles["primary-product-section__product-content"]}>
          <h3 className={styles["primary-product-section__product-title"]}>{title}</h3>
          <p className={styles["primary-product-section__product-description"]}>{content}</p>
        </div>
        <span className={styles["primary-product-section__product-arrow"]}>
          <Icon type="arrowRight" />
        </span>
      </Link>
    </li>
  );
};

// interface ServiceProps {
//   title: string;
//   content: string;
// }

// const Service: React.FC<ServiceProps> = ({ title, content }) => {
//   return (
//     <li>
//       <Link className={styles["primary-services-section__service"]} href="#">
//         <span className={styles["primary-services-section__service-icon"]}>
//           <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path
//               d="M26.4678 21.9813V62.6506C26.4678 63.9976 27.0034 65.2959 27.953 66.2452C28.9106 67.2027 30.2011 67.7383 31.5483 67.7383H72.2248"
//               stroke="#1E2221"
//               strokeWidth="2.02041"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M57.0739 47.5514H38.927C37.4954 47.5514 36.3369 48.7042 36.3369 50.1288V55.2918C36.3369 56.7164 37.4954 57.8692 38.927 57.8692H57.0739C58.5055 57.8692 59.664 56.7164 59.664 55.2918V50.1288C59.664 48.7042 58.5055 47.5514 57.0739 47.5514Z"
//               stroke="#1E2221"
//               strokeWidth="2.02041"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M64.7128 26.9159H38.9143C37.4897 26.9159 36.3369 28.0687 36.3369 29.4933V34.6563C36.3369 36.0808 37.4897 37.2336 38.9143 37.2336H64.7128C66.1374 37.2336 67.2902 36.0808 67.2902 34.6563V29.4933C67.2902 28.0687 66.1374 26.9159 64.7128 26.9159Z"
//               stroke="#1E2221"
//               strokeWidth="2.02041"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M26.6916 35.4393C28.5498 35.4393 30.0561 33.9329 30.0561 32.0748C30.0561 30.2166 28.5498 28.7103 26.6916 28.7103C24.8335 28.7103 23.3271 30.2166 23.3271 32.0748C23.3271 33.9329 24.8335 35.4393 26.6916 35.4393Z"
//               fill="#00D180"
//               stroke="#1E2221"
//               strokeWidth="2.02041"
//             />
//           </svg>
//         </span>
//         <div className={styles["primary-services-section__service-content"]}>
//           <h3 className={styles["primary-services-section__service-title"]}>{title}</h3>
//           <p className={styles["primary-services-section__service-description"]}>{content}</p>
//         </div>
//         <span className={styles["primary-services-section__service-arrow"]}>
//           <Icon type="arrowRight" />
//         </span>
//       </Link>
//     </li>
//   );
// };

interface PrimaryProductSectionProps {}

const PrimaryProductSection: React.FC<PrimaryProductSectionProps> = () => {
  return (
    <>
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
            <h2 className={styles["primary-product-section__list-title"]}>Products and Services</h2>

            <ul className={styles["primary-product-section__products"]}>
              <Product
                title="ESW for Startups"
                content="Discover how ESW can help startups navigate the complexities of global expansion and achieve sustainable growth."
              />
              <Product
                title="ESW for Marketplaces"
                content="Explore how ESW empowers marketplaces to expand globally, streamline operations, and enhance customer experiences."
              />
              <Product
                title="ESW for Retailers"
                content="Learn how ESW supports retailers in expanding their global footprint, optimizing supply chains, and delivering exceptional customer service."
              />

              <Product
                title="ESW for Startups"
                content="Discover how ESW can help startups navigate the complexities of global expansion and achieve sustainable growth."
              />
              <Product
                title="ESW for Marketplaces"
                content="Explore how ESW empowers marketplaces to expand globally, streamline operations, and enhance customer experiences."
              />
              <Product
                title="ESW for Retailers"
                content="Learn how ESW supports retailers in expanding their global footprint, optimizing supply chains, and delivering exceptional customer service."
              />
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PrimaryProductSection;
