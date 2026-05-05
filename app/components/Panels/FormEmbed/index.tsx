import { PagePanelsPagePanelsFormEmbedLayout } from "@/types/graphql";
import EmbedRenderer from "../../EmbedRenderer";
import Container from "../../Container";
import styles from "./FormEmbed.module.scss";

export const FORM_EMBED_FRAGMENT = `
    formEmbedCode
`;

interface FormEmbedProps {
  panel: PagePanelsPagePanelsFormEmbedLayout;
}

const FormEmbed: React.FC<FormEmbedProps> = ({ panel }) => {
  const { formEmbedCode } = panel;

  if (!formEmbedCode) return null;

  return (
    <section className={styles["form-embed"]}>
      <div className={styles["form-embed__dots"]} aria-hidden="true" />
      <Container className={styles["form-embed__container"]}>
        <div className={styles["form-embed__card"]}>
          <EmbedRenderer embedCode={formEmbedCode} />
        </div>
      </Container>
    </section>
  );
};

export default FormEmbed;
