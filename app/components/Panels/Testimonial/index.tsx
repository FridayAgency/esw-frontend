import Container from "../../Container";

import ck from "@/public/assets/ck.png";

import styles from "./Testimonial.module.scss";
import { PagePanelsPagePanelsTestimonialLayout, Testimonial as TestimonialType } from "@/types/graphql";

import parse from "html-react-parser";
import ImageComponent from "../../ImageComponent";

export const TESTIMONIAL_FRAGMENT = `
    testimonial {
      edges {
        node {
          ... on Testimonial {
            id
            databaseId
            title
            featuredImage {
              ...MediaItemFragment
            }
            testimonailDetails {
              quote
              quoteAuthor
              logo {
                ...AcfMediaItem
              }
              quoteAuthorImage {
                ...AcfMediaItem
              }
            }
          }
        }
      }
    }
`;

interface TestimonialProps {
  panel: PagePanelsPagePanelsTestimonialLayout;
}

const Testimonial: React.FC<TestimonialProps> = ({ panel }) => {
  const testimonial = panel?.testimonial?.edges?.[0]?.node as TestimonialType;

  if (!testimonial) {
    return null; // or some fallback UI
  }

  const featureImage = testimonial.featuredImage?.node?.sourceUrl || "";

  return (
    <section
      className={styles["testimonial"]}
      style={{ "--logo-image": `url(${featureImage})` } as React.CSSProperties}
    >
      <Container className={styles["testimonial__container"]}>
        {testimonial?.testimonailDetails?.logo && testimonial?.testimonailDetails?.logo?.node && (
          <div className={styles["testimonial__logo"]}>
            <ImageComponent image={testimonial.testimonailDetails?.logo?.node} />
          </div>
        )}

        <div className={styles["testimonial__content"]}>
          <div className={styles["testimonial__text"]}>{parse(testimonial.testimonailDetails?.quote || "")}</div>

          <div className={styles["testimonial__author"]}>
            {testimonial.testimonailDetails?.quoteAuthorImage &&
              testimonial?.testimonailDetails?.quoteAuthorImage?.node && (
                <div className={styles["testimonial__author-image"]}>
                  <ImageComponent image={testimonial.testimonailDetails.quoteAuthorImage.node} />
                </div>
              )}

            {testimonial.testimonailDetails?.quoteAuthor && <p>{testimonial.testimonailDetails?.quoteAuthor}</p>}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
