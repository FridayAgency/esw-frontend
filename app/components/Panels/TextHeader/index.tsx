import { PagePanelsPagePanelsTextHeaderLayout } from "@/types/graphql";
import Container from "../../Container";
import Editor from "../../Editor";

import styles from "./TextHeader.module.scss";

export const TEXTHEADER_FRAGMENT = `
  title
  copy
`;

const TextHeader: React.FC<{ panel: PagePanelsPagePanelsTextHeaderLayout }> = ({ panel }) => {
  const { title, copy } = panel || {};

  return (
    <section className={styles["text-header"]}>
      <Container innerSection className={styles["text-header__container"]}>
        {title && <h1>{title}</h1>}
        {copy && <Editor content={copy} />}
      </Container>
    </section>
  );
};

export default TextHeader;
