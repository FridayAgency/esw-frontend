export const logError = (context: string, error: unknown, meta?: unknown) => {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  if (meta !== undefined) {
    console.error(`[${context}]`, error, meta);
    return;
  }

  console.error(`[${context}]`, error);
};
