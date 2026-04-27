import Container from "@/app/components/Container";
import { PagePanelsPagePanelsBlocksDividerLayout } from "@/types/graphql";

import styles from "./Divider.module.scss";

interface DividerProps {
  panel: PagePanelsPagePanelsBlocksDividerLayout;
}

const Divider: React.FC<DividerProps> = ({ panel }) => {
  return (
    <Container className={styles["divider"]}>
      <h2>Divider</h2>
    </Container>
  );
};

export default Divider;
