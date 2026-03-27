/** @format */

import Image, { ImageProps } from "next/image";

import { MediaItem } from "@/types/graphql";

interface ImageComponentProps extends Omit<ImageProps, "src" | "alt"> {
  image?: MediaItem;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

const ImageComponent: React.FC<ImageComponentProps> = ({ image, ...props }) => {
  if (!image) return null;
  return (
    <Image
      placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
      src={image.sourceUrl ?? ""}
      alt={image.altText ?? ""}
      aria-hidden={!image.altText}
      height={image.mediaDetails?.height ?? undefined}
      width={image.mediaDetails?.width ?? undefined}
      {...props}
    />
  );
};

export default ImageComponent;
