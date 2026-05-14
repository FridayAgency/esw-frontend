import type { RefObject } from "react";
import ErrorIcon from "./ErrorIcon";
import styles from "./FormUI.module.scss";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string | number;
  error?: string;
  onChange: (value: string) => void;
  required?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  className?: string;
  theme?: "light" | "dark";
  autoComplete?: string;
}

const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  required,
  inputRef,
  className,
  theme = "light",
  autoComplete,
}: FormInputProps) => (
  <div
    className={[styles.field, theme === "dark" ? styles["field--dark"] : undefined, className]
      .filter(Boolean)
      .join(" ")}
  >
    <label suppressHydrationWarning htmlFor={id}>
      {label}
    </label>
    <span className={styles["field__wrapper"]}>
      <input
        suppressHydrationWarning
        ref={inputRef}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        required={required}
        autoComplete={autoComplete}
      />
      {error && <ErrorIcon />}
    </span>
    {error && (
      <span suppressHydrationWarning id={`${id}-error`} className={styles.error} role="alert">
        {error}
      </span>
    )}
  </div>
);

export default FormInput;
