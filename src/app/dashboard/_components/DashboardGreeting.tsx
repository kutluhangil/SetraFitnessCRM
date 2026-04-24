'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n/provider';

export function DashboardGreeting({ name }: { name: string }) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-1"
    >
      <h1 className="text-2xl font-semibold tracking-tight text-gradient">
        {t('dashboard.welcome', { name })}
      </h1>
      <p className="text-sm text-text-tertiary">{t('dashboard.welcomeSubtitle')}</p>
    </motion.div>
  );
}
