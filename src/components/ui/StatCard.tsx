import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { Card } from './Card';

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string | number;
  delta?: { value: number; direction: 'up' | 'down' | 'flat'; label?: string };
  className?: string;
}

export function StatCard({ icon, label, value, delta, className }: StatCardProps) {
  const deltaColor =
    delta?.direction === 'up'
      ? 'text-success'
      : delta?.direction === 'down'
        ? 'text-danger'
        : 'text-text-tertiary';

  return (
    <Card hover className={cn('relative', className)}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
            {label}
          </span>
          <span className="mt-3 text-3xl font-semibold tracking-tight text-text-primary font-sans">
            {value}
          </span>
          {delta && (
            <span className={cn('mt-2 text-xs font-medium flex items-center gap-1', deltaColor)}>
              <span>
                {delta.direction === 'up' ? '↑' : delta.direction === 'down' ? '↓' : '→'}{' '}
                {Math.abs(delta.value)}%
              </span>
              {delta.label && <span className="text-text-muted">{delta.label}</span>}
            </span>
          )}
        </div>
        {icon && (
          <div className="h-9 w-9 rounded-md bg-bg-tertiary border border-border-primary flex items-center justify-center text-text-tertiary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
