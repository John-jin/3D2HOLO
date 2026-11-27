export type Locale = {
  code: string;
  label: string;
  short: string;
};

export const LOCALES: Locale[] = [
  { code: "en", label: "English", short: "en" },
  { code: "zh", label: "简体中文", short: "zh" },
  { code: "fr", label: "Français", short: "fr" },
  { code: "de", label: "Deutsch", short: "de" },
  { code: "it", label: "Italiano", short: "it" },
  { code: "nl", label: "Nederlands", short: "nl" },
  { code: "ru", label: "Русский", short: "ru" },
  { code: "es", label: "Español", short: "es" },
  { code: "pt", label: "Português", short: "pt" },
  { code: "ja", label: "日本語", short: "ja" },
  { code: "ko", label: "한국어", short: "ko" },
  { code: "ar", label: "العربية", short: "ar" },
  { code: "hi", label: "हिन्दी", short: "hi" },
  { code: "th", label: "ไทย", short: "th" },
];

export const LOCALE_CODES = LOCALES.map((l) => l.code);

export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0] || "zh";
  return LOCALES.find((l) => l.code === seg) ?? LOCALES.find((l) => l.code === "zh")!;
}

/** Swap the leading locale segment, keeping the rest of the path. */
export function withLocale(pathname: string, code: string): string {
  const parts = pathname.split("/");
  // ["", "zh", "generate", "imgs"] or ["", "zh"]
  if (parts.length >= 2 && LOCALE_CODES.includes(parts[1])) {
    parts[1] = code;
    const next = parts.join("/") || `/${code}`;
    return next.endsWith("/") && next !== `/${code}/` ? next.slice(0, -1) : next;
  }
  return `/${code}`;
}
