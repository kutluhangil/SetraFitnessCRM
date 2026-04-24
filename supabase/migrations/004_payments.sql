-- 004: PAYMENTS
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  amount numeric not null,
  currency text default 'TRY',
  status text default 'pending'
    check (status in ('pending','paid','overdue','cancelled','refunded')),
  payment_method text,
  due_date date not null,
  paid_at timestamptz,
  period_start date,
  period_end date,
  notes text,
  reminder_sent boolean default false,
  reminder_sent_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_payments_status on public.payments(status, due_date);
create index if not exists idx_payments_coach on public.payments(coach_id);
create index if not exists idx_payments_client on public.payments(client_id, due_date desc);
