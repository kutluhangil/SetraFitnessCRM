'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTranslation } from '@/lib/i18n/provider';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError('Bir şeyler ters gitti. Lütfen tekrar dene.');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
          {t('auth.loginTitle')}
        </h1>
        <p className="text-sm text-text-tertiary">{t('auth.loginSubtitle')}</p>
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

        <Input
          type="password"
          name="password"
          label={t('auth.passwordLabel')}
          placeholder={t('auth.passwordPlaceholder')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="h-4 w-4" />}
          autoComplete="current-password"
          required
        />

        <div className="flex justify-end -mt-1">
          <Link
            href="/forgot-password"
            className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
          >
            {t('auth.forgotLink')}
          </Link>
        </div>

        {error && (
          <div className="rounded-md bg-danger-muted border border-danger/30 px-3 py-2 text-xs text-danger">
            {error}
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={loading}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          {loading ? t('common.signingIn') : t('auth.submitLogin')}
        </Button>
      </form>

      <p className="text-center text-sm text-text-tertiary">
        {t('auth.noAccount')}{' '}
        <Link href="/register" className="text-text-primary font-medium hover:underline">
          {t('auth.signUp')}
        </Link>
      </p>
    </div>
  );
}
