'use client';

import { ArrowUpRight, Users, TrendingUp, Calendar, Activity } from 'lucide-react';

export function DashboardPreview() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Glow frame */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />

      <div className="relative rounded-2xl border border-border-primary bg-bg-secondary/80 backdrop-blur p-2 shadow-lg">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-bg-tertiary" />
          <span className="h-2.5 w-2.5 rounded-full bg-bg-tertiary" />
          <span className="h-2.5 w-2.5 rounded-full bg-bg-tertiary" />
          <div className="ml-3 flex-1 h-6 rounded-md bg-bg-primary border border-border-primary max-w-sm" />
        </div>

        {/* Mock dashboard */}
        <div className="rounded-xl bg-bg-primary border border-border-primary p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-text-tertiary">
                Kontrol Paneli
              </div>
              <div className="text-lg font-semibold mt-0.5">Hoş geldin, Ali</div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-24 rounded-md bg-bg-secondary border border-border-primary" />
              <div className="h-8 w-8 rounded-full bg-bg-tertiary border border-border-primary" />
            </div>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { icon: Users, label: 'Müşteri', value: '34', trend: '+4' },
              { icon: Activity, label: 'Aktif', value: '28', trend: '+2' },
              { icon: TrendingUp, label: 'Gelir', value: '₺42,8K', trend: '+18%' },
              { icon: Calendar, label: 'Bekleyen', value: '6', trend: '-3' },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-lg bg-bg-secondary border border-border-primary p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-wider text-text-tertiary">
                    {s.label}
                  </div>
                  <s.icon className="h-3.5 w-3.5 text-text-muted" />
                </div>
                <div className="mt-2 text-xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-0.5 text-[10px] text-success flex items-center gap-0.5">
                  <ArrowUpRight className="h-3 w-3" /> {s.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Chart mock */}
          <div className="rounded-lg bg-bg-secondary border border-border-primary p-4 h-44 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium">Gelir Grafiği</div>
              <div className="text-[10px] text-text-tertiary">Son 30 gün</div>
            </div>
            <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fafafa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#fafafa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,80 C40,70 60,50 100,55 C140,60 160,30 200,35 C240,40 260,15 300,20 C340,25 360,10 400,15 L400,100 L0,100 Z"
                fill="url(#area)"
              />
              <path
                d="M0,80 C40,70 60,50 100,55 C140,60 160,30 200,35 C240,40 260,15 300,20 C340,25 360,10 400,15"
                stroke="#fafafa"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
