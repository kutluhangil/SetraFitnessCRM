import { Users, Activity, TrendingUp, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { UpcomingPayments } from '@/components/dashboard/UpcomingPayments';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { DashboardGreeting } from './_components/DashboardGreeting';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, currency, locale')
    .eq('id', user!.id)
    .maybeSingle<{ full_name: string; currency: string; locale: string }>();

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Koç';
  const currency = profile?.currency ?? 'TRY';
  const locale = profile?.locale === 'en' ? 'en-US' : 'tr-TR';

  // Demo/placeholder chart data — will be replaced with real aggregation
  const today = new Date();
  const revenueData = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (29 - i));
    const base = 1200 + Math.sin(i / 3) * 400 + i * 40;
    return {
      date: d.toLocaleDateString(locale, { day: '2-digit', month: 'short' }),
      revenue: Math.round(base + Math.random() * 200),
    };
  });

  const upcomingPayments: Array<{
    id: string;
    clientName: string;
    amount: number;
    currency: string;
    dueDate: string;
    status: 'pending' | 'overdue';
  }> = [];

  const activities: Array<{
    id: string;
    type: 'client_added' | 'payment_received' | 'workout_completed' | 'message_sent' | 'progress_logged';
    title: string;
    subtitle?: string;
    at: string;
  }> = [];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Greeting */}
      <DashboardGreeting name={firstName} />

      {/* Quick actions */}
      <QuickActions />

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Users className="h-4 w-4" />} label="Toplam Müşteri" value={0} />
        <StatCard icon={<Activity className="h-4 w-4" />} label="Aktif Müşteri" value={0} />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="Aylık Gelir"
          value={currency === 'TRY' ? '₺0' : '$0'}
        />
        <StatCard icon={<Clock className="h-4 w-4" />} label="Bekleyen Ödeme" value={0} />
      </div>

      {/* Revenue + Upcoming */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>Gelir Grafiği</CardTitle>
              <CardDescription>Son 30 gün</CardDescription>
            </div>
          </CardHeader>
          <RevenueChart data={revenueData} currency={currency} />
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Yaklaşan Ödemeler</CardTitle>
              <CardDescription>Önümüzdeki 7 gün</CardDescription>
            </div>
          </CardHeader>
          <UpcomingPayments payments={upcomingPayments} locale={locale} />
        </Card>
      </div>

      {/* Activity feed */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Son Aktivite</CardTitle>
            <CardDescription>Hesabında olan bitenler</CardDescription>
          </div>
        </CardHeader>
        <ActivityFeed activities={activities} locale={locale} />
      </Card>
    </div>
  );
}
