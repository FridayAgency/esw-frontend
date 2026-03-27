"use client";

import { useEffect } from "react";
import ErrorFallback from "../components/ErrorFallback";
import { logError } from "@/utils/logError";

interface CatchAllErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CatchAllError({ error, reset }: CatchAllErrorProps) {
  useEffect(() => {
    logError("Catch-all page error", error);
  }, [error]);

  return (
    <ErrorFallback
      title="We couldn’t load this page"
      description="Please try again. If the issue continues, head back to the homepage."
      onRetry={reset}
    />
  );
}
