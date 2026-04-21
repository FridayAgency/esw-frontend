import { PagePanelsPagePanelsAccordionPanelLayout } from "@/types/graphql";
import Container from "@/app/components/Container/Container";
import FaqList from "@/app/components/FaqList";

import styles from "./AccordionPanel.module.scss";

export const ACCORDIONPANEL_FRAGMENT = `
 title
 accordionItems {
   content
   title
 }

`;

const AccordionPanel: React.FC<{ panel: PagePanelsPagePanelsAccordionPanelLayout }> = ({ panel }) => {
  const { title, accordionItems } = panel;
  return (
    <section className={styles["accordion-panel"]}>
      <Container className={styles["accordion-panel__container"]}>
        <FaqList
          heading={title ?? undefined}
          items={
            accordionItems?.map((item) => ({
              title: item?.title ?? "",
              content: item?.content ?? "",
            })) ?? []
          }
        />
      </Container>
    </section>
  );
};

export default AccordionPanel;
