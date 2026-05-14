import { useState } from "react";
import styles from "./FileUpload.module.scss";

interface FileUploadProps {
  id: string;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  hint?: string;
  onChange?: (file: File | null) => void;
  error?: string;
  theme?: "light" | "dark";
}

const FileUpload = ({
  id,
  label = "Upload your CV",
  accept = ".pdf,.doc,.docx",
  maxSizeMB = 10,
  hint,
  onChange,
  error,
  theme = "light",
}: FileUploadProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileName(file?.name ?? null);
    onChange?.(file);
  };

  return (
    <div
      className={[styles.fileUpload, theme === "dark" ? styles["fileUpload--dark"] : undefined]
        .filter(Boolean)
        .join(" ")}
    >
      <label
        htmlFor={id}
        className={[styles.fileUpload__dropzone, error ? styles["fileUpload__dropzone--error"] : undefined]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          id={id}
          name={id}
          type="file"
          accept={accept}
          className={styles.fileUpload__input}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <div className={styles.fileUpload__content}>
          <svg
            className={styles.fileUpload__icon}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M26 20v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4M20 10l-4-4-4 4M16 6v14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p suppressHydrationWarning className={styles.fileUpload__label}>
            {fileName ?? label}
          </p>
        </div>
        <p suppressHydrationWarning className={styles.fileUpload__hint}>
          {hint ?? `PDF, DOC up to ${maxSizeMB}MB`}
        </p>
      </label>
      {error && (
        <span suppressHydrationWarning id={`${id}-error`} className={styles.fileUpload__error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default FileUpload;
