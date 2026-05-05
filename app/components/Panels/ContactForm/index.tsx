import { MediaItem, PagePanelsPagePanelsContactFormLayout } from "@/types/graphql";
import Container from "../../Container";
import ImageWithTexture from "../../ImageWithTexture/Index";
import EmbedRenderer from "../../EmbedRenderer";
import styles from "./ContactForm.module.scss";

export const CONTACT_FORM_FRAGMENT = `
    contactFormEmbedCode
    images {
      edges {
        ...AcfMediaItem
      }
    }
`;

interface ContactFormProps {
  panel: PagePanelsPagePanelsContactFormLayout;
}

const ContactForm: React.FC<ContactFormProps> = ({ panel }) => {
  const { contactFormEmbedCode, images } = panel;

  const imageList = images?.edges?.map((edge) => edge.node) as MediaItem[] | undefined;

  return (
    <section className={styles["contact-form"]}>
      <Container className={styles["contact-form__container"]}>
        {contactFormEmbedCode && <EmbedRenderer embedCode={contactFormEmbedCode} className={styles["contact-form__form"]} />}

        {imageList && imageList.length > 0 && (
          <div className={styles["contact-form__images"]}>
            {imageList.map((image, index) => (
              <div key={index} className={styles["contact-form__image-frame"]}>
                <ImageWithTexture variant="frame" image={image} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ContactForm;
