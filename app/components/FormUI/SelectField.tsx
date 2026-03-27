import React from "react";
import styles from "./FormUI.module.scss";

interface SelectFieldProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: string[] | { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const SelectField = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required,
}: SelectFieldProps) => {
  return (
    <div className={styles.fieldGroup}>
      {label && (
        <label className="visuallyhidden" htmlFor={id}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.fieldWrapper}>
        <select
          id={id}
          className={`${styles.selectField} ${error ? styles.fieldError : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
          aria-required={required}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => {
            const optionValue = typeof option === "string" ? option : option.value;
            const optionLabel = typeof option === "string" ? option : option.label;
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
        {error && (
          <span id={`${id}-error`} className={styles.error} role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};
