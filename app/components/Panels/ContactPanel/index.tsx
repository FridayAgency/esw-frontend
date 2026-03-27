import Container from "../../Container";

import ContactForm from "../../ContactForm";

import styles from "./ContactPanel.module.scss";
import { PagePanelsPagePanelsContactPanelLayout } from "@/types/graphql";

import parse from "html-react-parser";

export const CONTACTPANEL_FRAGMENT = `
subtitle
title
copy
`;

const ContactPanel: React.FC<{ panel: PagePanelsPagePanelsContactPanelLayout }> = ({ panel }) => {
  const { title, subtitle, copy } = panel;

  return (
    <section className={styles.contact}>
      <Container grid className={styles["contact__container"]}>
        <div className={styles["contact__info"]}>
          {subtitle && <p>{subtitle}</p>}
          {title && <h2>{title}</h2>}

          {copy && <div className={styles["contact__copy--text"]}>{parse(copy)}</div>}
        </div>

        <div className={styles["contact__form"]}>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
};

export default ContactPanel;
