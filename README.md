<div align="center">

<br />

<img src="https://img.shields.io/badge/Setra-v0.1-000000?style=for-the-badge&logoColor=white" alt="version" />
<img src="https://img.shields.io/badge/Built_with-TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
<img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextjs" />
<img src="https://img.shields.io/badge/TailwindCSS-v3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwind" />
<img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="supabase" />
<img src="https://img.shields.io/badge/Framer_Motion-Animated-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="framer" />

<br /><br />

```text
 ███████╗███████╗████████╗██████╗  █████╗ 
 ██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗
 ███████╗█████╗     ██║   ██████╔╝███████║
 ╚════██║██╔══╝     ██║   ██╔══██╗██╔══██║
 ███████║███████╗   ██║   ██║  ██║██║  ██║
 ╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝
```

### **One Dashboard. Every Client.** — Track progress, manage plans & collect payments.

[Live App](https://setra.app) · [Report Bug](https://github.com/kutluhangil/SetraFitnessCRM/issues) · [Request Feature](https://github.com/kutluhangil/SetraFitnessCRM/issues)

</div>

---

## ✦ What is Setra?

**Setra** is a vertical CRM platform built specifically for solo fitness coaches and small studios. It steps in exactly where generic CRMs (HubSpot, Salesforce) fail to understand the fitness workflow.

Stop tracking clients in messy spreadsheets. Every workout plan, every payment reminder, and every progress entry — stored securely in the cloud. Built for speed, deep analytical insight, and a stunning **"Dark Luxury"** dark-mode experience.

---

<details>
<summary><strong>🇹🇷 Türkçe Açıklama</strong></summary>

<br />

**Setra**, solo fitness koçları ve küçük stüdyolar için tasarlanmış dikey bir CRM platformudur. Genel CRM'lerin (HubSpot, Salesforce) fitness iş akışını anlamadığı noktada devreye girer.

Müşteri takibini messy Excel tablolarında yapmayı bırak. Her antrenman planı, her ödeme hatırlatması ve her ilerleme kaydı — güvenli bir şekilde bulutta saklansın. Hız, derin analitik görünüm ve göz alıcı **"Karanlık Lüks"** koyu mod tasarımı için inşa edildi.

</details>

---

## ⚡ Features

| Feature | Description |
|---------|-------------|
| 📊 **Dashboard** | Total clients, monthly revenue, overdue payments and trend charts at a glance |
| 👥 **Client Management** | Profile, tags, medical notes, payment plan and fitness goals in one screen |
| 🏋️ **Workout Builder** | Drag-and-drop editor for weekly plans, reusable templates and superset definitions |
| 📈 **Progress Tracking** | Body measurement charts and before/after photo comparisons |
| 💳 **Payment System** | Auto-generate monthly invoices, send reminder emails, visualize revenue |
| ⚡ **Automation Engine** | Payment reminders, welcome messages, birthday wishes — set once, run forever |
| 🌍 **Bilingual Interface** | Seamless toggle between Turkish & English — across the entire UI |
| 🔐 **Secure Auth** | Supabase Auth + Row Level Security ensures complete data isolation per coach |
| 🚀 **Self-Hosted** | Deploy on your own server via Docker + Nginx, or use Cloudflare Tunnel for easy SSL |

---

## 🖼️ Screenshots

> *(Coming soon — High-quality mockups of the Setra interface)*

---

## 🛠️ Tech Stack

```
Frontend        →  Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS v3 · Framer Motion
UI Components   →  Custom design system (Button, Card, Badge, Avatar, Input, StatCard...)
Charts          →  Recharts (AreaChart — dark theme with custom tooltips)
i18n            →  Context-driven TR/EN provider + public/locales dictionary system
Fonts           →  Outfit (display + body) · JetBrains Mono (code / numeric)
Database        →  Supabase (PostgreSQL + RLS + Realtime + Storage)
Auth            →  Supabase Auth (email/password + session management)
Payments        →  Lemon Squeezy (SaaS subscriptions + webhook signature verification)
Email           →  Resend (automation notifications)
Scheduled Jobs  →  Supabase pg_cron + Edge Functions
Deployment      →  Docker (multi-stage standalone build) + Nginx · Cloudflare Tunnel
```

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                          SETRA CLIENT                          │
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
│ (DB · Auth ·  │  │  (Payments ·  │  │  (Email ·         │
│  Storage ·    │  │   Webhook ·   │  │   Automation      │
│  Realtime)    │  │   Billing)    │  │   Notifications)  │
└────────────────┘  └───────────────┘  └───────────────────┘
```

---

## 📐 Project Structure

```text
SetraFitnessCRM/
├── public/
│   └── locales/
│       ├── tr/common.json         # Turkish translations
│       └── en/common.json         # English translations
├── src/
│   ├── app/
│   │   ├── (auth)/                # Login · Register · Forgot Password
│   │   ├── dashboard/             # Dashboard shell + all sub-pages
│   │   │   ├── clients/           # Client list, detail view, new client form
│   │   │   ├── workouts/          # Workout plans and drag-and-drop builder
│   │   │   ├── payments/          # Payment overview and history
│   │   │   ├── messages/          # Message center and templates
│   │   │   ├── progress/          # Progress charts and photo comparison
│   │   │   ├── automations/       # Automation rules and execution logs
│   │   │   └── settings/          # Profile, subscription, integrations
│   │   ├── api/
│   │   │   ├── webhooks/          # Lemon Squeezy webhook handler
│   │   │   ├── cron/              # Payment reminders, auto-messages
│   │   │   └── health/            # Health check endpoint
│   │   ├── globals.css            # CSS variables + keyframe animations
│   │   └── layout.tsx             # Root layout (fonts, i18n provider)
│   ├── components/
│   │   ├── ui/                    # Atomic: Button, Card, Badge, Input...
│   │   ├── layout/                # Sidebar, Topbar, MobileNav
│   │   ├── dashboard/             # StatCard, RevenueChart, QuickActions
│   │   └── landing/               # Nav, Hero, Features, Pricing, CTA
│   ├── lib/
│   │   ├── supabase/              # client · server · admin · middleware
│   │   ├── i18n/                  # config · dictionaries · provider
│   │   └── utils/                 # cn · date · currency · motion
│   └── middleware.ts              # Route protection + session refresh
├── supabase/
│   └── migrations/                # 001–008 SQL migration files + RLS policies
├── Dockerfile                     # Multi-stage standalone build
├── docker-compose.yml
├── nginx.conf
└── .env.example
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- Supabase account (Auth + PostgreSQL + Storage enabled)
- Lemon Squeezy account (for payment integration)
- Resend API key (for email automations)

### Local Development

```bash
# Clone the repository
git clone https://github.com/kutluhangil/SetraFitnessCRM.git
cd SetraFitnessCRM

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Fill in your Supabase and Lemon Squeezy credentials

# Start the dev server
npm run dev
```

App runs at `http://localhost:3000`.

### Database Setup

Migration files are located under `supabase/migrations/` in sequential order.

```bash
# With Supabase CLI (recommended)
supabase start
supabase db reset

# Or via Supabase Studio > SQL Editor
# Run 001_auth_profiles.sql → 008_rls_policies.sql in order
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (port 3000) |
| `npm run build` | Production build |
| `npm start` | Production server |
| `npm run lint` | ESLint check |
| `npm run type-check` | TypeScript type check |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|:--------:|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✓ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | ✓ |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (webhooks) | ✓ |
| `LEMON_SQUEEZY_API_KEY` | Lemon Squeezy API key | ✓ |
| `LEMON_SQUEEZY_WEBHOOK_SECRET` | Webhook signature secret | ✓ |
| `LEMON_SQUEEZY_STORE_ID` | Store ID | ✓ |
| `RESEND_API_KEY` | Email delivery key | ✓ |
| `EMAIL_FROM` | Sender email address | ✓ |
| `NEXT_PUBLIC_APP_URL` | Production URL | ✓ |
| `CRON_SECRET` | Cron endpoint bearer token | ✓ |

---

## 🔒 Security & Data Privacy

| Layer | Implementation |
|-------|----------------|
| **Database** | Supabase RLS active on every table — no coach can query another's data |
| **Authentication** | Supabase Auth secure sessions + middleware-level route protection |
| **Webhook** | HMAC-SHA256 signature verification on all Lemon Squeezy events |
| **API** | `CRON_SECRET` bearer token protects all cron endpoints |
| **Environment** | Service role keys and API keys never leak into the client bundle |
| **Error Handling** | All async Supabase calls wrapped in try/catch boundaries |

---

## 💳 Subscription Plans

| Plan | Client Limit | Monthly (TRY) | Yearly (TRY) |
|------|:------------:|:-------------:|:------------:|
| **Trial** | 5 | Free (14 days) | — |
| **Solo** | 50 | ₺799/mo | ₺7,670/yr |
| **Studio** | 200 | ₺2,199/mo | ₺21,110/yr |

USD pricing is also available. Payments are processed via Lemon Squeezy (supports sales from Turkey).

---

## 🐳 Docker Deployment

```bash
# Prepare your production .env file
cp .env.example .env

# Build and start the Docker image
docker compose up -d --build

# Nginx reverse proxy starts automatically on port 80
# Add Cloudflare Tunnel for SSL and domain routing
```

---

## 🗺️ Roadmap

- [x] Phase 1 — Core infrastructure (Next.js, Tailwind, Supabase, i18n, Auth)
- [x] Phase 2 — Database migrations + RLS policies
- [x] Phase 3 — Dashboard shell + overview page
- [x] Landing — Hero, Features, Pricing, CTA
- [ ] Phase 4 — Client management (CRUD, filters, limit enforcement)
- [ ] Phase 5 — Workout builder (drag & drop, exercise library)
- [ ] Phase 6 — Progress tracking (charts, photo comparison)
- [ ] Phase 7 — Payment system (manual + auto-generate, revenue chart)
- [ ] Phase 8 — Messaging (thread view, templates, email delivery)
- [ ] Phase 9 — Automation engine + cron endpoints
- [ ] Phase 10 — Lemon Squeezy checkout + webhook integration
- [ ] Phase 12 — Production hardening (CI/CD, health check)
- [ ] Phase 13 — PWA, accessibility, performance optimization

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<div align="center">

Built with precision by [kutluhangil](https://github.com/kutluhangil)

<br />

**[setra.app](https://setra.app)**

<br />

*If you find this useful, consider giving it a ⭐*

</div>
