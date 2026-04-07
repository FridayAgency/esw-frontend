import Button from "../../Button";
import Container from "../../Container";
import TextRevealHeading from "../../TextRevealHeading";

import styles from "./IconBlock.module.scss";

export const ListItem = () => {
  return (
    <li className={styles["icon-block__list-item"]}>
      <svg width={69} height={70} viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M34.5021 0C80.5076 0.783333 80.5021 69.2222 34.5021 70C-11.5035 69.2167 -11.4979 0.777778 34.5021 0Z"
          fill="#DEEBE5"
        />
        <path
          d="M34.6855 52.5829C57.4411 52.4829 57.4411 17.8718 34.6855 17.7773C11.8078 18.1662 11.8133 52.1996 34.6855 52.5829Z"
          stroke="#1E2221"
          strokeWidth={1.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34.6857 17.7773C25.4746 27.0996 25.4746 43.2662 34.6857 52.5829C43.8968 43.2607 43.8968 27.094 34.6857 17.7773Z"
          stroke="#1E2221"
          strokeWidth={1.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.2793 35.1836H52.0849"
          stroke="#1E2221"
          strokeWidth={1.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M41.6137 33.1829C44.497 33.1385 44.497 37.6718 41.6137 37.6274C38.7303 37.6718 38.7303 33.1385 41.6137 33.1829Z"
          fill="#00D180"
          stroke="#1E2221"
          strokeWidth={1.66667}
        />
      </svg>
      <h3>International complexity slows teams and drains focus</h3>
      <p>
        Cross-border work pulls time and attention away from core priorities. Ecommerce, tech, finance, and legal teams
        spend disproportionate effort firefighting rather than driving growth.
      </p>
    </li>
  );
};

const IconBlock = () => {
  return (
    <section className={styles["icon-block"]}>
      <Container className={styles["icon-block__container"]}>
        <TextRevealHeading blockColour="#00D180">
          <h2 className={styles["icon-block__heading"]}>Global Expansion Breaks in Predictable Ways. </h2>
        </TextRevealHeading>

        <ul className={styles["icon-block__list"]}>
          <ListItem />
          <ListItem />
          <ListItem />
        </ul>
        <Button variant="outline">Read More</Button>
      </Container>
    </section>
  );
};

export default IconBlock;
