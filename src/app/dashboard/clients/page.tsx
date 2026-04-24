import Link from 'next/link';
import { UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Müşteriler</h1>
          <p className="text-sm text-text-tertiary mt-1">Tüm müşterilerini tek yerden yönet.</p>
        </div>
        <Link href="/dashboard/clients/new">
          <Button leftIcon={<UserPlus className="h-4 w-4" />}>Yeni Müşteri</Button>
        </Link>
      </div>

      <EmptyState
        icon={<Users className="h-4 w-4" />}
        title="Henüz müşteri yok"
        description="İlk müşterini ekleyerek başla. Müşteri profili, ödeme, antrenman ve ilerleme hepsi tek yerden."
        action={
          <Link href="/dashboard/clients/new">
            <Button leftIcon={<UserPlus className="h-4 w-4" />}>Müşteri Ekle</Button>
          </Link>
        }
      />
    </div>
  );
}
