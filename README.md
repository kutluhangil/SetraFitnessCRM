<div align="center">

<br />

<img src="https://img.shields.io/badge/FitCRM-v0.1-000000?style=for-the-badge&logoColor=white" alt="version" />
<img src="https://img.shields.io/badge/Built_with-TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
<img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextjs" />
<img src="https://img.shields.io/badge/TailwindCSS-v3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind" />
<img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="supabase" />
<img src="https://img.shields.io/badge/Framer_Motion-Animated-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="framer" />

<br /><br />

```text
███████╗██╗████████╗ ██████╗██████╗ ███╗   ███╗
██╔════╝██║╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
█████╗  ██║   ██║   ██║     ██████╔╝██╔████╔██║
██╔══╝  ██║   ██║   ██║     ██╔══██╗██║╚██╔╝██║
██║     ██║   ██║   ╚██████╗██║  ██║██║ ╚═╝ ██║
╚═╝     ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝
```

### **One Dashboard. Every Client.** — Track progress, manage plans & collect payments.

[Canlı Uygulama](https://fitcrm.app) · [Hata Bildir](https://github.com/kutluhangil/SetraFitnessCRM/issues) · [Özellik Öner](https://github.com/kutluhangil/SetraFitnessCRM/issues)

</div>

---

## ✦ FitCRM Nedir?

**FitCRM**, solo fitness koçları ve küçük stüdyolar için tasarlanmış dikey bir CRM platformudur. Genel CRM'lerin (HubSpot, Salesforce) fitness iş akışını anlamadığı noktada devreye girer.

Müşteri takibini messy Excel tablolarında yapmayı bırak. Her antrenman planı, her ödeme hatırlatması ve her ilerleme kaydı — güvenli bir şekilde bulutta saklansın. Hız, derin analitik görünüm ve göz alıcı **"Karanlık Lüks"** koyu mod tasarımı için inşa edildi.

---

## ⚡ Özellikler

| Özellik | Açıklama |
|---------|----------|
| 📊 **Kontrol Paneli** | Toplam müşteri, aylık gelir, gecikmiş ödeme ve trend grafikleri tek bakışta |
| 👥 **Müşteri Yönetimi** | Profil, etiketler, tıbbi notlar, ödeme planı ve fitness hedefleri tek ekranda |
| 🏋️ **Antrenman Builder** | Sürükle-bırak editör ile haftalık planlar, yeniden kullanılabilir şablonlar ve süper set tanımı |
| 📈 **İlerleme Takibi** | Vücut ölçümleri grafikleri ve önce/sonra fotoğraf karşılaştırması |
| 💳 **Ödeme Sistemi** | Aylık ücretleri otomatik oluştur, hatırlatma e-postası gönder, geliri grafikle izle |
| ⚡ **Otomasyon Motoru** | Ödeme hatırlatma, hoş geldin mesajı, doğum günü kutlaması — bir kez kur, kendisi çalışsın |
| 🌍 **İki Dil Desteği** | Türkçe ve İngilizce arasında sorunsuz geçiş — tüm arayüz dahil |
| 🔐 **Güvenli Auth** | Supabase Auth + Row Level Security ile her koçun verisi tamamen izole |
| 🚀 **Self-Hosted** | Docker + Nginx ile kendi sunucuna deploy, Cloudflare Tunnel ile kolay SSL |

---

## 🖼️ Ekran Görüntüleri

> *(Yakında — FitCRM arayüzünün yüksek kaliteli mockup&apos;ları)*

---

## 🛠️ Teknoloji Stack

```
Frontend        →  Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS v3 · Framer Motion
UI Bileşenleri  →  Özel tasarım sistemi (Button, Card, Badge, Avatar, Input, StatCard...)
Grafikler       →  Recharts (AreaChart — dark theme custom tooltip)
i18n            →  Context tabanlı TR/EN provider + public/locales sözlük sistemi
Fontlar         →  Outfit (display + body) · JetBrains Mono (code / sayısal)
Veritabanı      →  Supabase (PostgreSQL + RLS + Realtime + Storage)
Auth            →  Supabase Auth (email/password + session yönetimi)
Ödeme           →  Lemon Squeezy (SaaS abonelik + webhook imza doğrulama)
E-posta         →  Resend (otomasyon bildirimleri)
Zamanlı Görev   →  Supabase pg_cron + Edge Functions
Deployment      →  Docker (multi-stage standalone build) + Nginx · Cloudflare Tunnel
```

---

## 🏗️ Mimari

```
┌────────────────────────────────────────────────────────────────┐
│                         FITCRM CLIENT                          │
│                                                                │
│  ┌───────────────┐  ┌───────────────┐  ┌─────────────────────┐│
│  │  I18n Context │  │  Next.js 14   │  │   Framer Motion     ││
│  │  TR / EN      │  │  App Router   │  │   Page Transitions  ││
│  └───────────────┘  └───────────────┘  └─────────────────────┘│
└───────────────────────────┬────────────────────────────────────┘
                            │ (SSR + Client Components)
         ┌──────────────────┼──────────────────┐
         │                  │                  │
┌────────────────┐  ┌───────────────┐  ┌───────────────────┐
│   Supabase     │  │ Lemon Squeezy │  │     Resend        │
│ (DB · Auth ·  │  │  (Ödeme ·    │  │  (E-posta ·       │
│  Storage ·    │  │   Webhook ·  │  │   Otomasyon       │
│  Realtime)    │  │   Abonelik)  │  │   Bildirimleri)   │
└────────────────┘  └───────────────┘  └───────────────────┘
```

---

## 📐 Proje Yapısı

```text
SetraFitnessCRM/
├── public/
│   └── locales/
│       ├── tr/common.json         # Türkçe çeviriler
│       └── en/common.json         # İngilizce çeviriler
├── src/
│   ├── app/
│   │   ├── (auth)/                # Login · Register · Forgot Password
│   │   ├── dashboard/             # Dashboard shell + tüm alt sayfalar
│   │   │   ├── clients/           # Müşteri listesi, detay, yeni ekleme
│   │   │   ├── workouts/          # Antrenman planları ve builder
│   │   │   ├── payments/          # Ödeme genel bakış ve geçmiş
│   │   │   ├── messages/          # Mesaj merkezi ve şablonlar
│   │   │   ├── progress/          # İlerleme grafikleri
│   │   │   ├── automations/       # Otomasyon kuralları ve loglar
│   │   │   └── settings/          # Profil, abonelik, entegrasyonlar
│   │   ├── api/
│   │   │   ├── webhooks/          # Lemon Squeezy webhook handler
│   │   │   ├── cron/              # Ödeme hatırlatma, auto-message
│   │   │   └── health/            # Health check endpoint
│   │   ├── globals.css            # CSS değişkenleri + animasyonlar
│   │   └── layout.tsx             # Root layout (font, i18n provider)
│   ├── components/
│   │   ├── ui/                    # Atomic: Button, Card, Badge, Input...
│   │   ├── layout/                # Sidebar, Topbar, MobileNav
│   │   ├── dashboard/             # StatCard, RevenueChart, QuickActions
│   │   └── landing/               # Nav, Hero, Features, Pricing, CTA
│   ├── lib/
│   │   ├── supabase/              # client · server · admin · middleware
│   │   ├── i18n/                  # config · dictionaries · provider
│   │   └── utils/                 # cn · date · currency · motion
│   └── middleware.ts              # Auth koruması + session yenileme
├── supabase/
│   └── migrations/                # 001–008 SQL migration dosyaları
├── Dockerfile                     # Multi-stage standalone build
├── docker-compose.yml
├── nginx.conf
└── .env.example
```

---

## 🚀 Başlarken

### Gereksinimler

- Node.js `>= 18`
- Supabase hesabı (Auth + PostgreSQL + Storage aktif)
- Lemon Squeezy hesabı (ödeme entegrasyonu için)
- Resend API anahtarı (e-posta otomasyonları için)

### Yerel Geliştirme

```bash
# Repoyu klonla
git clone https://github.com/kutluhangil/SetraFitnessCRM.git
cd SetraFitnessCRM

# Bağımlılıkları kur
npm install

# Ortam değişkenlerini yapılandır
cp .env.example .env.local
# Supabase ve Lemon Squeezy kimlik bilgilerini doldur

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

### Veritabanı Kurulumu

Migration dosyaları `supabase/migrations/` altında sıralıdır.

```bash
# Supabase CLI ile (önerilen)
supabase start
supabase db reset

# Ya da Supabase Studio > SQL Editörü üzerinden
# 001_auth_profiles.sql → 008_rls_policies.sql sırasıyla çalıştır
```

### Scriptler

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Geliştirme sunucusu (port 3000) |
| `npm run build` | Production build |
| `npm start` | Production sunucu |
| `npm run lint` | ESLint kontrolü |
| `npm run type-check` | TypeScript tip kontrolü |

### Ortam Değişkenleri

| Değişken | Açıklama | Zorunlu |
|----------|----------|:-------:|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Proje URL&apos;si | ✓ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | ✓ |
| `SUPABASE_SERVICE_ROLE_KEY` | Service Role (webhook için) | ✓ |
| `LEMON_SQUEEZY_API_KEY` | Lemon Squeezy API Key | ✓ |
| `LEMON_SQUEEZY_WEBHOOK_SECRET` | Webhook imza doğrulama | ✓ |
| `LEMON_SQUEEZY_STORE_ID` | Mağaza ID&apos;si | ✓ |
| `RESEND_API_KEY` | E-posta gönderimi | ✓ |
| `EMAIL_FROM` | Gönderici e-posta adresi | ✓ |
| `NEXT_PUBLIC_APP_URL` | Üretim URL&apos;si | ✓ |
| `CRON_SECRET` | Cron endpoint güvenliği | ✓ |

---

## 🔒 Güvenlik & Veri Gizliliği

| Katman | Uygulama |
|--------|----------|
| **Veritabanı** | Supabase RLS her tabloda aktif — hiçbir koç başkasının verisini okuyamaz |
| **Kimlik Doğrulama** | Supabase Auth güvenli oturumlar + middleware ile rota koruması |
| **Webhook** | HMAC-SHA256 imza doğrulaması ile Lemon Squeezy webhook güvenliği |
| **API** | `CRON_SECRET` bearer token ile tüm cron endpoint&apos;leri korumalı |
| **Çevre Değişkenleri** | Service role key ve API key&apos;ler asla client bundle&apos;a sızmaz |
| **Hata Yönetimi** | Tüm asenkron Supabase çağrıları try/catch sınırları içinde |

---

## 💳 Abonelik Planları

| Plan | Müşteri Limiti | Aylık (TRY) | Yıllık (TRY) |
|------|:-------------:|:-----------:|:------------:|
| **Deneme** | 5 | Ücretsiz (14 gün) | — |
| **Solo** | 50 | ₺799/ay | ₺7.670/yıl |
| **Stüdyo** | 200 | ₺2.199/ay | ₺21.110/yıl |

USD fiyatlandırma da mevcuttur. Ödeme altyapısı Lemon Squeezy üzerinden çalışır (Türkiye&apos;den satış desteği).

---

## 🐳 Docker Deployment

```bash
# Üretim ortamı için .env dosyasını hazırla
cp .env.example .env

# Docker image'ını build et ve başlat
docker compose up -d --build

# Nginx reverse proxy otomatik devreye girer (port 80)
# Cloudflare Tunnel ile SSL ve domain yönlendirme ekle
```

---

## 🗺️ Yol Haritası

- [x] Faz 1 — Temel altyapı (Next.js, Tailwind, Supabase, i18n, Auth)
- [x] Faz 2 — Veritabanı migration&apos;ları + RLS politikaları
- [x] Faz 3 — Dashboard shell + overview sayfası
- [x] Landing — Hero, Features, Pricing, CTA
- [ ] Faz 4 — Müşteri yönetimi (CRUD, filtreler, limit kontrolü)
- [ ] Faz 5 — Antrenman builder (drag & drop, egzersiz kütüphanesi)
- [ ] Faz 6 — İlerleme takibi (grafikler, fotoğraf karşılaştırma)
- [ ] Faz 7 — Ödeme sistemi (manuel + otomatik, gelir grafiği)
- [ ] Faz 8 — Mesajlaşma (thread görünüm, şablonlar, e-posta)
- [ ] Faz 9 — Otomasyon motoru + cron endpoint&apos;leri
- [ ] Faz 10 — Lemon Squeezy checkout + webhook entegrasyonu
- [ ] Faz 12 — Production sertleştirme (CI/CD, health check)
- [ ] Faz 13 — PWA, erişilebilirlik, performans optimizasyonu

---

## 🤝 Katkı

Katkılar memnuniyetle karşılanır. Bir issue açmaktan veya pull request göndermekten çekinme.

1. Repoyu fork&apos;la
2. Feature branch&apos;ini oluştur (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerini commit et (`git commit -m 'feat: harika özellik eklendi'`)
4. Branch&apos;e push et (`git push origin feature/harika-ozellik`)
5. Pull Request aç

---

## 📄 Lisans

MIT Lisansı kapsamında dağıtılmaktadır. Ayrıntılar için `LICENSE` dosyasına bakın.

---

<div align="center">

Hassasiyetle inşa edildi — [kutluhangil](https://github.com/kutluhangil)

<br />

**[fitcrm.app](https://fitcrm.app)**

<br />

*Faydalı bulduysan ⭐ vermeyi düşün*

</div>
