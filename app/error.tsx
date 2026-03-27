"use client";

import { useEffect } from "react";
import ErrorFallback from "./components/ErrorFallback";
import { logError } from "@/utils/logError";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    logError("Root route error", error);
  }, [error]);

  return (
    <ErrorFallback
      title="Something went wrong"
      description="An unexpected error occurred while loading this page."
      onRetry={reset}
    />
  );
}
