'use client';

import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { formatDateShort } from '@/lib/utils/date';

interface Payment {
  id: string;
  clientName: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: 'pending' | 'overdue';
}

interface Props {
  payments: Payment[];
  locale: string;
}

const symbols: Record<string, string> = { TRY: '₺', USD: '$', EUR: '€' };

export function UpcomingPayments({ payments, locale }: Props) {
  if (payments.length === 0) {
    return <div className="text-sm text-text-muted py-8 text-center">Yaklaşan ödeme yok</div>;
  }

  return (
    <div className="flex flex-col">
      {payments.map((p, idx) => (
        <div
          key={p.id}
          className={`flex items-center gap-3 py-3 ${idx !== payments.length - 1 ? 'border-b border-border-primary' : ''}`}
        >
          <Avatar name={p.clientName} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-text-primary truncate">{p.clientName}</div>
            <div className="text-xs text-text-tertiary">{formatDateShort(p.dueDate, locale)}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-text-primary tabular-nums">
              {symbols[p.currency] ?? ''}
              {p.amount.toLocaleString()}
            </div>
            <Badge variant={p.status === 'overdue' ? 'danger' : 'warning'} dot className="mt-1">
              {p.status === 'overdue' ? 'Gecikmiş' : 'Bekliyor'}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
