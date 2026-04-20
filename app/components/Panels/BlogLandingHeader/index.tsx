import { PagePanelsPagePanelsBlogLandingHeaderLayout } from "@/types/graphql";
import Container from "../../Container";
import styles from "./BlogLandingHeader.module.scss";
import { ClassName } from "@fridayagency/classnames";

export const BLOG_LANDING_HEADER_FRAGMENT = `
    copy
    title
`;

interface BlogLandingHeaderProps {
  panel?: PagePanelsPagePanelsBlogLandingHeaderLayout;
  title?: string;
  reducedPadding?: boolean;
}

const BlogLandingHeader: React.FC<BlogLandingHeaderProps> = ({ panel, title: propTitle, reducedPadding }) => {
  const { copy, title: panelTitle } = panel || {};

  const title = propTitle || panelTitle;

  const headerClassNames = new ClassName(styles["header"]);
  if (reducedPadding) {
    headerClassNames.add(styles["header--reduced-padding"]);
  }

  return (
    <section className={headerClassNames.toString()}>
      <Container className={styles["header__container"]}>
        <div className={styles["header__content"]}>
          {title && <h1>{title}</h1>}
          {copy && <p>{copy}</p>}
        </div>
      </Container>
    </section>
  );
};

export default BlogLandingHeader;
