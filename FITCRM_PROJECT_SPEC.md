# FitCRM — Dikey CRM: Fitness Koçları İçin

> **Claude Code Proje Spesifikasyonu v1.0**
> Bu dosya, projenin A'dan Z'ye tüm detaylarını içerir. Claude Code'a bu dosyayı vererek projeyi adım adım inşa edeceksin.

---

## 1. PROJE ÖZETİ

**FitCRM**, solo fitness koçları ve küçük stüdyolar için tasarlanmış dikey bir CRM platformudur. Genel CRM'lerin (HubSpot, Salesforce) fitness iş akışını anlamadığı noktada devreye girer.

**Temel Değer Önerisi:**
- Müşteri takibi, antrenman planı atama, ödeme hatırlatma, ilerleme grafiği, otomatik mesaj — tek platformda.
- Hem Türkçe hem İngilizce (i18n). Türkiye ve global pazar hedefi.
- Minimalist, premium, koyu tonlarda (gri-siyah) göz alıcı UI.

---

## 2. TEKNOLOJİ STACK

| Katman | Teknoloji | Neden |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | SSR, SEO, API Routes, Middleware |
| **Styling** | Tailwind CSS + Framer Motion | Utility-first + animasyon |
| **Veritabanı** | Supabase (PostgreSQL) | Auth, Realtime, Storage, Edge Functions |
| **Ödeme** | Lemon Squeezy | SaaS subscription yönetimi, webhook |
| **Dil** | TypeScript (strict mode) | Tip güvenliği |
| **Deployment** | Docker + Ubuntu Server | Self-hosted backend |
| **Reverse Proxy** | Nginx veya Cloudflare Tunnel | SSL, domain routing |
| **E-posta** | Resend veya Supabase Edge Functions + SMTP | Otomatik mesajlar |
| **Cron/Queue** | Supabase pg_cron + Edge Functions | Zamanlı görevler |

---

## 3. PROJE YAPISI (MONOREPO)

```
fitcrm/
├── .env.local                    # Supabase, Lemon Squeezy keys
├── .env.example                  # Örnek env dosyası
├── docker-compose.yml            # Production deployment
├── Dockerfile                    # Multi-stage build
├── nginx.conf                    # Reverse proxy config
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
│
├── public/
│   ├── locales/
│   │   ├── tr/
│   │   │   └── common.json       # Türkçe çeviriler
│   │   └── en/
│   │       └── common.json       # İngilizce çeviriler
│   ├── fonts/                    # Custom font dosyaları
│   └── images/
│
├── prisma/                       # Opsiyonel: Supabase ile doğrudan SQL de kullanılabilir
│   └── schema.prisma
│
├── supabase/
│   ├── migrations/               # SQL migration dosyaları
│   │   ├── 001_auth_profiles.sql
│   │   ├── 002_clients.sql
│   │   ├── 003_workout_plans.sql
│   │   ├── 004_payments.sql
│   │   ├── 005_messages.sql
│   │   ├── 006_progress.sql
│   │   ├── 007_automations.sql
│   │   └── 008_rls_policies.sql
│   ├── functions/                # Supabase Edge Functions
│   │   ├── payment-reminder/
│   │   ├── auto-message/
│   │   ├── progress-report/
│   │   └── lemon-webhook/
│   └── seed.sql                  # Demo data
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout (font, theme, i18n provider)
│   │   ├── page.tsx              # Landing page (marketing)
│   │   ├── globals.css           # Global styles + CSS variables
│   │   │
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   │
│   │   ├── (marketing)/
│   │   │   ├── pricing/page.tsx
│   │   │   ├── features/page.tsx
│   │   │   └── about/page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── layout.tsx        # Dashboard shell (sidebar, topbar)
│   │   │   ├── page.tsx          # Ana dashboard / overview
│   │   │   │
│   │   │   ├── clients/
│   │   │   │   ├── page.tsx      # Müşteri listesi
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx  # Müşteri detay
│   │   │   │   │   ├── workouts/page.tsx
│   │   │   │   │   ├── progress/page.tsx
│   │   │   │   │   ├── payments/page.tsx
│   │   │   │   │   └── messages/page.tsx
│   │   │   │   └── new/page.tsx  # Yeni müşteri ekle
│   │   │   │
│   │   │   ├── workouts/
│   │   │   │   ├── page.tsx      # Antrenman planı şablonları
│   │   │   │   ├── [id]/page.tsx # Plan detayı / builder
│   │   │   │   └── templates/page.tsx
│   │   │   │
│   │   │   ├── payments/
│   │   │   │   ├── page.tsx      # Ödeme genel bakış
│   │   │   │   └── history/page.tsx
│   │   │   │
│   │   │   ├── messages/
│   │   │   │   ├── page.tsx      # Mesaj merkezi
│   │   │   │   └── templates/page.tsx
│   │   │   │
│   │   │   ├── progress/
│   │   │   │   └── page.tsx      # İlerleme dashboard
│   │   │   │
│   │   │   ├── automations/
│   │   │   │   ├── page.tsx      # Otomasyon kuralları
│   │   │   │   └── logs/page.tsx # Otomasyon logları
│   │   │   │
│   │   │   └── settings/
│   │   │       ├── page.tsx      # Genel ayarlar
│   │   │       ├── profile/page.tsx
│   │   │       ├── subscription/page.tsx
│   │   │       └── integrations/page.tsx
│   │   │
│   │   └── api/
│   │       ├── webhooks/
│   │       │   └── lemon-squeezy/route.ts  # Lemon Squeezy webhook handler
│   │       ├── cron/
│   │       │   ├── payment-reminders/route.ts
│   │       │   ├── auto-messages/route.ts
│   │       │   └── progress-reports/route.ts
│   │       └── clients/
│   │           └── export/route.ts           # CSV/PDF export
│   │
│   ├── components/
│   │   ├── ui/                   # Atomic UI bileşenleri
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── Chart.tsx         # Recharts wrapper
│   │   │   ├── EmptyState.tsx
│   │   │   └── ConfirmDialog.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── ThemeToggle.tsx   # Koyu/açık mod (opsiyonel, default koyu)
│   │   │
│   │   ├── dashboard/
│   │   │   ├── StatsCard.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── ClientActivityFeed.tsx
│   │   │   ├── UpcomingPayments.tsx
│   │   │   └── QuickActions.tsx
│   │   │
│   │   ├── clients/
│   │   │   ├── ClientCard.tsx
│   │   │   ├── ClientForm.tsx
│   │   │   ├── ClientFilters.tsx
│   │   │   └── ClientAvatar.tsx
│   │   │
│   │   ├── workouts/
│   │   │   ├── WorkoutBuilder.tsx      # Drag & drop plan oluşturucu
│   │   │   ├── ExerciseCard.tsx
│   │   │   ├── ExerciseSearch.tsx
│   │   │   ├── SetRepInput.tsx
│   │   │   └── WorkoutCalendar.tsx
│   │   │
│   │   ├── progress/
│   │   │   ├── ProgressChart.tsx       # Recharts ile çizgi/çubuk grafik
│   │   │   ├── BodyMetricsForm.tsx
│   │   │   ├── PhotoComparison.tsx     # Önce/sonra fotoğraf
│   │   │   └── MilestoneTimeline.tsx
│   │   │
│   │   ├── payments/
│   │   │   ├── PaymentStatusBadge.tsx
│   │   │   ├── InvoicePreview.tsx
│   │   │   └── PaymentReminder.tsx
│   │   │
│   │   ├── messages/
│   │   │   ├── MessageComposer.tsx
│   │   │   ├── MessageThread.tsx
│   │   │   ├── TemplateSelector.tsx
│   │   │   └── AutoMessageRule.tsx
│   │   │
│   │   └── automations/
│   │       ├── AutomationCard.tsx
│   │       ├── TriggerSelector.tsx
│   │       ├── ActionBuilder.tsx
│   │       └── AutomationLog.tsx
│   │
│   ├── hooks/
│   │   ├── useSupabase.ts         # Supabase client hook
│   │   ├── useAuth.ts             # Auth state hook
│   │   ├── useClients.ts          # CRUD hook
│   │   ├── useWorkouts.ts
│   │   ├── usePayments.ts
│   │   ├── useMessages.ts
│   │   ├── useAutomations.ts
│   │   ├── useSubscription.ts     # Lemon Squeezy plan bilgisi
│   │   ├── useClientLimit.ts      # Müşteri limiti kontrolü
│   │   ├── useProgress.ts
│   │   ├── useTranslation.ts      # i18n hook
│   │   └── useMediaQuery.ts       # Responsive hook
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts          # Browser client
│   │   │   ├── server.ts          # Server client (SSR)
│   │   │   ├── admin.ts           # Service role client
│   │   │   └── middleware.ts      # Auth middleware
│   │   │
│   │   ├── lemon-squeezy/
│   │   │   ├── client.ts          # LS API client
│   │   │   ├── webhook.ts         # Webhook signature doğrulama
│   │   │   └── plans.ts           # Plan/variant mapping
│   │   │
│   │   ├── i18n/
│   │   │   ├── config.ts          # Dil ayarları
│   │   │   ├── provider.tsx       # I18n context provider
│   │   │   └── dictionaries.ts    # Çeviri yükleyici
│   │   │
│   │   ├── automations/
│   │   │   ├── engine.ts          # Otomasyon motoru
│   │   │   ├── triggers.ts        # Trigger tanımları
│   │   │   ├── actions.ts         # Action tanımları
│   │   │   └── scheduler.ts       # Cron zamanlayıcı
│   │   │
│   │   ├── email/
│   │   │   ├── client.ts          # E-posta gönderici (Resend)
│   │   │   └── templates/
│   │   │       ├── payment-reminder.tsx
│   │   │       ├── welcome.tsx
│   │   │       ├── progress-report.tsx
│   │   │       ├── workout-assigned.tsx
│   │   │       └── inactivity-alert.tsx
│   │   │
│   │   ├── utils/
│   │   │   ├── date.ts            # Tarih yardımcıları
│   │   │   ├── currency.ts        # Para birimi formatlama (TRY/USD)
│   │   │   ├── validators.ts      # Zod şemaları
│   │   │   └── constants.ts       # Sabitler
│   │   │
│   │   └── types/
│   │       ├── database.ts        # Supabase generated types
│   │       ├── api.ts             # API response types
│   │       └── index.ts           # Shared types
│   │
│   └── middleware.ts              # Next.js middleware (auth + i18n routing)
│
├── scripts/
│   ├── generate-types.sh          # Supabase type generation
│   └── seed-demo.ts               # Demo veri oluşturucu
│
└── docs/
    ├── API.md                     # API dokümantasyonu
    ├── DEPLOYMENT.md              # Deployment rehberi
    └── AUTOMATIONS.md             # Otomasyon rehberi
```

---

## 4. VERİTABANI ŞEMASI (SUPABASE / POSTGRESQL)

### 4.1 Tablolar

```sql
-- ============================================
-- 001: PROFILES (Supabase Auth ile senkronize)
-- ============================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  business_name TEXT,               -- "FitCoach Ali" gibi
  timezone TEXT DEFAULT 'Europe/Istanbul',
  locale TEXT DEFAULT 'tr' CHECK (locale IN ('tr', 'en')),
  currency TEXT DEFAULT 'TRY' CHECK (currency IN ('TRY', 'USD', 'EUR')),

  -- Lemon Squeezy Subscription
  ls_customer_id TEXT,
  ls_subscription_id TEXT,
  ls_variant_id TEXT,               -- Plan tipi belirleme
  subscription_status TEXT DEFAULT 'trialing'
    CHECK (subscription_status IN ('trialing','active','paused','cancelled','expired')),
  subscription_ends_at TIMESTAMPTZ,
  client_limit INTEGER DEFAULT 5,   -- Trial: 5 müşteri

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 002: CLIENTS (Müşteriler)
-- ============================================
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male','female','other')),
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active','inactive','paused','archived')),
  notes TEXT,
  tags TEXT[] DEFAULT '{}',          -- ["weight-loss", "beginner"]
  emergency_contact TEXT,
  emergency_phone TEXT,

  -- Fiziksel başlangıç verileri
  height_cm NUMERIC,
  start_weight_kg NUMERIC,
  goal_weight_kg NUMERIC,
  fitness_level TEXT CHECK (fitness_level IN ('beginner','intermediate','advanced')),
  medical_notes TEXT,

  -- Ödeme bilgileri
  monthly_fee NUMERIC,
  payment_day INTEGER CHECK (payment_day BETWEEN 1 AND 31),
  payment_method TEXT CHECK (payment_method IN ('cash','transfer','card','other')),

  joined_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_clients_coach ON public.clients(coach_id);
CREATE INDEX idx_clients_status ON public.clients(status);

-- ============================================
-- 003: EXERCISES (Egzersiz Kütüphanesi)
-- ============================================
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,  -- NULL = global
  name_tr TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_tr TEXT,
  description_en TEXT,
  muscle_group TEXT NOT NULL,        -- chest, back, legs, shoulders, arms, core, cardio, full_body
  equipment TEXT,                    -- barbell, dumbbell, machine, bodyweight, cable, band
  difficulty TEXT CHECK (difficulty IN ('beginner','intermediate','advanced')),
  video_url TEXT,
  image_url TEXT,
  is_global BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 004: WORKOUT PLANS (Antrenman Planları)
-- ============================================
CREATE TABLE public.workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name_tr TEXT NOT NULL,
  name_en TEXT,
  description TEXT,
  duration_weeks INTEGER DEFAULT 4,
  difficulty TEXT CHECK (difficulty IN ('beginner','intermediate','advanced')),
  goal TEXT,                         -- weight_loss, muscle_gain, endurance, flexibility
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.workout_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,       -- 1-7
  name TEXT,                         -- "Göğüs & Triceps"
  rest_day BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_day_id UUID NOT NULL REFERENCES public.workout_days(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id),
  sets INTEGER DEFAULT 3,
  reps TEXT DEFAULT '12',            -- "12" veya "8-12" veya "AMRAP"
  weight TEXT,                       -- "60kg" veya "bodyweight"
  rest_seconds INTEGER DEFAULT 60,
  tempo TEXT,                        -- "3-1-2-0"
  notes TEXT,
  sort_order INTEGER DEFAULT 0,
  superset_group TEXT                -- Superset gruplama için
);

-- Plan-Müşteri atama
CREATE TABLE public.client_workout_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  starts_at DATE NOT NULL,
  ends_at DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','completed','cancelled')),
  notes TEXT
);

-- ============================================
-- 005: PROGRESS TRACKING (İlerleme Takibi)
-- ============================================
CREATE TABLE public.progress_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  coach_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,

  -- Vücut ölçüleri
  weight_kg NUMERIC,
  body_fat_percentage NUMERIC,
  chest_cm NUMERIC,
  waist_cm NUMERIC,
  hip_cm NUMERIC,
  arm_cm NUMERIC,
  thigh_cm NUMERIC,

  -- Performans
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_progress_client ON public.progress_entries(client_id, recorded_at DESC);

-- Progress fotoğrafları
CREATE TABLE public.progress_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  progress_entry_id UUID NOT NULL REFERENCES public.progress_entries(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,           -- Supabase Storage URL
  photo_type TEXT CHECK (photo_type IN ('front','side','back')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 006: PAYMENTS (Ödemeler)
-- ============================================
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  coach_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'TRY',
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending','paid','overdue','cancelled','refunded')),
  payment_method TEXT,
  due_date DATE NOT NULL,
  paid_at TIMESTAMPTZ,
  period_start DATE,
  period_end DATE,
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  reminder_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_status ON public.payments(status, due_date);
CREATE INDEX idx_payments_coach ON public.payments(coach_id);

-- ============================================
-- 007: MESSAGES (Mesajlar)
-- ============================================
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  direction TEXT NOT NULL CHECK (direction IN ('outgoing','incoming')),
  channel TEXT DEFAULT 'in_app'
    CHECK (channel IN ('in_app','email','whatsapp','sms')),
  subject TEXT,
  body TEXT NOT NULL,
  is_automated BOOLEAN DEFAULT false,
  automation_id UUID,                -- Hangi otomasyon gönderdi
  read_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_client ON public.messages(client_id, sent_at DESC);

-- Mesaj şablonları
CREATE TABLE public.message_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  subject TEXT,
  body_tr TEXT NOT NULL,
  body_en TEXT,
  category TEXT,                     -- payment, motivation, reminder, welcome
  variables TEXT[] DEFAULT '{}',     -- ["{{client_name}}", "{{amount}}"]
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 008: AUTOMATIONS (Otomasyonlar)
-- ============================================
CREATE TABLE public.automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,

  -- Trigger
  trigger_type TEXT NOT NULL CHECK (trigger_type IN (
    'payment_due',            -- Ödeme vadesi geldiğinde
    'payment_overdue',        -- Ödeme geciktiğinde
    'client_inactive',        -- Müşteri X gün aktif değilse
    'workout_completed',      -- Antrenman planı bittiğinde
    'progress_milestone',     -- Hedef kiloya ulaşıldığında
    'client_birthday',        -- Müşteri doğum günü
    'plan_expiring',          -- Plan süresi dolmak üzere
    'new_client',             -- Yeni müşteri eklendiğinde
    'schedule'                -- Zamanlı (cron)
  )),
  trigger_config JSONB DEFAULT '{}',  -- {"days_before": 3, "days_inactive": 14}

  -- Action
  action_type TEXT NOT NULL CHECK (action_type IN (
    'send_email',
    'send_in_app_message',
    'send_whatsapp',
    'create_payment',
    'assign_workout',
    'update_client_status',
    'create_task'
  )),
  action_config JSONB DEFAULT '{}',   -- {"template_id": "...", "channel": "email"}

  -- Zamanlama
  schedule_cron TEXT,                  -- Cron ifadesi (schedule trigger için)
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Otomasyon çalışma logları
CREATE TABLE public.automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  automation_id UUID NOT NULL REFERENCES public.automations(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id),
  status TEXT NOT NULL CHECK (status IN ('success','failed','skipped')),
  details JSONB DEFAULT '{}',
  executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 009: ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_workout_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;

-- Örnek RLS politikası (her tablo için benzer)
CREATE POLICY "coaches_own_data" ON public.clients
  FOR ALL USING (coach_id = auth.uid());

CREATE POLICY "coaches_own_profiles" ON public.profiles
  FOR ALL USING (id = auth.uid());

-- Global exercises herkes görebilir, kendi eklediğini yönetebilir
CREATE POLICY "exercises_read" ON public.exercises
  FOR SELECT USING (is_global = true OR coach_id = auth.uid());

CREATE POLICY "exercises_write" ON public.exercises
  FOR ALL USING (coach_id = auth.uid());
```

### 4.2 Supabase Storage Buckets

```
fitcrm-storage/
├── avatars/           -- Koç ve müşteri profil fotoğrafları
├── progress-photos/   -- İlerleme fotoğrafları (private)
├── exercise-media/    -- Egzersiz görselleri/videoları
└── exports/           -- Dışa aktarılan raporlar (geçici)
```

### 4.3 Supabase Realtime

```typescript
// Açık kanallar:
// - payments:coach_id=eq.{userId}   → Ödeme durumu değişiklikleri
// - messages:coach_id=eq.{userId}   → Yeni mesajlar
// - clients:coach_id=eq.{userId}    → Müşteri güncellemeleri
```

---

## 5. ÖDEME SİSTEMİ (LEMON SQUEEZY)

### 5.1 Plan Yapılandırması

```typescript
// lib/lemon-squeezy/plans.ts

export const PLANS = {
  solo: {
    name: { tr: 'Solo', en: 'Solo' },
    description: { tr: 'Bireysel koçlar için', en: 'For individual coaches' },
    clientLimit: 50,
    pricing: {
      monthly: {
        USD: 29,    // $29/ay
        TRY: 799,   // ₺799/ay
      },
      yearly: {
        USD: 278,   // $278/yıl (%20 indirim)
        TRY: 7670,  // ₺7.670/yıl (%20 indirim)
      }
    },
    features: [
      'client_management',
      'workout_builder',
      'payment_tracking',
      'progress_charts',
      'basic_automations',     // 5 otomasyon
      'email_messages',
      'message_templates',
    ],
    variantIds: {
      monthly_usd: 'VARIANT_SOLO_MONTHLY_USD',
      yearly_usd: 'VARIANT_SOLO_YEARLY_USD',
      monthly_try: 'VARIANT_SOLO_MONTHLY_TRY',
      yearly_try: 'VARIANT_SOLO_YEARLY_TRY',
    }
  },
  studio: {
    name: { tr: 'Stüdyo', en: 'Studio' },
    description: { tr: 'Küçük stüdyolar ve takımlar', en: 'Small studios & teams' },
    clientLimit: 200,
    pricing: {
      monthly: {
        USD: 79,
        TRY: 2199,
      },
      yearly: {
        USD: 758,
        TRY: 21110,
      }
    },
    features: [
      'client_management',
      'workout_builder',
      'payment_tracking',
      'progress_charts',
      'unlimited_automations',
      'email_messages',
      'whatsapp_integration',
      'message_templates',
      'advanced_analytics',
      'csv_export',
      'priority_support',
    ],
    variantIds: {
      monthly_usd: 'VARIANT_STUDIO_MONTHLY_USD',
      yearly_usd: 'VARIANT_STUDIO_YEARLY_USD',
      monthly_try: 'VARIANT_STUDIO_MONTHLY_TRY',
      yearly_try: 'VARIANT_STUDIO_YEARLY_TRY',
    }
  }
} as const;

// variant_id → plan eşlemesi (webhook'ta kullanılır)
export function getPlanFromVariant(variantId: string) {
  for (const [planKey, plan] of Object.entries(PLANS)) {
    for (const [, vid] of Object.entries(plan.variantIds)) {
      if (vid === variantId) {
        return { plan: planKey, clientLimit: plan.clientLimit };
      }
    }
  }
  return null;
}
```

### 5.2 Webhook Handler

```typescript
// app/api/webhooks/lemon-squeezy/route.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/admin';
import { getPlanFromVariant } from '@/lib/lemon-squeezy/plans';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('x-signature');

  // 1. Signature doğrulama
  const hmac = crypto.createHmac('sha256', process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!);
  const digest = hmac.update(rawBody).digest('hex');

  if (signature !== digest) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta.event_name;
  const data = payload.data;
  const attrs = data.attributes;
  const customData = payload.meta.custom_data; // { user_id: "..." }

  const supabase = createClient();

  switch (eventName) {
    case 'subscription_created':
    case 'subscription_updated': {
      const variantId = String(attrs.variant_id);
      const planInfo = getPlanFromVariant(variantId);

      await supabase.from('profiles').update({
        ls_customer_id: String(attrs.customer_id),
        ls_subscription_id: String(data.id),
        ls_variant_id: variantId,
        subscription_status: mapStatus(attrs.status),
        subscription_ends_at: attrs.ends_at || attrs.renews_at,
        client_limit: planInfo?.clientLimit ?? 5,
        updated_at: new Date().toISOString(),
      }).eq('id', customData.user_id);

      break;
    }

    case 'subscription_cancelled':
    case 'subscription_expired': {
      await supabase.from('profiles').update({
        subscription_status: eventName === 'subscription_cancelled' ? 'cancelled' : 'expired',
        updated_at: new Date().toISOString(),
      }).eq('ls_subscription_id', String(data.id));
      break;
    }

    case 'subscription_payment_success': {
      // Ödeme başarılı log (opsiyonel)
      break;
    }

    case 'subscription_payment_failed': {
      // Ödeme başarısız — kullanıcıya e-posta
      break;
    }
  }

  return NextResponse.json({ received: true });
}

function mapStatus(lsStatus: string): string {
  const map: Record<string, string> = {
    'active': 'active',
    'past_due': 'active',   // Grace period
    'paused': 'paused',
    'cancelled': 'cancelled',
    'expired': 'expired',
    'on_trial': 'trialing',
    'unpaid': 'cancelled',
  };
  return map[lsStatus] || 'cancelled';
}
```

### 5.3 Müşteri Limiti Kontrolü

```typescript
// hooks/useClientLimit.ts

export function useClientLimit() {
  const { profile } = useAuth();

  const checkLimit = async (): Promise<{ allowed: boolean; current: number; limit: number }> => {
    const { count } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('coach_id', profile.id)
      .in('status', ['active', 'paused']);

    return {
      allowed: (count ?? 0) < profile.client_limit,
      current: count ?? 0,
      limit: profile.client_limit,
    };
  };

  return { checkLimit };
}

// Kullanım: Yeni müşteri ekleme öncesi
const { allowed, current, limit } = await checkLimit();
if (!allowed) {
  toast.error(t('errors.clientLimitReached', { current, limit }));
  // Upgrade modal göster
}
```

---

## 6. OTOMASYON MOTORU

### 6.1 Yerleşik Otomasyonlar (Kullanıcının Aktif Edeceği)

| # | Otomasyon | Trigger | Action | Varsayılan Config |
|---|---|---|---|---|
| 1 | **Ödeme Hatırlatma** | `payment_due` | `send_email` + `send_in_app_message` | 3 gün önce |
| 2 | **Gecikmiş Ödeme** | `payment_overdue` | `send_email` | 1, 3, 7 gün sonra |
| 3 | **Hoş Geldin Mesajı** | `new_client` | `send_email` + `send_in_app_message` | Anında |
| 4 | **Hareketsiz Müşteri** | `client_inactive` | `send_email` | 14 gün hareketsizlik |
| 5 | **Doğum Günü Kutlaması** | `client_birthday` | `send_email` + `send_in_app_message` | Doğum gününde |
| 6 | **Plan Bitiş Uyarısı** | `plan_expiring` | `send_in_app_message` | 5 gün önce |
| 7 | **Antrenman Tamamlama** | `workout_completed` | `send_in_app_message` | Anında |
| 8 | **Aylık Ödeme Oluşturma** | `schedule` | `create_payment` | Her ay 1'inde |
| 9 | **Haftalık İlerleme Raporu** | `schedule` | `send_email` | Her Pazartesi |
| 10 | **Hedef Ulaşıldı** | `progress_milestone` | `send_email` + `send_in_app_message` | Hedef kiloya ulaşınca |

### 6.2 Otomasyon Engine Akışı

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌────────────┐
│   TRIGGER    │────▶│   EVALUATE   │────▶│   EXECUTE     │────▶│    LOG     │
│  (Event /    │     │  (Koşul      │     │  (Action      │     │  (Sonuç    │
│   Cron)      │     │   kontrolü)  │     │   çalıştır)   │     │   kaydet)  │
└─────────────┘     └──────────────┘     └───────────────┘     └────────────┘
```

### 6.3 Cron Jobs (Supabase pg_cron veya API Route + Vercel Cron)

```typescript
// app/api/cron/payment-reminders/route.ts

export async function GET(req: NextRequest) {
  // Cron secret doğrulama
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient();

  // 3 gün içinde vadesi dolan, hatırlatma gönderilmemiş ödemeler
  const { data: duePayments } = await supabase
    .from('payments')
    .select('*, clients(*), profiles(*)')
    .eq('status', 'pending')
    .eq('reminder_sent', false)
    .lte('due_date', addDays(new Date(), 3).toISOString())
    .gte('due_date', new Date().toISOString());

  for (const payment of duePayments ?? []) {
    // E-posta gönder
    await sendPaymentReminder(payment);

    // In-app mesaj oluştur
    await supabase.from('messages').insert({
      coach_id: payment.coach_id,
      client_id: payment.client_id,
      direction: 'outgoing',
      channel: 'in_app',
      body: generateReminderMessage(payment, payment.profiles.locale),
      is_automated: true,
    });

    // Hatırlatma gönderildi işaretle
    await supabase.from('payments').update({
      reminder_sent: true,
      reminder_sent_at: new Date().toISOString(),
    }).eq('id', payment.id);
  }

  return NextResponse.json({ processed: duePayments?.length ?? 0 });
}
```

---

## 7. ULUSLARARASILAŞTIRMA (i18n)

### 7.1 Yapılandırma

```typescript
// lib/i18n/config.ts

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'tr';

export const localeNames: Record<Locale, string> = {
  tr: 'Türkçe',
  en: 'English',
};

export const localeCurrencies: Record<Locale, string> = {
  tr: 'TRY',
  en: 'USD',
};
```

### 7.2 Çeviri Dosyası Yapısı

```jsonc
// public/locales/tr/common.json
{
  "nav": {
    "dashboard": "Kontrol Paneli",
    "clients": "Müşteriler",
    "workouts": "Antrenman Planları",
    "payments": "Ödemeler",
    "messages": "Mesajlar",
    "progress": "İlerleme",
    "automations": "Otomasyonlar",
    "settings": "Ayarlar"
  },
  "dashboard": {
    "welcome": "Hoş geldin, {{name}}",
    "totalClients": "Toplam Müşteri",
    "activeClients": "Aktif Müşteri",
    "monthlyRevenue": "Aylık Gelir",
    "pendingPayments": "Bekleyen Ödemeler",
    "upcomingPayments": "Yaklaşan Ödemeler",
    "recentActivity": "Son Aktivite",
    "quickActions": "Hızlı İşlemler"
  },
  "clients": {
    "title": "Müşteriler",
    "addNew": "Yeni Müşteri",
    "search": "Müşteri ara...",
    "filters": {
      "all": "Tümü",
      "active": "Aktif",
      "inactive": "Pasif",
      "paused": "Duraklat"
    },
    "limitReached": "Müşteri limitine ulaştınız ({{current}}/{{limit}}). Planınızı yükseltin.",
    "details": "Müşteri Detayı",
    "workoutHistory": "Antrenman Geçmişi",
    "progressHistory": "İlerleme Geçmişi",
    "paymentHistory": "Ödeme Geçmişi"
  },
  "workouts": {
    "title": "Antrenman Planları",
    "createPlan": "Plan Oluştur",
    "templates": "Şablonlar",
    "assignToClient": "Müşteriye Ata",
    "builder": {
      "addDay": "Gün Ekle",
      "addExercise": "Egzersiz Ekle",
      "sets": "Set",
      "reps": "Tekrar",
      "weight": "Ağırlık",
      "rest": "Dinlenme",
      "restDay": "Dinlenme Günü"
    }
  },
  "payments": {
    "title": "Ödemeler",
    "status": {
      "pending": "Bekliyor",
      "paid": "Ödendi",
      "overdue": "Gecikmiş",
      "cancelled": "İptal"
    },
    "sendReminder": "Hatırlatma Gönder",
    "markPaid": "Ödendi İşaretle",
    "totalOwed": "Toplam Borç",
    "collectedThisMonth": "Bu Ay Tahsil Edilen"
  },
  "automations": {
    "title": "Otomasyonlar",
    "active": "Aktif",
    "paused": "Duraklattı",
    "createNew": "Yeni Otomasyon",
    "triggers": {
      "payment_due": "Ödeme Vadesi",
      "payment_overdue": "Gecikmiş Ödeme",
      "client_inactive": "Hareketsiz Müşteri",
      "new_client": "Yeni Müşteri",
      "client_birthday": "Doğum Günü",
      "plan_expiring": "Plan Bitiyor",
      "schedule": "Zamanlı"
    }
  },
  "pricing": {
    "title": "Fiyatlandırma",
    "monthly": "Aylık",
    "yearly": "Yıllık",
    "yearlyDiscount": "%20 indirim",
    "solo": {
      "name": "Solo",
      "desc": "Bireysel koçlar için",
      "price_monthly": "₺799",
      "price_yearly": "₺7.670",
      "clients": "50 müşteri"
    },
    "studio": {
      "name": "Stüdyo",
      "desc": "Küçük stüdyolar ve takımlar",
      "price_monthly": "₺2.199",
      "price_yearly": "₺21.110",
      "clients": "200 müşteri"
    },
    "getStarted": "Hemen Başla",
    "startTrial": "14 Gün Ücretsiz Dene"
  },
  "common": {
    "save": "Kaydet",
    "cancel": "İptal",
    "delete": "Sil",
    "edit": "Düzenle",
    "search": "Ara",
    "loading": "Yükleniyor...",
    "noData": "Veri bulunamadı",
    "confirm": "Onayla",
    "back": "Geri",
    "next": "İleri",
    "export": "Dışa Aktar"
  }
}
```

> **Not:** `en/common.json` dosyası aynı key yapısıyla İngilizce çevirilerle doldurulacak.

---

## 8. TASARIM SİSTEMİ

### 8.1 Felsefe

**"Karanlık Lüks"** — Premium hissi veren, minimalist ama detaylarda zengin, koyu tonlarda bir arayüz. Apple'ın koyu moduyla Vercel Dashboard estetiğinin kesişimi.

### 8.2 Renk Paleti

```css
:root {
  /* ── Temel Yüzeyler ── */
  --bg-primary:       #09090B;       /* Tam siyaha yakın arka plan */
  --bg-secondary:     #111114;       /* Kart/panel arka planı */
  --bg-tertiary:      #18181B;       /* Hover, aktif state */
  --bg-elevated:      #1E1E22;       /* Modal, dropdown */
  --bg-glass:         rgba(255, 255, 255, 0.03); /* Glassmorphism */

  /* ── Kenarlıklar ── */
  --border-primary:   rgba(255, 255, 255, 0.06);
  --border-hover:     rgba(255, 255, 255, 0.12);
  --border-active:    rgba(255, 255, 255, 0.20);

  /* ── Metin ── */
  --text-primary:     #FAFAFA;       /* Ana metin */
  --text-secondary:   #A1A1AA;       /* İkincil metin (zinc-400) */
  --text-tertiary:    #71717A;       /* Devre dışı/ipucu (zinc-500) */
  --text-muted:       #52525B;       /* En soluk metin */

  /* ── Vurgu Rengi (Signature Accent) ── */
  --accent:           #E4E4E7;       /* Zinc-200 — sakin, premium beyaz vurgu */
  --accent-hover:     #FFFFFF;
  --accent-muted:     rgba(228, 228, 231, 0.15);

  /* ── Durum Renkleri ── */
  --success:          #22C55E;       /* Yeşil */
  --success-muted:    rgba(34, 197, 94, 0.12);
  --warning:          #F59E0B;       /* Amber */
  --warning-muted:    rgba(245, 158, 11, 0.12);
  --danger:           #EF4444;       /* Kırmızı */
  --danger-muted:     rgba(239, 68, 68, 0.12);
  --info:             #3B82F6;       /* Mavi */
  --info-muted:       rgba(59, 130, 246, 0.12);

  /* ── Gradient ── */
  --gradient-subtle:  linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%);
  --gradient-glow:    radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                        rgba(255,255,255,0.03), transparent 40%);

  /* ── Gölgeler ── */
  --shadow-sm:        0 1px 2px rgba(0,0,0,0.5);
  --shadow-md:        0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg:        0 8px 32px rgba(0,0,0,0.5);
  --shadow-glow:      0 0 40px rgba(255,255,255,0.03);

  /* ── Border Radius ── */
  --radius-sm:        6px;
  --radius-md:        10px;
  --radius-lg:        14px;
  --radius-xl:        20px;

  /* ── Spacing Scale ── */
  /* Tailwind default kullan: 4px base (p-1 = 4px, p-2 = 8px ...) */

  /* ── Transition ── */
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast:    150ms;
  --duration-normal:  250ms;
  --duration-slow:    500ms;
}
```

### 8.3 Tipografi

```css
/* Google Fonts CDN */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* ── Ana Font: Outfit ── */
  /* Geometrik, modern, premium hisli sans-serif */
  --font-sans:        'Outfit', system-ui, -apple-system, sans-serif;

  /* ── Mono Font: JetBrains Mono ── */
  --font-mono:        'JetBrains Mono', 'Fira Code', monospace;

  /* ── Font Sizes ── */
  --text-xs:          0.75rem;    /* 12px */
  --text-sm:          0.8125rem;  /* 13px */
  --text-base:        0.875rem;   /* 14px — Dashboard base */
  --text-lg:          1rem;       /* 16px */
  --text-xl:          1.25rem;    /* 20px */
  --text-2xl:         1.5rem;     /* 24px */
  --text-3xl:         2rem;       /* 32px */
  --text-4xl:         2.5rem;     /* 40px — Hero heading */
  --text-5xl:         3.5rem;     /* 56px — Landing hero */

  /* ── Letter Spacing ── */
  --tracking-tighter: -0.04em;    /* Büyük başlıklar */
  --tracking-tight:   -0.02em;    /* Alt başlıklar */
  --tracking-normal:  0em;
  --tracking-wide:    0.05em;     /* Etiketler, badge'ler */
  --tracking-wider:   0.1em;      /* UPPERCASE etiketler */

  /* ── Line Height ── */
  --leading-tight:    1.2;
  --leading-normal:   1.5;
  --leading-relaxed:  1.7;
}
```

### 8.4 Animasyon ve Efektler

```css
/* ── Page Enter Animation ── */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.05); }
  50% { box-shadow: 0 0 20px 4px rgba(255,255,255,0.08); }
}

/* ── Stagger Animation Utility ── */
.animate-in {
  animation: fadeInUp 0.5s var(--ease-out-expo) both;
}
.animate-in[data-delay="1"] { animation-delay: 80ms; }
.animate-in[data-delay="2"] { animation-delay: 160ms; }
.animate-in[data-delay="3"] { animation-delay: 240ms; }
.animate-in[data-delay="4"] { animation-delay: 320ms; }

/* ── Card Hover Glow ── */
.card-glow {
  position: relative;
  overflow: hidden;
}
.card-glow::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-glow);
  opacity: 0;
  transition: opacity var(--duration-normal) ease;
  pointer-events: none;
}
.card-glow:hover::before {
  opacity: 1;
}

/* ── Skeleton Loading ── */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-tertiary) 25%,
    var(--bg-elevated) 50%,
    var(--bg-tertiary) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}

/* ── Glass Effect ── */
.glass {
  background: var(--bg-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-primary);
}

/* ── Noise Texture Overlay ── */
.noise::after {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.015;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}
```

### 8.5 Framer Motion Presetleri

```typescript
// lib/utils/motion.ts
import { Variants } from 'framer-motion';

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

// Sayfa geçişleri
export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
};
```

### 8.6 Bileşen Tasarım Kuralları

**Kartlar:**
- `bg-secondary` arka plan, `border-primary` kenarlık
- Hover'da `border-hover` + `card-glow` efekti
- `radius-lg` köşe yumuşaklığı
- İçeride `p-5` veya `p-6` padding

**Butonlar:**
- Primary: `bg-white text-black` — kontrast vurgu
- Secondary: `bg-bg-tertiary text-text-secondary border-border-primary`
- Ghost: `bg-transparent hover:bg-bg-tertiary`
- Danger: `bg-danger-muted text-danger`
- Tüm butonlarda `transition-all duration-fast` ve `active:scale-[0.98]`

**Input'lar:**
- `bg-bg-primary border-border-primary` — arka planla neredeyse eşleşen
- Focus: `border-accent ring-1 ring-accent/20`
- Placeholder: `text-text-muted`

**Sidebar:**
- Genişlik: `w-64` (desktop), sliding (mobile)
- `bg-bg-primary border-r border-border-primary`
- Aktif item: `bg-accent-muted text-text-primary` sol kenarda `2px` accent bar
- Icon + text, `text-sm`, `tracking-wide`

**Data Table:**
- Zebra striping yok — hover satır vurgusu ile
- Header: `text-text-tertiary text-xs uppercase tracking-wider`
- Row hover: `bg-bg-tertiary/50`

**Grafikler (Recharts):**
- Grid line: `stroke: var(--border-primary)`
- Tooltip: `glass` efektli dark tooltip
- Renkler: `#FAFAFA` (birincil veri), `#71717A` (ikincil), accent renkler durumlara göre

---

## 9. DOCKER DEPLOYMENT (UBUNTU SERVER)

### 9.1 Dockerfile

```dockerfile
# ── Stage 1: Dependencies ──
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# ── Stage 2: Build ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time environment variables
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_APP_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

RUN npm run build

# ── Stage 3: Production ──
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

### 9.2 docker-compose.yml

```yaml
version: '3.8'

services:
  fitcrm:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
        - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
        - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    container_name: fitcrm-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - LEMON_SQUEEZY_API_KEY=${LEMON_SQUEEZY_API_KEY}
      - LEMON_SQUEEZY_WEBHOOK_SECRET=${LEMON_SQUEEZY_WEBHOOK_SECRET}
      - LEMON_SQUEEZY_STORE_ID=${LEMON_SQUEEZY_STORE_ID}
      - RESEND_API_KEY=${RESEND_API_KEY}
      - CRON_SECRET=${CRON_SECRET}
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
    networks:
      - fitcrm-network
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    container_name: fitcrm-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./ssl:/etc/nginx/ssl:ro      # Eğer Cloudflare Tunnel kullanmıyorsan
    depends_on:
      - fitcrm
    networks:
      - fitcrm-network

networks:
  fitcrm-network:
    driver: bridge
```

### 9.3 nginx.conf

```nginx
upstream fitcrm_app {
    server fitcrm:3000;
}

server {
    listen 80;
    server_name fitcrm.example.com;    # Domain adını değiştir

    # Cloudflare Tunnel kullanıyorsan SSL gereksiz
    # Aksi halde Let's Encrypt ile SSL ekle

    location / {
        proxy_pass http://fitcrm_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Lemon Squeezy webhook endpoint
    location /api/webhooks/lemon-squeezy {
        proxy_pass http://fitcrm_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 60s;
    }

    # Health check
    location /api/health {
        proxy_pass http://fitcrm_app;
        access_log off;
    }
}
```

### 9.4 Cloudflare Tunnel Alternatifi

```bash
# Ubuntu Server'da Cloudflare Tunnel kurulumu
# (SSL otomatik, domain yönlendirme kolay)

# 1. cloudflared kur
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main' | sudo tee /etc/apt/sources.list.d/cloudflared.list
sudo apt update && sudo apt install cloudflared

# 2. Tunnel oluştur
cloudflared tunnel login
cloudflared tunnel create fitcrm

# 3. Config dosyası: ~/.cloudflared/config.yml
# tunnel: <TUNNEL_ID>
# credentials-file: /root/.cloudflared/<TUNNEL_ID>.json
# ingress:
#   - hostname: fitcrm.example.com
#     service: http://localhost:3000
#   - service: http_status:404

# 4. Servisi başlat
cloudflared tunnel run fitcrm
```

---

## 10. ENV DEĞİŞKENLERİ

```bash
# .env.example

# ── Supabase ──
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...

# ── Lemon Squeezy ──
LEMON_SQUEEZY_API_KEY=your_api_key
LEMON_SQUEEZY_WEBHOOK_SECRET=your_webhook_secret
LEMON_SQUEEZY_STORE_ID=your_store_id

# Solo Plan Variant IDs
NEXT_PUBLIC_LS_SOLO_MONTHLY_USD=variant_id
NEXT_PUBLIC_LS_SOLO_YEARLY_USD=variant_id
NEXT_PUBLIC_LS_SOLO_MONTHLY_TRY=variant_id
NEXT_PUBLIC_LS_SOLO_YEARLY_TRY=variant_id

# Studio Plan Variant IDs
NEXT_PUBLIC_LS_STUDIO_MONTHLY_USD=variant_id
NEXT_PUBLIC_LS_STUDIO_YEARLY_USD=variant_id
NEXT_PUBLIC_LS_STUDIO_MONTHLY_TRY=variant_id
NEXT_PUBLIC_LS_STUDIO_YEARLY_TRY=variant_id

# ── E-posta (Resend) ──
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@fitcrm.app

# ── Uygulama ──
NEXT_PUBLIC_APP_URL=https://fitcrm.example.com
NEXT_PUBLIC_DEFAULT_LOCALE=tr
CRON_SECRET=your_cron_secret_key

# ── Docker / Server ──
NODE_ENV=production
```

---

## 11. GELİŞTİRME ADIMLARI (CLAUDE CODE İÇİN YÖNERGE)

Claude Code'a bu dosyayı verdikten sonra aşağıdaki sırayla ilerle:

### Faz 1 — Temel Altyapı
1. Next.js 14 projesi oluştur (App Router, TypeScript, Tailwind, ESLint)
2. Tailwind config'i tasarım sistemindeki CSS değişkenleriyle kur
3. `globals.css`'e renk paleti, tipografi, animasyon keyframe'leri ekle
4. Supabase client kurulumu (`client.ts`, `server.ts`, `admin.ts`)
5. i18n sistemi kur (`tr/common.json`, `en/common.json`, provider, hook)
6. Auth sayfaları (login, register, forgot-password) — Supabase Auth
7. Middleware (auth koruması + locale routing)

### Faz 2 — Veritabanı ve Core
8. Supabase migration dosyalarını oluştur (tüm tablolar)
9. RLS politikalarını uygula
10. Supabase type generation (`database.ts`)
11. Seed data script'i (demo koç + demo müşteriler)

### Faz 3 — Dashboard Shell
12. Dashboard layout (Sidebar, Topbar, MobileNav)
13. Ana dashboard sayfası (StatsCard, RevenueChart, ActivityFeed)
14. Framer Motion sayfa geçiş animasyonları
15. Skeleton loading states

### Faz 4 — Müşteri Yönetimi
16. Müşteri listesi (DataTable, filtreler, arama)
17. Müşteri ekleme/düzenleme formu (Zod validasyon)
18. Müşteri detay sayfası (tab navigasyonu)
19. Müşteri limiti kontrolü (useClientLimit hook)

### Faz 5 — Antrenman Planları
20. Egzersiz kütüphanesi (global + koça özel)
21. Antrenman planı builder (drag & drop, gün/egzersiz ekleme)
22. Plan şablonları
23. Müşteriye plan atama

### Faz 6 — İlerleme Takibi
24. İlerleme giriş formu (vücut ölçüleri)
25. İlerleme grafikleri (Recharts — çizgi grafik, çubuk grafik)
26. Fotoğraf karşılaştırma bileşeni (önce/sonra)
27. Milestone timeline

### Faz 7 — Ödeme Sistemi
28. Ödeme listesi ve durum takibi
29. Manuel ödeme oluşturma/düzenleme
30. Ödeme hatırlatma mekanizması
31. Aylık otomatik ödeme oluşturma (cron)
32. Gelir dashboard (aylık/yıllık grafik)

### Faz 8 — Mesajlaşma
33. Mesaj merkezi (thread görünümü)
34. Mesaj şablonları (değişken destekli)
35. Mesaj gönderme (in-app + e-posta)

### Faz 9 — Otomasyonlar
36. Otomasyon listesi ve yönetimi
37. Otomasyon oluşturucu (trigger + action seçimi)
38. Otomasyon motoru (`engine.ts`, `triggers.ts`, `actions.ts`)
39. Cron endpoint'leri (payment-reminders, auto-messages, progress-reports)
40. Otomasyon logları

### Faz 10 — Ödeme Entegrasyonu (Lemon Squeezy)
41. Lemon Squeezy checkout entegrasyonu
42. Webhook handler (`subscription_created`, `subscription_updated`, vb.)
43. Subscription yönetimi sayfası (plan değiştirme, iptal)
44. Fiyatlandırma sayfası (TR/EN, TRY/USD)

### Faz 11 — Landing & Marketing
45. Landing page (hero, features, pricing, CTA)
46. SEO meta tags ve Open Graph
47. Features sayfası
48. About sayfası

### Faz 12 — Docker & Deploy
49. Dockerfile (multi-stage build)
50. docker-compose.yml
51. nginx.conf veya Cloudflare Tunnel
52. Health check endpoint
53. CI/CD script (GitHub Actions → Docker build → SSH deploy)

### Faz 13 — Son Dokunuşlar
54. Error boundary ve 404/500 sayfaları
55. Toast notification sistemi
56. CSV/PDF export
57. Responsive test (mobil, tablet, masaüstü)
58. Performance optimizasyonu (lazy loading, image optimization)
59. Accessibility (ARIA labels, keyboard navigation)

---

## 12. PERFORMANS HEDEFLERİ

| Metrik | Hedef |
|---|---|
| Lighthouse Performance | > 90 |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Bundle Size (gzipped) | < 150KB |
| Supabase RLS Sorgu Süresi | < 100ms |
| Dashboard İlk Yüklenme | < 2s |

---

## 13. GÜVENLİK KONTROL LİSTESİ

- [x] Supabase RLS tüm tablolarda aktif
- [x] Lemon Squeezy webhook signature doğrulaması
- [x] CRON_SECRET ile cron endpoint koruması
- [x] Rate limiting (Next.js middleware)
- [x] Input sanitization (Zod validasyon)
- [x] CORS yapılandırması
- [x] Secure HTTP headers (helmet)
- [x] Environment variables — asla client'a sızdırma
- [x] Supabase Storage — private bucket'lar için RLS
- [x] XSS koruması (React default escaping + CSP)

---

## 14. ÖNCELİKLİ NOTLAR

1. **Supabase ücretsiz plan** başlangıç için yeterli (500MB DB, 1GB Storage, 50K Edge Function çağrısı/ay).
2. **Lemon Squeezy** Türkiye'den satış yapabiliyor — Stripe'a alternatif olarak tercih edildi.
3. **Resend** ücretsiz planı 100 e-posta/gün — başlangıç için yeterli. Ölçeklenince Supabase Edge Functions + SMTP'ye geçilebilir.
4. **Egzersiz kütüphanesi** için başlangıçta 50-100 global egzersiz seed data olarak eklenecek.
5. **WhatsApp entegrasyonu** Studio planında var — Meta Business API veya Twilio üzerinden yapılacak (Faz 2 scope).
6. **Mobil uygulama** şu an scope dışı — PWA olarak çalışacak şekilde tasarla.
7. **Client portal** (müşterinin kendi planını/ilerlemesini görmesi) Faz 2 scope'unda.

---

> **Bu dosyayı Claude Code'a ver ve "Faz 1'den başla" de. Her faz sonunda test et, sonraki faza geç.**
