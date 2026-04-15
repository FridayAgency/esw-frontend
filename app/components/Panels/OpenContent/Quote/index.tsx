import Container from "@/app/components/Container";

import styles from "./Quote.module.scss";
import { PagePanelsPagePanelsBlocksQuoteLayout } from "@/types/graphql";

interface QuoteProps {
  panel: PagePanelsPagePanelsBlocksQuoteLayout;
}

const Quote: React.FC<QuoteProps> = ({ panel }) => {
  const { quote } = panel || {};

  if (!quote) {
    return null;
  }

  return (
    <Container className={styles["quote"]}>
      <blockquote className={styles["quote__content"]}>
        <p>{quote}</p>
      </blockquote>
    </Container>
  );
};

export default Quote;
