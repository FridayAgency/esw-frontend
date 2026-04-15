import { AcfLink } from "@/types/graphql";
import { AccordionItem } from "../Accordion";
import Icon from "../Icon";
import styles from "./FaqList.module.scss";
import Button from "../Button";
import Divider from "../Divider";

interface FaqListItem {
  title: string;
  content: string;
}

interface FaqListProps {
  items: FaqListItem[];
  heading?: string;
}

const FaqList: React.FC<FaqListProps> = ({ items, heading }) => {
  return (
    <div className={styles["faqList"]}>
      <Divider />
      {heading && <h2 className={styles["faqList__heading"]}>{heading}</h2>}
      <ul className={styles["faqList__list"]}>
        {items.map((item, index) => (
          <AccordionItem key={index} title={item.title} content={item.content} />
        ))}
      </ul>
    </div>
  );
};

export default FaqList;
