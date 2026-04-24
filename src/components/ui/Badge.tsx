import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'accent';

const variants: Record<Variant, string> = {
  neutral: 'bg-bg-tertiary text-text-secondary border-border-primary',
  success: 'bg-success-muted text-success border-transparent',
  warning: 'bg-warning-muted text-warning border-transparent',
  danger: 'bg-danger-muted text-danger border-transparent',
  info: 'bg-info-muted text-info border-transparent',
  accent: 'bg-accent-muted text-text-primary border-transparent',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  dot?: boolean;
}

export function Badge({ className, variant = 'neutral', dot, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full border',
        'text-xs font-medium tracking-wide whitespace-nowrap',
        variants[variant],
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'success' && 'bg-success',
            variant === 'warning' && 'bg-warning',
            variant === 'danger' && 'bg-danger',
            variant === 'info' && 'bg-info',
            variant === 'neutral' && 'bg-text-tertiary',
            variant === 'accent' && 'bg-accent',
          )}
        />
      )}
      {children}
    </span>
  );
}
