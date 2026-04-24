'use client';

import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/provider';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border-primary">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-white text-black flex items-center justify-center">
            <Dumbbell className="h-3.5 w-3.5" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-tight">FitCRM</span>
        </Link>
        <p className="text-xs text-text-muted">{t('landing.footerCopy')}</p>
      </div>
    </footer>
  );
}
