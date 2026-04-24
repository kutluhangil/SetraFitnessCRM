'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n/provider';

export function CTA() {
  const { t } = useTranslation();

  return (
    <section className="relative border-t border-border-primary py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-5">
        <div className="relative overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary p-10 sm:p-16 text-center">
          <div className="absolute inset-0 bg-mesh opacity-60 pointer-events-none" />
          <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse,black,transparent_75%)] pointer-events-none" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gradient max-w-2xl mx-auto">
              {t('landing.ctaTitle')}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-text-tertiary max-w-md mx-auto">
              {t('landing.ctaSubtitle')}
            </p>
            <Link href="/register" className="inline-block mt-8">
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {t('landing.heroCta')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
