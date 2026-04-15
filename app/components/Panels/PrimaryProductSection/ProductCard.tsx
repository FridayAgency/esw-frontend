"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Link from "next/link";
import styles from "./PrimaryProductSection.module.scss";
import Icon from "../../Icon";
import { Product } from "@/types/graphql";
import { icons, IconKey, DEFAULT_ICON } from "./Icons";

gsap.registerPlugin(MotionPathPlugin);

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, productCard, uri } = product;
  const content = productCard?.productCardDescription || "";
  // productCardIcon will be available once the ACF field is added in WordPress
  const iconKey = ((productCard as Record<string, unknown>)?.productCardIcon as IconKey) ?? DEFAULT_ICON;
  const renderIcon = icons[iconKey] ?? icons[DEFAULT_ICON];

  const dotRef = useRef<SVGPathElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    gsap.set(dotRef.current, {
      motionPath: {
        path: trackRef.current,
        align: trackRef.current,
        alignOrigin: [0.5, 0.5],
        start: 0.11,
        end: 0.11,
      },
    });
  }, []);

  const handleMouseEnter = () => {
    if (!trackRef.current) return;
    if (tweenRef.current) tweenRef.current.kill();
    tweenRef.current = gsap.to(dotRef.current, {
      duration: 0.7,
      ease: "power2.inOut",
      motionPath: {
        path: trackRef.current,
        align: trackRef.current,
        alignOrigin: [0.5, 0.5],
        start: 0.11,
        end: 1,
      },
    });
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      tweenRef.current.reverse();
    }
  };

  return (
    <li>
      <Link
        className={styles["primary-product-section__product"]}
        href={uri || "#"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className={styles["primary-product-section__product-icon"]}>
          {renderIcon({ trackRef, dotRef })}
        </span>
        <div className={styles["primary-product-section__product-content"]}>
          <h3 className={styles["primary-product-section__product-title"]}>{title}</h3>
          <p className={styles["primary-product-section__product-description"]}>{content}</p>
        </div>
        <span className={styles["primary-product-section__product-arrow"]}>
          <Icon type="arrowRight" />
        </span>
      </Link>
    </li>
  );
};

export default ProductCard;
