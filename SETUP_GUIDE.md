# Setra — Manual Setup Guide

Bu dosya, Setra'yı canlıya almak için sıfırdan yapman gereken her şeyi adım adım anlatıyor.
**Vercel + Supabase + Lemon Squeezy + Resend** üzerinden kurulum yapacağız.

---

## Genel Bakış — Sıra

| # | Adım | Platform | Süre |
|---|------|----------|------|
| 1 | Supabase projesi oluştur | supabase.com | 5 dk |
| 2 | Veritabanı tablolarını kur | Supabase SQL | 5 dk |
| 3 | Storage bucket'larını oluştur | Supabase | 2 dk |
| 4 | Supabase Auth ayarlarını yap | Supabase | 3 dk |
| 5 | Resend hesabı ve API key | resend.com | 3 dk |
| 6 | Lemon Squeezy mağazası kur | lemonsqueezy.com | 15 dk |
| 7 | Vercel'e deploy et | vercel.com | 10 dk |
| 8 | Vercel env değişkenlerini ekle | Vercel | 5 dk |
| 9 | Supabase'e production URL'ini ekle | Supabase | 2 dk |
| 10 | Lemon Squeezy webhook URL'ini ayarla | Lemon Squeezy | 2 dk |

**Toplam: ~52 dakika**

---

## Adım 1 — Supabase Projesi Oluştur

1. **https://supabase.com** → Sign in (yoksa kayıt ol)
2. **New project** butonuna tıkla
3. Bilgileri doldur:
   - **Name:** `setra-production`
   - **Database Password:** güçlü bir şifre oluştur → bir yere kaydet (ileride lazım olabilir)
   - **Region:** `Central EU (Frankfurt)` — Türkiye'ye en yakın
4. **Create new project** → 2-3 dakika bekle (provisioning)

### API Anahtarlarını Al

Proje hazır olduktan sonra:

1. Sol menü → **Project Settings** → **API**
2. Şunları bir yere kopyala:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL` olacak
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY` olacak
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` olacak

> ⚠️ `service_role` key'ini kimseyle paylaşma ve asla frontend'e koyma.

---

## Adım 2 — Veritabanı Tablolarını Kur

1. Supabase dashboard → sol menü → **SQL Editor**
2. **New query** → her migration dosyasını sırasıyla çalıştır:

### Çalıştırma Sırası

Her dosyanın içeriğini aşağıdaki sırayla SQL editörüne kopyalayıp **Run** bas:

**① `supabase/migrations/001_auth_profiles.sql`**
- Profiles tablosu + `handle_new_user` trigger'ı
- Kayıt olan her kullanıcı için otomatik profil oluşturur

**② `supabase/migrations/002_clients.sql`**
- Clients (müşteri) tablosu

**③ `supabase/migrations/003_workout_plans.sql`**
- Exercises, workout_plans, workout_days, workout_exercises, client_workout_assignments tabloları

**④ `supabase/migrations/004_payments.sql`**
- Payments tablosu + index'ler

**⑤ `supabase/migrations/005_messages.sql`**
- Messages + message_templates tabloları

**⑥ `supabase/migrations/006_progress.sql`**
- Progress_entries + progress_photos tabloları

**⑦ `supabase/migrations/007_automations.sql`**
- Automations + automation_logs tabloları

**⑧ `supabase/migrations/008_rls_policies.sql`**
- Tüm tablolara Row Level Security politikaları
- ⚠️ Bu en son çalıştırılmalı

### Doğrulama

SQL Editor'de şunu çalıştır, hata vermemeli:
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

Şu tabloları görmelisin: `automation_logs`, `automations`, `client_workout_assignments`, `clients`, `exercises`, `message_templates`, `messages`, `payments`, `profiles`, `progress_entries`, `progress_photos`, `workout_days`, `workout_exercises`, `workout_plans`

---

## Adım 3 — Storage Bucket'larını Oluştur

1. Supabase dashboard → sol menü → **Storage**
2. **New bucket** butonuyla şu bucket'ları oluştur:

| Bucket Adı | Public? | Açıklama |
|------------|:-------:|----------|
| `avatars` | ✅ Public | Koç ve müşteri profil fotoğrafları |
| `progress-photos` | ❌ Private | İlerleme fotoğrafları |
| `exercise-media` | ✅ Public | Egzersiz görselleri |
| `exports` | ❌ Private | CSV/PDF dışa aktarma (geçici) |

### Her Bucket için RLS Policy Ekle

**`avatars` bucket için:**
1. Bucket'a tıkla → **Policies** → **New policy**
2. **For full customization** seç
3. Policy name: `Public read, auth write`
4. Allowed operations: SELECT (herkese), INSERT + UPDATE + DELETE (auth users)

**`progress-photos` bucket için:**
1. Bucket'a tıkla → **Policies** → **New policy**
2. Policy name: `Auth users own data`
3. Sadece authenticate olmuş kullanıcılar kendi klasörlerine erişebilsin

---

## Adım 4 — Supabase Auth Ayarları

1. Supabase dashboard → **Authentication** → **Settings**

### Email Templates

**Confirm signup:**
- Subject: `Setra'ya hoş geldin, hesabını doğrula`

**Reset password:**
- Subject: `Setra — şifre sıfırlama bağlantısı`

### URL Configuration (şimdilik localhost)

**Site URL:** `http://localhost:3000`
**Redirect URLs:** `http://localhost:3000/**`

> ⚠️ Vercel deploy ettikten sonra bu değerleri production URL'inle güncelleyeceksin → [Adım 9](#adım-9--supabase-production-url-ayarları)

### Auth Providers (opsiyonel)

Email/password varsayılan olarak açık, başka bir şeye gerek yok şimdilik.

---

## Adım 5 — Resend Kurulumu (E-posta)

1. **https://resend.com** → Sign up
2. Dashboard → **API Keys** → **Create API Key**
   - Name: `setra-production`
   - Permission: `Sending access`
3. API key'i kopyala → `RESEND_API_KEY` olacak

### Domain Doğrulama (opsiyonel ama önerilen)

Eğer kendi domain'in varsa (`setra.app` gibi):
1. **Domains** → **Add Domain**
2. DNS kayıtlarını domain sağlayıcında ekle (Resend size ne ekleyeceğinizi söyler)
3. Doğrulandıktan sonra `EMAIL_FROM` değişkenini `noreply@senin-domain.com` yap

Şimdilik `onboarding@resend.dev` varsayılan adresi çalışır (test için yeterli).

---

## Adım 6 — Lemon Squeezy Kurulumu

### 6.1 Hesap & Mağaza

1. **https://app.lemonsqueezy.com** → Sign up
2. **Dashboard** → **Stores** → **Create Store**
   - Store name: `Setra`
   - Store URL: `setra` (ya da istediğin bir slug)
   - Currency: `Turkish Lira (TRY)` veya `US Dollar (USD)`
3. Store oluştuktan sonra: **Settings** → **Store** → **Store ID**'yi kopyala → `LEMON_SQUEEZY_STORE_ID` olacak

### 6.2 API Key Al

1. **Account Settings** (sağ üst profil) → **API**
2. **Create new API key**
   - Label: `setra-production`
3. Key'i kopyala → `LEMON_SQUEEZY_API_KEY` olacak

### 6.3 Ürünleri Oluştur

**Solo Plan — Aylık (TRY):**
1. Dashboard → **Products** → **Create Product**
2. Name: `Setra Solo — Aylık`
3. Pricing model: `Subscription`
4. Price: `₺799 / month`
5. **Save** → Ürünü aç → **Variants** → variant ID'yi not al

**Solo Plan — Yıllık (TRY):**
1. Aynı ürüne **Add variant** ya da yeni ürün: `₺7.670 / year`
2. Variant ID'yi not al

**Solo Plan — Aylık (USD):**
1. Yeni ürün: `$29 / month`
2. Variant ID'yi not al

**Solo Plan — Yıllık (USD):**
1. `$278 / year`
2. Variant ID'yi not al

**Studio planları için de aynısını tekrarla** (₺2.199/ay, ₺21.110/yıl, $79/ay, $758/yıl)

> Toplamda 8 variant ID'n olacak. Bunlar `.env.local` dosyasındaki `NEXT_PUBLIC_LS_*` değişkenleri olacak.

### 6.4 Webhook Oluştur (Deploy Sonrası)

Bu adımı Vercel deploy ettikten sonra yapacaksın → [Adım 10](#adım-10--lemon-squeezy-webhook-ayarı)

---

## Adım 7 — Vercel'e Deploy Et

1. **https://vercel.com** → Sign in (GitHub ile)
2. **Add New Project** → **Import Git Repository**
3. `kutluhangil/SetraFitnessCRM` reposunu seç → **Import**
4. **Framework Preset:** Next.js (otomatik algılar)
5. **Root Directory:** `.` (değiştirme, zaten doğru)
6. **Build & Output Settings:** varsayılan (değiştirme)
7. **Environment Variables** — bir sonraki adımda ekleyeceğiz
8. **Deploy** butonuna bas → ilk deploy başlar (env vars eksik, hata verebilir — normal)

---

## Adım 8 — Vercel Ortam Değişkenleri

Vercel dashboard → **Project** → **Settings** → **Environment Variables**

Her değişkeni ekle (**Environment:** Production, Preview, Development hepsini işaretle):

### Supabase

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Adım 1'den aldığın Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Adım 1'den aldığın anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Adım 1'den aldığın service_role key |

### Lemon Squeezy

| Key | Value |
|-----|-------|
| `LEMON_SQUEEZY_API_KEY` | Adım 6.2'den aldığın key |
| `LEMON_SQUEEZY_WEBHOOK_SECRET` | Adım 10'da oluşturulacak — şimdilik boş bırak |
| `LEMON_SQUEEZY_STORE_ID` | Adım 6.1'den aldığın Store ID |
| `NEXT_PUBLIC_LS_SOLO_MONTHLY_TRY` | Solo aylık TRY variant ID |
| `NEXT_PUBLIC_LS_SOLO_YEARLY_TRY` | Solo yıllık TRY variant ID |
| `NEXT_PUBLIC_LS_SOLO_MONTHLY_USD` | Solo aylık USD variant ID |
| `NEXT_PUBLIC_LS_SOLO_YEARLY_USD` | Solo yıllık USD variant ID |
| `NEXT_PUBLIC_LS_STUDIO_MONTHLY_TRY` | Studio aylık TRY variant ID |
| `NEXT_PUBLIC_LS_STUDIO_YEARLY_TRY` | Studio yıllık TRY variant ID |
| `NEXT_PUBLIC_LS_STUDIO_MONTHLY_USD` | Studio aylık USD variant ID |
| `NEXT_PUBLIC_LS_STUDIO_YEARLY_USD` | Studio yıllık USD variant ID |

### Resend

| Key | Value |
|-----|-------|
| `RESEND_API_KEY` | Adım 5'ten aldığın key |
| `EMAIL_FROM` | `noreply@resend.dev` (ya da kendi domain'in) |

### Uygulama

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_APP_URL` | `https://setra-xxx.vercel.app` (Vercel'in verdiği URL) |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | `tr` |
| `CRON_SECRET` | Rastgele güçlü bir string — örnek: `openssl rand -hex 32` ile üret |

### Env Variables Eklendikten Sonra

**Deployments** → En son deployment → **Redeploy** — bu sefer env vars ile build olacak.

---

## Adım 9 — Supabase Production URL Ayarları

Deploy tamamlandıktan sonra Vercel'den production URL'ini al (`https://setra-xxx.vercel.app`).

1. Supabase dashboard → **Authentication** → **URL Configuration**
2. **Site URL:** `https://setra-xxx.vercel.app`
3. **Redirect URLs:** `https://setra-xxx.vercel.app/**`
4. **Save**

> Eğer custom domain eklediysen (`setra.app` gibi), Vercel URL yerine onu kullan.

---

## Adım 10 — Lemon Squeezy Webhook Ayarı

1. Lemon Squeezy → **Settings** → **Webhooks** → **Add webhook**
2. **URL:** `https://setra-xxx.vercel.app/api/webhooks/lemon-squeezy`
3. **Secret:** yeni bir güçlü string oluştur (örnek: `openssl rand -hex 32`)
4. **Events** — şunları seç:
   - `subscription_created`
   - `subscription_updated`
   - `subscription_cancelled`
   - `subscription_expired`
   - `subscription_payment_success`
   - `subscription_payment_failed`
5. **Save**

### Secret'ı Vercel'e Ekle

1. Vercel → **Settings** → **Environment Variables**
2. `LEMON_SQUEEZY_WEBHOOK_SECRET` değerini 3. adımdaki string ile güncelle
3. **Redeploy** et

---

## Adım 11 — Test Et

### Kayıt / Giriş

1. `https://setra-xxx.vercel.app/register` adresine git
2. Yeni hesap oluştur
3. Supabase → **Authentication** → **Users** — kullanıcının oluştuğunu gör
4. Supabase → **Table Editor** → `profiles` — profilin trigger ile oluştuğunu kontrol et

### Dashboard

1. Giriş yaptıktan sonra `/dashboard` açılmalı
2. Sol sidebar görünmeli
3. Gelir grafiği (placeholder data ile) görünmeli

### Health Check

`https://setra-xxx.vercel.app/api/health` adresine git:
```json
{ "ok": true, "ts": 1234567890 }
```
Bu dönüyorsa deployment sağlıklı.

---

## Adım 12 — Custom Domain Ekle (Opsiyonel)

1. Vercel → **Project** → **Settings** → **Domains**
2. Domain adını gir (örnek: `setra.app`)
3. Vercel sana DNS kayıtlarını gösterir — domain sağlayıcında ekle
4. SSL otomatik aktif olur (Let's Encrypt)
5. Domain aktif olunca Adım 9'daki Supabase URL'lerini güncelle

---

## Cron Job'lar (Vercel)

`vercel.json` içinde iki cron tanımlı. Vercel bu endpoint'leri otomatik çağırır:

| Endpoint | Zaman | Ne Yapar |
|----------|-------|---------|
| `/api/cron/payment-reminders` | Her gün 09:00 UTC | 3 gün içinde vadesi gelecek ödemelere hatırlatma gönderir |
| `/api/cron/auto-messages` | Her gün 10:00 UTC | Otomasyonları çalıştırır (ileride aktif olacak) |

> **Not:** Vercel Cron Jobs Pro plan gerektirir. Ücretsiz planda cron'lar çalışmaz ama uygulama çalışır. Cron'lar için alternatif: Supabase Edge Functions + pg_cron kullanılabilir (ücretsiz).

---

## Yerel Geliştirme (Tekrar)

Tüm servisleri kurduktan sonra `.env.local` dosyasını production değerlerle doldur:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

LEMON_SQUEEZY_API_KEY=...
LEMON_SQUEEZY_WEBHOOK_SECRET=...
LEMON_SQUEEZY_STORE_ID=...

RESEND_API_KEY=re_...
EMAIL_FROM=noreply@setra.app

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=tr
CRON_SECRET=...
```

```bash
npm run dev
```

---

## Sık Karşılaşılan Sorunlar

### "Invalid API key" hatası
→ Supabase anon key'ini Vercel'de doğru girdiğini kontrol et. Satır başı/sonu boşluk olmadığından emin ol.

### Kayıt sonrası profil oluşmuyor
→ `001_auth_profiles.sql` migration'ının çalıştırıldığını kontrol et. SQL Editor'de:
```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```
Sonuç dönmeli.

### Dashboard'a giriş yapılamıyor, login'e redirect ediliyor
→ Supabase → Authentication → URL Configuration'da Site URL'i doğru girdiğinden emin ol.

### Lemon Squeezy webhook "Invalid signature" dönüyor
→ `LEMON_SQUEEZY_WEBHOOK_SECRET` değerinin Vercel'deki ile Lemon Squeezy'deki eşleştiğini kontrol et.

### Vercel build hatası: "Cannot find module"
→ Vercel → Deployments → Build log'a bak. Genellikle bir env variable eksiktir. Tüm değişkenlerin eklendiğini ve Redeploy yapıldığını kontrol et.

---

## Özet Checklist

```
[ ] Supabase projesi oluşturuldu
[ ] 8 migration dosyası çalıştırıldı (001 → 008)
[ ] 4 storage bucket oluşturuldu
[ ] Supabase Auth URL'leri ayarlandı
[ ] Resend API key alındı
[ ] Lemon Squeezy store oluşturuldu
[ ] 8 subscription variant oluşturuldu ve ID'leri not alındı
[ ] Vercel'e import edildi ve deploy edildi
[ ] Tüm env değişkenleri Vercel'e eklendi
[ ] Vercel production URL'i Supabase'e girildi
[ ] Lemon Squeezy webhook URL'i ayarlandı ve secret Vercel'e eklendi
[ ] Redeploy yapıldı
[ ] Kayıt/giriş test edildi
[ ] /api/health endpoint çalışıyor
```
