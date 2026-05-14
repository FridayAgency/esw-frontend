import type { RefObject } from "react";
import ErrorIcon from "./ErrorIcon";
import styles from "./FormUI.module.scss";

interface FormTextareaProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
  className?: string;
  autoComplete?: string;
}

const FormTextarea = ({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  required,
  rows = 6,
  textareaRef,
  className,
  autoComplete,
}: FormTextareaProps) => (
  <div className={[styles.field, className].filter(Boolean).join(" ")}>
    <label suppressHydrationWarning htmlFor={id}>
      {label}{" "}
      {required && (
        <span suppressHydrationWarning aria-label="required">
          *
        </span>
      )}
    </label>
    <span className={styles["field__wrapper"]}>
      <textarea
        suppressHydrationWarning
        ref={textareaRef}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        rows={rows}
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

export default FormTextarea;
