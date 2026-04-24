import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { MobileNav } from '@/components/layout/MobileNav';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, avatar_url')
    .eq('id', user.id)
    .maybeSingle<{ full_name: string; email: string; avatar_url: string | null }>();

  const name = profile?.full_name ?? user.email?.split('@')[0] ?? 'User';
  const email = profile?.email ?? user.email ?? '';

  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar name={name} email={email} avatarUrl={profile?.avatar_url ?? null} />
        <main className="flex-1 p-5 sm:p-7 pb-24 lg:pb-7">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
