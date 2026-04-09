"use client";

import Button from "../Button";
import Container from "../Container";

interface ErrorFallbackProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

const ErrorFallback = ({ title, description, onRetry }: ErrorFallbackProps) => {
  return (
    <Container innerSection>
      <section
        role="alert"
        style={{
          border: "1px solid var(--blue-200)",
          background: "var(--silver-50)",
          borderRadius: "0.375rem",
          padding: "1.5rem",
          margin: "2rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <h1 style={{ margin: 0, color: "var(--copy)" }}>{title}</h1>
        <p style={{ margin: 0, color: "var(--copy)" }}>{description}</p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
          {onRetry ? (
            <Button type="button" onClick={onRetry}>
              Try again
            </Button>
          ) : null}
          <Button href="/">Back to homepage</Button>
        </div>
      </section>
    </Container>
  );
};

export default ErrorFallback;
