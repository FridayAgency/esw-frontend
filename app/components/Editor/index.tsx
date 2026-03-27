import parse from "html-react-parser";

import styles from "./Editor.module.scss";
import { ClassName } from "@fridayagency/classnames";

const normalizeHtmlForParser = (html: string) => {
  return html.replace(/<[^>]+>/g, (tag) => {
    return tag.replace(/(?:&nbsp;|\u00A0)+(?=[^\s"'<>\/=]+\s*=)/g, " ");
  });
};

const Editor: React.FC<{ content: string; className?: string }> = ({ content, className }) => {
  const editorClass = new ClassName(styles["editor"]);
  if (className) {
    editorClass.add(className);
  }

  if (!content) return null;

  return <div className={editorClass.toString()}>{parse(normalizeHtmlForParser(content))}</div>;
};

export default Editor;
