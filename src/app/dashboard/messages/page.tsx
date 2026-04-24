import { MessageSquare } from 'lucide-react';
import { EmptyState } from '@/components/ui/EmptyState';

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Mesajlar</h1>
        <p className="text-sm text-text-tertiary mt-1">Müşterilerinle mesajlaş, şablonlarla hızlan.</p>
      </div>
      <EmptyState
        icon={<MessageSquare className="h-4 w-4" />}
        title="Mesaj merkezi yakında"
        description="Bu sayfa Faz 8'de aktif olacak: thread görünümü, şablonlar, e-posta entegrasyonu."
      />
    </div>
  );
}
