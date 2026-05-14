/** @format */

"use client";

import { useRef, useState } from "react";
import styles from "./Accordion.module.scss";
import Icon from "../Icon";

import Editor from "../Editor";

interface AccordionItemProps {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const id = `accordion-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <li className={`${styles["accordion-item"]} ${isOpen ? styles.open : ""}`}>
      <button
        className={`${styles["accordion-item__trigger"]} ${isOpen ? styles.open : ""}`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span suppressHydrationWarning>{title}</span>
        <Icon type="chevronDown" />
      </button>

      <div
        id={id}
        className={`${styles["accordion-item__content"]} ${isOpen ? styles.open : ""}`}
        aria-hidden={!isOpen}
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0px" }}
      >
        <div ref={contentRef} className={styles["accordion-item__inner"]}>
          {<Editor content={content ?? ""} />}
        </div>
      </div>
    </li>
  );
};

interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, className }) => {
  return (
    <div className={`${styles.accordion} ${className || ""}`}>
      {items.map((item, index) => (
        <AccordionItem key={index} {...item} />
      ))}
    </div>
  );
};

export default Accordion;
