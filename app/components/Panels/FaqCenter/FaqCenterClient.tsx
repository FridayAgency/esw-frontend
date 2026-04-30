"use client";

import { useEffect, useRef, useState } from "react";
import { Maybe, PagePanelsPagePanelsFaqSection } from "@/types/graphql";
import FaqList from "@/app/components/FaqList";
import styles from "./FaqCenter.module.scss";
import Container from "../../Container";

interface FaqCenterClientProps {
  categorys: string[];
  fags: Maybe<Maybe<PagePanelsPagePanelsFaqSection>[]> | undefined;
}

function slugify(text: string) {
  return (
    "faq-" +
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

const FaqCenterClient: React.FC<FaqCenterClientProps> = ({ categorys, fags }) => {
  const [activeCategory, setActiveCategory] = useState<string>(categorys[0] ?? "");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ticking = { current: false };

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const headerEl = document.querySelector("header") as HTMLElement | null;
        const offset = (headerEl?.offsetHeight ?? 0) + 60;

        const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 50;

        if (nearBottom) {
          setActiveCategory(categorys[categorys.length - 1]);
          ticking.current = false;
          return;
        }

        let active = categorys[0];
        for (const category of categorys) {
          const el = sectionRefs.current.get(category);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= offset) {
            active = category;
          }
        }
        setActiveCategory(active);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categorys]);

  const scrollToSection = (category: string) => {
    const el = sectionRefs.current.get(category);
    if (!el) return;
    const headerEl = document.querySelector("header") as HTMLElement | null;
    const offset = (headerEl ? headerEl.offsetHeight : 0) + (navRef.current ? navRef.current.offsetHeight : 0) + 16;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition - 100;
    window.scrollBy({
      top: offsetPosition,
      behavior: "smooth",
    });
    setActiveCategory(category);
  };

  return (
    <div className={styles["faq-center"]}>
      <Container flush className={styles["faq-center__container"]}>
        <nav ref={navRef} className={styles["faq-center__nav"]} aria-label="FAQ categories">
          <p className={styles["faq-center__nav-label"]}>Categories</p>
          <div className={styles["faq-center__pills"]}>
            {categorys.map((category) => (
              <button
                key={category}
                className={`${styles["faq-center__pill"]}${activeCategory === category ? ` ${styles["faq-center__pill--active"]}` : ""}`}
                onClick={() => scrollToSection(category)}
                aria-current={activeCategory === category ? "true" : undefined}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>
        <div className={styles["faq-center__content"]}>
          {fags?.map((section) => {
            if (!section?.title) return null;
            const items =
              section.faqs?.map((faq) => ({
                title: faq?.question ?? "",
                content: faq?.content ?? "",
              })) ?? [];

            return (
              <div
                key={section.title}
                id={slugify(section.title)}
                ref={(el) => {
                  if (el) sectionRefs.current.set(section.title!, el);
                  else sectionRefs.current.delete(section.title!);
                }}
              >
                <FaqList heading={section.title} items={items} whiteBackground={true} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default FaqCenterClient;
