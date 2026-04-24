import { TrendingUp } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ProgressPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">İlerleme</h1>
        <p className="text-sm text-text-tertiary mt-1">Müşterilerinin ilerleme grafiklerini izle.</p>
      </div>
      <EmptyState
        icon={<TrendingUp className="h-4 w-4" />}
        title="İlerleme sayfası yakında"
        description="Bu sayfa Faz 6'da aktif olacak: vücut ölçümü grafikleri ve fotoğraf karşılaştırması."
      />
    </div>
  );
}
