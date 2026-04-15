import Button from "@/app/components/Button";
import Container from "@/app/components/Container/Container";
import Editor from "@/app/components/Editor";

import styles from "./TextPanel.module.scss";
import { PagePanelsPagePanelsBlocksTextPanelLayout } from "@/types/graphql";

interface TextPanelProps {
  panel: PagePanelsPagePanelsBlocksTextPanelLayout;
}

//

const TextPanel: React.FC<TextPanelProps> = ({ panel }) => {
  const { content, callToAction } = panel || {};

  if (!content) {
    return null;
  }
  return (
    <Container tag="section" className={styles["text-panel"]}>
      <Editor content={content} className={styles["text-panel__content"]} />
      {callToAction && (
        <Button
          href={callToAction?.url ?? "#"}
          target={callToAction?.target ?? "_self"}
          className={styles["text-panel__button"]}
          variant="outline"
        >
          {callToAction?.title ?? ""}
        </Button>
      )}
    </Container>
  );
};

export default TextPanel;
