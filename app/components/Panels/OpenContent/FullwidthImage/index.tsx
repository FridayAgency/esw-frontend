import Container from "@/app/components/Container";
import Image from "next/image";

import image from "@/public/assets/ck.png";

import styles from "./FullwidthImage.module.scss";

interface FullWidthImageProps {}

const FullWidthImage: React.FC<FullWidthImageProps> = () => {
  return (
    <Container flush className={styles["image"]}>
      <figure className={styles["image__figure"]}>
        <Image src={image} alt="Full Width Image" />
        <figcaption className={styles["image__caption"]}>image caption</figcaption>
      </figure>
    </Container>
  );
};

export default FullWidthImage;
