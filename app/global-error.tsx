"use client";

import { useEffect } from "react";
import ErrorFallback from "./components/ErrorFallback";
import { logError } from "@/utils/logError";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logError("Global layout error", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <ErrorFallback
          title="Application error"
          description="Something went wrong at the application level."
          onRetry={reset}
        />
      </body>
    </html>
  );
}
