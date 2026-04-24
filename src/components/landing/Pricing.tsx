'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n/provider';
import { cn } from '@/lib/utils/cn';

type Billing = 'monthly' | 'yearly';

interface Plan {
  key: 'solo' | 'studio';
  nameKey: string;
  descKey: string;
  price: { monthly: { TRY: number; USD: number }; yearly: { TRY: number; USD: number } };
  clientLimit: number;
  highlighted?: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    key: 'solo',
    nameKey: 'landing.soloName',
    descKey: 'landing.soloDesc',
    price: { monthly: { TRY: 799, USD: 29 }, yearly: { TRY: 7670, USD: 278 } },
    clientLimit: 50,
    features: [
      'Müşteri yönetimi',
      'Antrenman builder',
      'Ödeme takibi',
      'İlerleme grafikleri',
      '5 otomasyon',
      'E-posta mesajları',
      'Mesaj şablonları',
    ],
  },
  {
    key: 'studio',
    nameKey: 'landing.studioName',
    descKey: 'landing.studioDesc',
    price: { monthly: { TRY: 2199, USD: 79 }, yearly: { TRY: 21110, USD: 758 } },
    clientLimit: 200,
    highlighted: true,
    features: [
      'Solo planının tüm özellikleri',
      'Sınırsız otomasyon',
      'WhatsApp entegrasyonu',
      'Gelişmiş analitik',
      'CSV / PDF dışa aktarma',
      'Öncelikli destek',
    ],
  },
];

export function Pricing() {
  const { t, locale } = useTranslation();
  const [billing, setBilling] = useState<Billing>('monthly');

  const currency = locale === 'tr' ? 'TRY' : 'USD';
  const symbol = currency === 'TRY' ? '₺' : '$';

  return (
    <section id="pricing" className="relative border-t border-border-primary py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
            {t('landing.pricingEyebrow')}
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">
            {t('landing.pricingTitle')}
          </h2>
        </div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center rounded-full border border-border-primary bg-bg-secondary p-1">
            {(['monthly', 'yearly'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={cn(
                  'relative px-4 h-8 rounded-full text-xs font-medium tracking-wide transition-colors',
                  billing === b
                    ? 'bg-white text-black'
                    : 'text-text-tertiary hover:text-text-primary',
                )}
              >
                {t(b === 'monthly' ? 'landing.pricingMonthly' : 'landing.pricingYearly')}
                {b === 'yearly' && (
                  <span
                    className={cn(
                      'ml-1.5 inline-flex items-center px-1.5 h-4 text-[10px] font-semibold rounded',
                      billing === 'yearly' ? 'bg-black/10 text-black' : 'bg-success-muted text-success',
                    )}
                  >
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {plans.map((plan, idx) => {
            const price = plan.price[billing][currency as 'TRY' | 'USD'];
            const monthlyEq = billing === 'yearly' ? Math.round(price / 12) : price;

            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'relative rounded-xl border p-7 flex flex-col',
                  plan.highlighted
                    ? 'bg-bg-secondary border-border-active shadow-lg'
                    : 'bg-bg-secondary/50 border-border-primary',
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-white text-black text-[10px] font-semibold tracking-wide px-2.5 h-5">
                    ÖNERİLEN
                  </div>
                )}

                <div>
                  <div className="text-sm font-semibold tracking-tight text-text-primary">
                    {t(plan.nameKey)}
                  </div>
                  <div className="text-xs text-text-tertiary mt-1">{t(plan.descKey)}</div>
                </div>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-semibold tracking-tighter">
                    {symbol}
                    {monthlyEq.toLocaleString()}
                  </span>
                  <span className="text-xs text-text-tertiary">{t('landing.pricingPerMonth')}</span>
                </div>
                {billing === 'yearly' && (
                  <div className="mt-1 text-[11px] text-text-muted">
                    {symbol}
                    {price.toLocaleString()} / yıl
                  </div>
                )}

                <div className="mt-5 text-xs text-text-secondary">
                  {plan.clientLimit} müşteri limiti
                </div>

                <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-text-secondary"
                    >
                      <Check className="h-4 w-4 text-text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/register" className="mt-7">
                  <Button
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    size="md"
                    fullWidth
                  >
                    {t('landing.pricingStart')}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
