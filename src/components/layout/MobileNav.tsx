'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Wallet,
  MessageSquare,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useTranslation } from '@/lib/i18n/provider';

interface Item {
  href: string;
  icon: LucideIcon;
  labelKey: string;
}

const items: Item[] = [
  { href: '/dashboard', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { href: '/dashboard/clients', icon: Users, labelKey: 'nav.clients' },
  { href: '/dashboard/workouts', icon: Dumbbell, labelKey: 'nav.workouts' },
  { href: '/dashboard/payments', icon: Wallet, labelKey: 'nav.payments' },
  { href: '/dashboard/messages', icon: MessageSquare, labelKey: 'nav.messages' },
];

export function MobileNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-16 border-t border-border-primary bg-bg-primary/90 backdrop-blur-md">
      <div className="h-full grid grid-cols-5">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-colors',
                active ? 'text-text-primary' : 'text-text-tertiary',
              )}
            >
              <item.icon className="h-4 w-4" strokeWidth={1.75} />
              <span className="text-[10px] font-medium tracking-wide">{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
