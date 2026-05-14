import React, { ReactNode } from "react";
import styles from "./FormUI.module.scss";
import { ClassName } from "@fridayagency/classnames";

interface RadioOptionCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  icon?: ReactNode;
  alt?: boolean;
}

export const RadioOptionCard = ({ name, value, checked, onChange, label, icon, alt = false }: RadioOptionCardProps) => {
  const className = new ClassName(styles.optionCard).addIf(styles.icon, !alt).toString();

  return (
    <label className={className}>
      <input
        suppressHydrationWarning
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      {icon && (
        <span suppressHydrationWarning className={styles.optionIcon}>
          {icon}
        </span>
      )}
      <span suppressHydrationWarning className={styles.optionLabel}>
        {label}
      </span>
    </label>
  );
};
