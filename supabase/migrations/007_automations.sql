-- 007: AUTOMATIONS
create table if not exists public.automations (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text,
  is_active boolean default true,

  trigger_type text not null check (trigger_type in (
    'payment_due',
    'payment_overdue',
    'client_inactive',
    'workout_completed',
    'progress_milestone',
    'client_birthday',
    'plan_expiring',
    'new_client',
    'schedule'
  )),
  trigger_config jsonb default '{}',

  action_type text not null check (action_type in (
    'send_email',
    'send_in_app_message',
    'send_whatsapp',
    'create_payment',
    'assign_workout',
    'update_client_status',
    'create_task'
  )),
  action_config jsonb default '{}',

  schedule_cron text,
  last_run_at timestamptz,
  next_run_at timestamptz,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists automations_set_updated_at on public.automations;
create trigger automations_set_updated_at
  before update on public.automations
  for each row execute function public.set_updated_at();

create table if not exists public.automation_logs (
  id uuid primary key default gen_random_uuid(),
  automation_id uuid not null references public.automations(id) on delete cascade,
  client_id uuid references public.clients(id),
  status text not null check (status in ('success','failed','skipped')),
  details jsonb default '{}',
  executed_at timestamptz default now()
);

create index if not exists idx_automation_logs on public.automation_logs(automation_id, executed_at desc);
