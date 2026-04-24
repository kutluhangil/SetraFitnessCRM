'use client';

import { useTranslation } from '@/lib/i18n/provider';
import { locales, localeFlags, type Locale } from '@/lib/i18n/config';
import { cn } from '@/lib/utils/cn';

export function LanguageToggle() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="inline-flex items-center rounded-md border border-border-primary bg-bg-secondary p-0.5">
      {locales.map((l: Locale) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={cn(
            'px-2.5 h-7 text-[11px] font-medium tracking-wide rounded-sm transition-colors',
            locale === l
              ? 'bg-bg-tertiary text-text-primary'
              : 'text-text-tertiary hover:text-text-primary',
          )}
        >
          {localeFlags[l]}
        </button>
      ))}
    </div>
  );
}
