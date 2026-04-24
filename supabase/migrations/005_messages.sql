-- 005: MESSAGES + TEMPLATES
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  direction text not null check (direction in ('outgoing','incoming')),
  channel text default 'in_app'
    check (channel in ('in_app','email','whatsapp','sms')),
  subject text,
  body text not null,
  is_automated boolean default false,
  automation_id uuid,
  read_at timestamptz,
  sent_at timestamptz default now(),
  created_at timestamptz default now()
);

create index if not exists idx_messages_client on public.messages(client_id, sent_at desc);
create index if not exists idx_messages_coach on public.messages(coach_id, sent_at desc);

create table if not exists public.message_templates (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  subject text,
  body_tr text not null,
  body_en text,
  category text,
  variables text[] default '{}',
  created_at timestamptz default now()
);
