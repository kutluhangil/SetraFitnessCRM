'use client';

import Link from 'next/link';
import {
  UserPlus,
  Dumbbell,
  MessageSquarePlus,
  LineChart,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n/provider';

interface Action {
  icon: LucideIcon;
  labelKey: string;
  href: string;
}

const actions: Action[] = [
  { icon: UserPlus, labelKey: 'dashboard.addClient', href: '/dashboard/clients/new' },
  { icon: Dumbbell, labelKey: 'dashboard.createPlan', href: '/dashboard/workouts' },
  { icon: MessageSquarePlus, labelKey: 'dashboard.sendMessage', href: '/dashboard/messages' },
  { icon: LineChart, labelKey: 'dashboard.logProgress', href: '/dashboard/progress' },
];

export function QuickActions() {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {actions.map((a) => (
        <Link
          key={a.href}
          href={a.href}
          className="group flex items-center gap-3 p-4 rounded-lg bg-bg-secondary border border-border-primary hover:border-border-hover hover:bg-bg-tertiary transition-all duration-fast card-glow"
        >
          <div className="h-9 w-9 rounded-md bg-bg-tertiary border border-border-primary flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:border-border-hover transition-colors">
            <a.icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
          <span className="text-sm font-medium text-text-primary">{t(a.labelKey)}</span>
        </Link>
      ))}
    </div>
  );
}
