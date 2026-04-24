'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Wallet,
  MessageSquare,
  TrendingUp,
  Zap,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/lib/i18n/provider';

interface NavItem {
  href: string;
  icon: LucideIcon;
  labelKey: string;
}

const items: NavItem[] = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { href: '/dashboard/clients', icon: Users, labelKey: 'nav.clients' },
  { href: '/dashboard/workouts', icon: Dumbbell, labelKey: 'nav.workouts' },
  { href: '/dashboard/payments', icon: Wallet, labelKey: 'nav.payments' },
  { href: '/dashboard/messages', icon: MessageSquare, labelKey: 'nav.messages' },
  { href: '/dashboard/progress', icon: TrendingUp, labelKey: 'nav.progress' },
  { href: '/dashboard/automations', icon: Zap, labelKey: 'nav.automations' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <aside className="hidden lg:flex flex-col w-60 h-screen sticky top-0 border-r border-border-primary bg-bg-primary">
      {/* Brand */}
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-border-primary">
        <div className="h-7 w-7 rounded-md bg-white text-black flex items-center justify-center">
          <Dumbbell className="h-3.5 w-3.5" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold tracking-tight">FitCRM</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 p-3 overflow-y-auto">
        {items.map((item) => {
          const active =
            pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 h-9 px-3 rounded-md',
                'text-sm font-medium transition-colors duration-fast',
                active
                  ? 'bg-accent-muted text-text-primary'
                  : 'text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary',
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-accent" />
              )}
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="p-3 border-t border-border-primary">
        <Link
          href="/dashboard/settings"
          className={cn(
            'flex items-center gap-3 h-9 px-3 rounded-md text-sm font-medium transition-colors',
            pathname.startsWith('/dashboard/settings')
              ? 'bg-accent-muted text-text-primary'
              : 'text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary',
          )}
        >
          <Settings className="h-4 w-4" strokeWidth={1.75} />
          <span>{t('nav.settings')}</span>
        </Link>
      </div>
    </aside>
  );
}
