import { Suspense } from "react";
import DotGrid from "../../DotGrid";
import Container from "../../Container";
import styles from "./HeroHeader.module.scss";
import TextRevealHeading from "../../TextRevealHeading";
import { PagePanelsPagePanelsHeroHeaderLayout } from "@/types/graphql";

import parse from "html-react-parser";

export const HERO_HEADER_FRAGMENT = `
    copy
    title
`;

interface HeroHeaderProps {
  panel: PagePanelsPagePanelsHeroHeaderLayout;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({ panel }) => {
  const { copy, title } = panel || {};

  return (
    <section className={styles["hero-header"]}>
      <Suspense>
        <DotGrid
          dotSize={5}
          gap={15}
          baseColor="rgba(0, 209, 128, 0.15)"
          activeColor="#00D180"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </Suspense>
      <Container className={styles["hero-header__container"]}>
        <div className={styles["hero-header__content"]}>
          {title && (
            <TextRevealHeading blockColour="#00D180">
              <h1>{title}</h1>
            </TextRevealHeading>
          )}

          {copy && <div className={styles["hero-header__copy"]}>{parse(copy)}</div>}
        </div>

        {/* TODO : Connect this to a dynamic article link */}

        <a href="#" className={styles["hero-header__article"]}>
          <div className={styles["hero-header__article__category"]}>New Research</div>
          <div className={styles["hero-header__article__content"]}>
            <div className={styles["hero-header__article__title"]}>
              Signal Report: Commerce Trends predicted for 2030.
            </div>
            <svg
              className={styles["hero-header__article__arrow"]}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 16C2 15.4477 2.44772 15 3 15L26.5858 15L20.2929 8.70711C19.9024 8.31658 19.9024 7.68342 20.2929 7.29289C20.6834 6.90237 21.3166 6.90237 21.7071 7.29289L29.7071 15.2929C30.0976 15.6834 30.0976 16.3166 29.7071 16.7071L21.7071 24.7071C21.3166 25.0976 20.6834 25.0976 20.2929 24.7071C19.9024 24.3166 19.9024 23.6834 20.2929 23.2929L26.5858 17H3C2.44772 17 2 16.5523 2 16Z"
                fill="url(#paint0_linear_2169_343467)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2169_343467"
                  x1="2"
                  y1="16"
                  x2="30"
                  y2="16"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="1" stopColor="#9CE533" />
                  <stop offset="1" stopColor="#00D180" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </a>
      </Container>
    </section>
  );
};

export default HeroHeader;
