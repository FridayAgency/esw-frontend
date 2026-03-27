import { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";
import { ClassName } from "@fridayagency/classnames";
import Link from "next/link";
import Icon from "../Icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children?: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  target?: string;
  className?: string;
  variant?: "primary" | "outline" | "text";
  colour?: "light" | "dark";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  target,
  className,
  variant = "primary",
  colour = "dark",
  disabled = false,

  "aria-label": ariaLabel,

  ...props
}) => {
  // Validate accessibility: icon-only buttons need aria-label

  // Build class list with validation
  const buttonClass = new ClassName([styles.button]);

  if (styles[variant]) {
    buttonClass.add(styles[variant]);
  }

  if (styles[colour]) {
    buttonClass.add(styles[colour]);
  }

  if (className) {
    buttonClass.add(className);
  }

  if (!href)
    return (
      <button
        className={buttonClass.toString()}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        <span className={styles.ellipse}></span>
        {children != null && <span>{children}</span>}
      </button>
    );

  const linkProps = {
    ...props,
    ...(target === "_blank" && { rel: "noopener noreferrer" }),
  };

  // Handle disabled state for links
  if (disabled) {
    return (
      <span
        className={buttonClass.toString()}
        aria-disabled="true"
        aria-label={ariaLabel}
        style={{ pointerEvents: "none" }}
        {...(props as any)}
      >
        <span className={styles.ellipse}></span>
        {children != null && <span>{children}</span>}
      </span>
    );
  }

  return (
    <Link
      className={buttonClass.toString()}
      href={href}
      target={target}
      onClick={onClick}
      aria-label={ariaLabel}
      {...linkProps}
    >
      <span className={styles.ellipse}></span>
      {children != null && <span>{children}</span>}
    </Link>
  );
};

export default Button;
