import { Zap } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function AutomationsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Otomasyonlar</h1>
        <p className="text-sm text-text-tertiary mt-1">Tekrarlayan işleri sana bıraksın.</p>
      </div>
      <EmptyState
        icon={<Zap className="h-4 w-4" />}
        title="Otomasyon motoru yakında"
        description="Bu sayfa Faz 9'da aktif olacak: ödeme hatırlatma, hoş geldin mesajı ve daha fazlası."
      />
    </div>
  );
}
