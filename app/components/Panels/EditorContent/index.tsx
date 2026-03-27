import { PagePanelsPagePanelsEditorContentLayout } from "@/types/graphql";
import Container from "../../Container";
import Editor from "../../Editor";

import styles from "./EditorContent.module.scss";

export const EDITORCONTENT_FRAGMENT = `
    content
`;

const EditorContent: React.FC<{ panel: PagePanelsPagePanelsEditorContentLayout }> = ({ panel }) => {
  const { content } = panel || {};

  if (!content) return null;

  return (
    <Container innerSection className={styles["editor-content"]}>
      <Editor content={content} />
    </Container>
  );
};

export default EditorContent;
