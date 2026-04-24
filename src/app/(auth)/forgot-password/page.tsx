'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTranslation } from '@/lib/i18n/provider';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSent(true);
      setLoading(false);
    } catch {
      setError('Bir şeyler ters gitti. Lütfen tekrar dene.');
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in-up text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-success-muted text-success flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{t('auth.checkEmail')}</h1>
          <p className="text-sm text-text-tertiary">{t('auth.checkEmailDesc', { email })}</p>
        </div>
        <Link
          href="/login"
          className="text-sm text-text-secondary hover:text-text-primary inline-flex items-center gap-1.5 justify-center"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {t('auth.backToLogin')}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t('auth.forgotTitle')}</h1>
        <p className="text-sm text-text-tertiary">{t('auth.forgotSubtitle')}</p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          name="email"
          label={t('auth.emailLabel')}
          placeholder={t('auth.emailPlaceholder')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="h-4 w-4" />}
          autoComplete="email"
          required
        />

        {error && (
          <div className="rounded-md bg-danger-muted border border-danger/30 px-3 py-2 text-xs text-danger">
            {error}
          </div>
        )}

        <Button type="submit" size="lg" fullWidth loading={loading}>
          {loading ? t('common.sending') : t('auth.submitForgot')}
        </Button>
      </form>

      <Link
        href="/login"
        className="text-center text-sm text-text-tertiary hover:text-text-primary inline-flex items-center gap-1.5 justify-center"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> {t('auth.backToLogin')}
      </Link>
    </div>
  );
}
