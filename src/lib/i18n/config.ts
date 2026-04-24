export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  tr: 'TR',
  en: 'EN',
};

export const localeCurrencies: Record<Locale, string> = {
  tr: 'TRY',
  en: 'USD',
};

export const localeDateLocales: Record<Locale, string> = {
  tr: 'tr-TR',
  en: 'en-US',
};
