export type langCode = "ar" | "en" | "fr" | "es" | "ru" | "zh-hans";

export interface drupalLanguage {
  langCode: langCode;
  label: string;
  direction: string;
  weight: number;
}
