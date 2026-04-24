import { Wallet } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Ödemeler</h1>
        <p className="text-sm text-text-tertiary mt-1">Müşteri ödemelerini takip et.</p>
      </div>
      <EmptyState
        icon={<Wallet className="h-4 w-4" />}
        title="Henüz ödeme kaydı yok"
        description="Müşteri ekledikçe otomatik ödeme kayıtları burada listelenecek."
      />
    </div>
  );
}
