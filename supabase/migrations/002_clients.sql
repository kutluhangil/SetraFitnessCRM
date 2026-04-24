-- 002: CLIENTS
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  avatar_url text,
  date_of_birth date,
  gender text check (gender in ('male','female','other')),
  status text default 'active'
    check (status in ('active','inactive','paused','archived')),
  notes text,
  tags text[] default '{}',
  emergency_contact text,
  emergency_phone text,

  height_cm numeric,
  start_weight_kg numeric,
  goal_weight_kg numeric,
  fitness_level text check (fitness_level in ('beginner','intermediate','advanced')),
  medical_notes text,

  monthly_fee numeric,
  payment_day integer check (payment_day between 1 and 31),
  payment_method text check (payment_method in ('cash','transfer','card','other')),

  joined_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_clients_coach on public.clients(coach_id);
create index if not exists idx_clients_status on public.clients(status);

drop trigger if exists clients_set_updated_at on public.clients;
create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();
