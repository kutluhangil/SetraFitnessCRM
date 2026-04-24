'use client';

import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n/provider';
import { LanguageToggle } from './LanguageToggle';

export function Nav() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="absolute inset-x-0 top-0 h-full bg-bg-primary/70 backdrop-blur-md border-b border-border-primary" />
      <nav className="relative mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-white text-black flex items-center justify-center">
            <Dumbbell className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-tight">FitCRM</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link
            href="#features"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {t('landing.navFeatures')}
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            {t('landing.navPricing')}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" size="sm">
              {t('landing.navLogin')}
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">{t('landing.navStart')}</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
