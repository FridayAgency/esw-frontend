import Image, { StaticImageData } from "next/image";
import placeholderImage from "@/public/assets/image.png";
import styles from "./ImageWithTexture.module.scss";
import { ClassName } from "@fridayagency/classnames";

export interface ImageWithTextureProps {
  src?: StaticImageData | string;
  alt?: string;
  /** "frame" (default): border, corner dots, gap between frame and image.
   *  "no-frame": image + dot texture only, no border. */
  variant?: "frame" | "no-frame";
  className?: string;
}

const ImageWithTexture = ({
  src = placeholderImage,
  alt = "",
  variant = "frame",
  className,
}: ImageWithTextureProps) => {
  const outerClass = new ClassName([styles.image]).addIf(styles["image--frame"], variant === "frame");

  if (className) {
    outerClass.add(className);
  }

  return (
    <div className={outerClass.toString()}>
      <div className={styles["image__inner"]}>
        <Image src={src} alt={alt} />
      </div>
    </div>
  );
};

export default ImageWithTexture;
