import { Settings as SettingsIcon } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ayarlar</h1>
        <p className="text-sm text-text-tertiary mt-1">Hesap, abonelik ve tercihlerini yönet.</p>
      </div>
      <EmptyState
        icon={<SettingsIcon className="h-4 w-4" />}
        title="Ayarlar yakında"
        description="Profil, abonelik (Lemon Squeezy), entegrasyonlar ve tercihler Faz 10'da tamamlanacak."
      />
    </div>
  );
}
