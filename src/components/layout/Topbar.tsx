'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, LogOut, ChevronDown } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { LanguageToggle } from '@/components/landing/LanguageToggle';
import { useTranslation } from '@/lib/i18n/provider';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils/cn';

interface TopbarProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export function Topbar({ name, email, avatarUrl }: TopbarProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function onSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between gap-4 px-5 sm:px-7 border-b border-border-primary bg-bg-primary/80 backdrop-blur-md">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-tertiary pointer-events-none" />
          <input
            type="search"
            placeholder={t('common.search')}
            className={cn(
              'w-full h-9 pl-9 pr-16 rounded-md bg-bg-secondary border border-border-primary',
              'text-sm text-text-primary placeholder:text-text-muted',
              'focus:outline-none focus:border-border-hover focus:ring-2 focus:ring-accent-muted',
              'transition-colors',
            )}
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center h-5 px-1.5 rounded text-[10px] font-mono text-text-tertiary bg-bg-tertiary border border-border-primary">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right cluster */}
      <div className="flex items-center gap-2">
        <LanguageToggle />

        <button
          className="h-9 w-9 rounded-md border border-border-primary bg-bg-secondary hover:bg-bg-tertiary text-text-tertiary hover:text-text-primary inline-flex items-center justify-center transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" strokeWidth={1.75} />
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            className="flex items-center gap-2 h-9 pl-1 pr-2.5 rounded-md border border-border-primary bg-bg-secondary hover:bg-bg-tertiary transition-colors"
          >
            <Avatar name={name} src={avatarUrl} size="sm" />
            <span className="hidden sm:block text-xs font-medium text-text-primary max-w-[120px] truncate">
              {name}
            </span>
            <ChevronDown className="h-3 w-3 text-text-tertiary" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-lg border border-border-primary bg-bg-elevated shadow-lg p-1.5 animate-fade-in-up">
              <div className="px-2.5 py-2 border-b border-border-primary mb-1.5">
                <div className="text-sm font-medium text-text-primary truncate">{name}</div>
                <div className="text-xs text-text-tertiary truncate">{email}</div>
              </div>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSignOut();
                }}
                className="w-full flex items-center gap-2.5 h-9 px-2.5 rounded-md text-sm text-text-secondary hover:bg-bg-tertiary hover:text-danger transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                {t('nav.signOut')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
