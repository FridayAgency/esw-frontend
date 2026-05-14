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
  whiteBackground?: boolean;
}

const FaqList: React.FC<FaqListProps> = ({ items, heading, whiteBackground }) => {
  return (
    <div className={styles["faqList"] + (whiteBackground ? " " + styles["faqList--white"] : "")}>
      <Divider />
      {heading && (
        <h2 suppressHydrationWarning className={styles["faqList__heading"]}>
          {heading}
        </h2>
      )}
      <ul className={styles["faqList__list"]}>
        {items.map((item, index) => (
          <AccordionItem key={index} title={item.title} content={item.content} />
        ))}
      </ul>
    </div>
  );
};

export default FaqList;
