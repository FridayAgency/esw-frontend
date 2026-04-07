import Container from "../../Container";
import styles from "./FaqCategories.module.scss";

interface FaqCategoryLink {
  label: string;
  href: string;
}

interface FaqCategoriesProps {
  title?: string;
  categories?: FaqCategoryLink[];
}

const defaultCategories: FaqCategoryLink[] = [
  { label: "Merchant of Record (MOR)", href: "#" },
  { label: "Payments, Settlements & Reporting", href: "#" },
  { label: "ESW Product & Service Offering", href: "#" },
  { label: "Logistics & Compliance", href: "#" },
  { label: "Glossary of Key Terms", href: "#" },
];

const ArrowRight = () => (
  <svg
    className={styles["faq-categories__arrow"]}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7 16H25M25 16L18 9M25 16L18 23"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FaqCategories: React.FC<FaqCategoriesProps> = ({ title = "FAQ Categories", categories = defaultCategories }) => {
  return (
    <section className={styles["faq-categories"]}>
      <Container className={styles["faq-categories__container"]}>
        <div className={styles["faq-categories__content"]}>
          <div className={styles["faq-categories__pattern"]}></div>
          <h2 className={styles["faq-categories__title"]}>{title}</h2>
          <ul className={styles["faq-categories__list"]}>
            {categories.map((cat) => (
              <li key={cat.label} className={styles["faq-categories__item"]}>
                <a href={cat.href} className={styles["faq-categories__link"]}>
                  <span>{cat.label}</span>
                  <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default FaqCategories;
