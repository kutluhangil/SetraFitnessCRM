import trCommon from '../../../public/locales/tr/common.json';
import enCommon from '../../../public/locales/en/common.json';
import type { Locale } from './config';

export type Dictionary = typeof trCommon;

const dictionaries: Record<Locale, Dictionary> = {
  tr: trCommon,
  en: enCommon as Dictionary,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.tr;
}
