import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ClassName } from "@fridayagency/classnames";

import styles from "./CtaButton.module.scss";

export interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  target?: string;
  className?: string;
}

const CtaButton: React.FC<CtaButtonProps> = ({
  children,
  onClick,
  href,
  target,
  className,
  "aria-label": ariaLabel,
  ...props
}) => {
  const cls = new ClassName([styles.ctaButton]);
  if (className) cls.add(className);

  const inner = (
    <>
      <span className={styles.ellipse} aria-hidden="true" />
      {children != null && <span suppressHydrationWarning>{children}</span>}
    </>
  );

  if (!href) {
    return (
      <button className={cls.toString()} onClick={onClick} aria-label={ariaLabel} {...props}>
        {inner}
      </button>
    );
  }

  return (
    <Link
      suppressHydrationWarning
      className={cls.toString()}
      href={href}
      target={target}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(target === "_blank" ? { rel: "noopener noreferrer" } : {})}
      {...(props as any)}
    >
      {inner}
    </Link>
  );
};

export default CtaButton;
