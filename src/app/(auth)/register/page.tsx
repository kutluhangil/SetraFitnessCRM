'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTranslation } from '@/lib/i18n/provider';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const { t, locale } = useTranslation();
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
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
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            business_name: businessName || null,
            locale,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Bir şeyler ters gitti. Lütfen tekrar dene.');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 animate-fade-in-up">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t('auth.registerTitle')}</h1>
        <p className="text-sm text-text-tertiary">{t('auth.registerSubtitle')}</p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Input
          name="fullName"
          label={t('auth.fullNameLabel')}
          placeholder={t('auth.fullNamePlaceholder')}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          leftIcon={<User className="h-4 w-4" />}
          autoComplete="name"
          required
        />

        <Input
          name="businessName"
          label={t('auth.businessNameLabel')}
          placeholder={t('auth.businessNamePlaceholder')}
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          leftIcon={<Building2 className="h-4 w-4" />}
          autoComplete="organization"
        />

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
          autoComplete="new-password"
          minLength={8}
          required
        />

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
          {loading ? t('common.creatingAccount') : t('auth.submitRegister')}
        </Button>

        <p className="text-[11px] text-text-muted text-center leading-relaxed">
          {t('auth.termsAgree', {
            terms: t('auth.terms'),
            privacy: t('auth.privacy'),
          })}
        </p>
      </form>

      <p className="text-center text-sm text-text-tertiary">
        {t('auth.hasAccount')}{' '}
        <Link href="/login" className="text-text-primary font-medium hover:underline">
          {t('auth.signIn')}
        </Link>
      </p>
    </div>
  );
}
