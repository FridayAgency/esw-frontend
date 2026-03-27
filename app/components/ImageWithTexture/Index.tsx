import image from "@/public/assets/image.png";

import Image from "next/image";

import styles from "./ImageWithTexture.module.scss";

const ImageWithTexture = () => {
  return (
    <div className={styles.image}>
      <Image src={image} alt="Feature Image" />
    </div>
  );
};

export default ImageWithTexture;
