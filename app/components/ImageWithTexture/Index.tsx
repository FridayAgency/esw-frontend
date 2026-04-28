import Image, { StaticImageData } from "next/image";
import placeholderImage from "@/public/assets/image.png";
import styles from "./ImageWithTexture.module.scss";
import { ClassName } from "@fridayagency/classnames";
import { MediaItem } from "@/types/graphql";
import ImageComponent from "../ImageComponent";

export interface ImageWithTextureProps {
  image: MediaItem;
  variant?: "frame" | "frame-no-padding";
  className?: string;
}

const ImageWithTexture: React.FC<ImageWithTextureProps> = ({ image, variant, className }) => {
  const outerClass = new ClassName([styles.image])
    .addIf(styles["image--frame"], variant === "frame")
    .addIf(styles["image--frame-no-padding"], variant === "frame-no-padding");

  if (className) {
    outerClass.add(className);
  }

  return (
    <div className={outerClass.toString()}>
      <div className={styles["image__inner"]}>
        <ImageComponent image={image} />
      </div>
    </div>
  );
};

export default ImageWithTexture;
