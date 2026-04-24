import { Dumbbell } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function WorkoutsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Antrenman Planları</h1>
        <p className="text-sm text-text-tertiary mt-1">Plan şablonları oluştur, müşterilere ata.</p>
      </div>
      <EmptyState
        icon={<Dumbbell className="h-4 w-4" />}
        title="Plan builder yakında"
        description="Bu sayfa Faz 5'te aktif olacak: drag & drop plan oluşturucu, egzersiz kütüphanesi ve şablonlar."
      />
    </div>
  );
}
