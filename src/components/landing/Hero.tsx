'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n/provider';
import { fadeInUp, staggerContainer } from '@/lib/utils/motion';
import { DashboardPreview } from './DashboardPreview';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-6xl px-5 pt-24 pb-20 lg:pt-32 lg:pb-28 text-center"
      >
        <motion.div variants={fadeInUp}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-bg-secondary px-3 h-7 text-xs text-text-secondary tracking-wide">
            <Sparkles className="h-3 w-3 text-accent" />
            {t('landing.heroBadge')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter leading-[1.05] whitespace-pre-line text-gradient"
        >
          {t('landing.heroTitle')}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mt-7 mx-auto max-w-xl text-base sm:text-lg text-text-secondary leading-relaxed"
        >
          {t('landing.heroSubtitle')}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/register">
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              {t('landing.heroCta')}
            </Button>
          </Link>
          <Link href="#features">
            <Button variant="ghost" size="lg">
              {t('landing.heroCtaSecondary')}
            </Button>
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-20">
          <DashboardPreview />
        </motion.div>
      </motion.div>
    </section>
  );
}
