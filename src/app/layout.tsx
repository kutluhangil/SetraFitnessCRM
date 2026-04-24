import type { Metadata, Viewport } from 'next';
import { Outfit, JetBrains_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import { I18nProvider } from '@/lib/i18n/provider';
import { defaultLocale, locales, type Locale } from '@/lib/i18n/config';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'FitCRM — Fitness Koçları İçin Dikey CRM',
    template: '%s · FitCRM',
  },
  description:
    'Müşteri takibi, antrenman planı, ödeme hatırlatma ve otomasyon — tek bir premium platformda.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  openGraph: {
    title: 'FitCRM',
    description: 'Fitness koçları için dikey CRM',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#09090B',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('locale')?.value as Locale | undefined;
  const initialLocale: Locale =
    cookieLocale && locales.includes(cookieLocale) ? cookieLocale : defaultLocale;

  return (
    <html lang={initialLocale} className={`${outfit.variable} ${jetbrains.variable}`}>
      <body className="noise bg-bg-primary text-text-primary antialiased">
        <I18nProvider initialLocale={initialLocale}>{children}</I18nProvider>
      </body>
    </html>
  );
}
