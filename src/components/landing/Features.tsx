'use client';

import { motion } from 'framer-motion';
import {
  Users,
  Dumbbell,
  Wallet,
  LineChart,
  Zap,
  Languages,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/provider';
import { fadeInUp, staggerContainer } from '@/lib/utils/motion';

interface FeatureItem {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
}

const features: FeatureItem[] = [
  { icon: Users, titleKey: 'landing.featureClientsTitle', descKey: 'landing.featureClientsDesc' },
  { icon: Dumbbell, titleKey: 'landing.featureWorkoutsTitle', descKey: 'landing.featureWorkoutsDesc' },
  { icon: Wallet, titleKey: 'landing.featurePaymentsTitle', descKey: 'landing.featurePaymentsDesc' },
  { icon: LineChart, titleKey: 'landing.featureProgressTitle', descKey: 'landing.featureProgressDesc' },
  { icon: Zap, titleKey: 'landing.featureAutomationsTitle', descKey: 'landing.featureAutomationsDesc' },
  { icon: Languages, titleKey: 'landing.featureI18nTitle', descKey: 'landing.featureI18nDesc' },
];

export function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="relative border-t border-border-primary py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
            {t('landing.featuresEyebrow')}
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">
            {t('landing.featuresTitle')}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border-primary rounded-xl overflow-hidden border border-border-primary"
        >
          {features.map((f) => (
            <motion.div
              key={f.titleKey}
              variants={fadeInUp}
              className="group relative bg-bg-primary p-7 sm:p-8 hover:bg-bg-secondary transition-colors duration-normal"
            >
              <div className="h-9 w-9 rounded-md bg-bg-secondary border border-border-primary flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:border-border-hover transition-colors">
                <f.icon className="h-4 w-4" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{t(f.titleKey)}</h3>
              <p className="mt-2 text-sm text-text-tertiary leading-relaxed">{t(f.descKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
