import Container from "@/app/components/Container";

import styles from "./Quote.module.scss";

interface QuoteProps {}

const Quote: React.FC<QuoteProps> = () => {
  return (
    <Container className={styles["quote"]}>
      <blockquote className={styles["quote__content"]}>
        <p>
          Local payment methods are surfaced automatically, without your teams needing to manage individual integrations
          per market.
        </p>
      </blockquote>
    </Container>
  );
};

export default Quote;
