"use client";

import { useState } from "react";
import styles from "./password.module.scss";

export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/staging-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      setError("Incorrect password. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className={styles["password-page"]}>
      <div className={styles["password-page__card"]}>
        <h1 className={styles["password-page__title"]}>Staging Preview</h1>
        <p className={styles["password-page__description"]}>
          This site is password protected. Enter the password to continue.
        </p>
        <form onSubmit={handleSubmit} className={styles["password-page__form"]}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className={styles["password-page__input"]}
            autoFocus
            required
          />
          {error && <p className={styles["password-page__error"]}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className={styles["password-page__button"]}
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
