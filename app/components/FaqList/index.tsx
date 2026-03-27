import { AcfLink } from "@/types/graphql";
import { AccordionItem } from "../Accordion";
import Icon from "../Icon";
import styles from "./FaqList.module.scss";
import Button from "../Button";

interface FaqListItem {
  title: string;
  content: string;
}

interface FaqListProps {
  items: FaqListItem[];
  heading?: string;
  cta?: AcfLink;
}

const FaqList: React.FC<FaqListProps> = ({ items, heading, cta }) => {
  return (
    <div className={styles["faqList"]}>
      {heading && <h2 className={styles["faqList__heading"]}>{heading}</h2>}
      <ul className={styles["faqList__list"]}>
        {items.map((item, index) => (
          <AccordionItem key={index} title={item.title} content={item.content} />
        ))}
      </ul>

      {cta?.url && (
        <div className={styles["faqList__cta"]}>
          <Button href={cta.url} className="cta-link">
            {cta.title}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FaqList;
