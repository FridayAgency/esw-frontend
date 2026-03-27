import Container from "@/app/components/Container";
import Image from "next/image";
import image from "@/public/assets/ck.png";
import { ClassName } from "@fridayagency/classnames";

import parse from "html-react-parser";

import styles from "./Image50Text50.module.scss";

interface Image50Text50Props {
  imagePosition?: "left" | "right";
}

const copy = `    <h2>What Happens Under the Hood</h2>
        <p>
          ESW detects the shopper's location and applies the correct local logic in real time, including currency,
          payment methods, duties, taxes, and compliance rules. Checkout calculations are handled upfront, so shoppers
          see accurate landed costs before they pay, not after.
        </p>`;

const Image50Text50: React.FC<Image50Text50Props> = ({ imagePosition }) => {
  const containerClass = new ClassName(styles["image-50-text-50"])
    .add(imagePosition === "left" ? styles["image-left"] : styles["image-right"])
    .toString();

  return (
    <Container flush className={containerClass}>
      <figure className={styles["image-50-text-50__figure"]}>
        <Image className={styles["image-50-text-50__image"]} src={image} alt="Full Width Image" />
        <figcaption className={styles["image-50-text-50__caption"]}>Image caption</figcaption>
      </figure>

      <div className={styles["image-50-text-50__content"]}>{parse(copy ?? "")}</div>
    </Container>
  );
};

export default Image50Text50;
