# FitCRM

Dikey CRM: fitness koçları ve küçük stüdyolar için. Next.js 14 + Supabase + Tailwind + Framer Motion.

## Geliştirme

```bash
cp .env.example .env.local
# Supabase URL / anon key / service role key'i doldur
npm install
npm run dev
```

Uygulama: http://localhost:3000

## Supabase kurulumu

Migration'lar `supabase/migrations/` altında sıralı. Supabase CLI ile:

```bash
supabase start
supabase db reset
```

Ya da Supabase Studio üzerinden her dosyayı SQL editöründe sırayla çalıştırabilirsin (001 → 008).

## Scriptler

| Komut | Açıklama |
|---|---|
| `npm run dev` | Geliştirme sunucusu (port 3000) |
| `npm run build` | Production build |
| `npm start` | Production sunucu |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check |

## Deployment (Docker + Nginx)

```bash
docker compose up -d --build
```

Cloudflare Tunnel ile SSL ve domain yönlendirme için `FITCRM_PROJECT_SPEC.md` §9.4'e bak.

## Durum

**Tamamlanan fazlar:**
- Faz 1 — Altyapı (Next.js, Tailwind, Supabase client'ları, i18n, auth, middleware)
- Faz 2 — DB migration'ları (tüm 8 migration + RLS)
- Faz 3 — Dashboard shell + overview sayfası
- Faz 11 kısmen — Landing sayfası (hero + features + pricing + CTA)

**Sıradaki fazlar:** Faz 4-10, 12-13 (müşteri yönetimi, antrenman builder, ödeme sistemi, otomasyon motoru, Lemon Squeezy entegrasyonu, production sertleştirme).

Tasarım dili: `FITCRM_PROJECT_SPEC.md` §8 — "Karanlık Lüks", dark-first, minimalist premium.
