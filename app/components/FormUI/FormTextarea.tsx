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
}: FormTextareaProps) => (
  <div className={[styles.field, className].filter(Boolean).join(" ")}>
    <label htmlFor={id}>
      {label} {required && <span aria-label="required">*</span>}
    </label>
    <span className={styles["field__wrapper"]}>
      <textarea
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
      />
      {error && <ErrorIcon />}
    </span>
    {error && (
      <span id={`${id}-error`} className={styles.error} role="alert">
        {error}
      </span>
    )}
  </div>
);

export default FormTextarea;
