// Single source of truth for supported languages.
export const SUPPORTED_LANGS = ['fr', 'en'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: Lang = 'fr';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (SUPPORTED_LANGS as readonly string[]).includes(value);
}

/** Normalize an arbitrary locale string (e.g. "en-US") to a supported lang, or null. */
export function normalizeLang(input: string | null | undefined): Lang | null {
  if (!input) {
    return null;
  }
  const base = input.toLowerCase().split('-')[0];
  return isLang(base) ? base : null;
}

/** The other supported language — used for hreflang / language toggle. */
export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}
