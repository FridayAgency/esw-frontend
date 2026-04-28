const WORDS_PER_MINUTE = 238;

const SKIP_KEYS = new Set([
  "__typename", "id", "url", "href", "src", "slug", "uri",
  "link", "target", "rel", "type", "color", "size", "className",
  "mediaItemUrl", "sourceUrl", "altText",
]);

function extractText(value: unknown, depth = 0): string {
  if (depth > 10) return "";
  if (typeof value === "string") {
    if (!value || value.startsWith("http") || value.startsWith("/")) return "";
    return value.replace(/<[^>]+>/g, " ");
  }
  if (Array.isArray(value)) {
    return value.map((item) => extractText(item, depth + 1)).join(" ");
  }
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !SKIP_KEYS.has(key))
      .map(([, val]) => extractText(val, depth + 1))
      .join(" ");
  }
  return "";
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function calculateReadTime(panels: unknown[]): number {
  const text = extractText(panels);
  const words = countWords(text);
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatReadTime(minutes: number): string {
  return `${minutes} Minute${minutes !== 1 ? "s" : ""} Read`;
}
