'use client';

import { UserPlus, CheckCircle2, Wallet, MessageSquare, TrendingUp, type LucideIcon } from 'lucide-react';
import { relativeTime } from '@/lib/utils/date';

type ActivityType = 'client_added' | 'payment_received' | 'workout_completed' | 'message_sent' | 'progress_logged';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  subtitle?: string;
  at: string;
}

interface Props {
  activities: Activity[];
  locale: string;
}

const iconMap: Record<ActivityType, LucideIcon> = {
  client_added: UserPlus,
  payment_received: Wallet,
  workout_completed: CheckCircle2,
  message_sent: MessageSquare,
  progress_logged: TrendingUp,
};

const colorMap: Record<ActivityType, string> = {
  client_added: 'text-info bg-info-muted',
  payment_received: 'text-success bg-success-muted',
  workout_completed: 'text-success bg-success-muted',
  message_sent: 'text-text-secondary bg-bg-tertiary',
  progress_logged: 'text-warning bg-warning-muted',
};

export function ActivityFeed({ activities, locale }: Props) {
  if (activities.length === 0) {
    return <div className="text-sm text-text-muted py-8 text-center">Henüz aktivite yok</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {activities.map((a) => {
        const Icon = iconMap[a.type];
        return (
          <div key={a.id} className="flex gap-3">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${colorMap[a.type]}`}>
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="text-sm text-text-primary">{a.title}</div>
              {a.subtitle && <div className="text-xs text-text-tertiary mt-0.5">{a.subtitle}</div>}
              <div className="text-[11px] text-text-muted mt-1">{relativeTime(a.at, locale)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
