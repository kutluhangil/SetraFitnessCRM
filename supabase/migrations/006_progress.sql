-- 006: PROGRESS TRACKING
create table if not exists public.progress_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  coach_id uuid not null references public.profiles(id) on delete cascade,
  recorded_at date not null default current_date,

  weight_kg numeric,
  body_fat_percentage numeric,
  chest_cm numeric,
  waist_cm numeric,
  hip_cm numeric,
  arm_cm numeric,
  thigh_cm numeric,

  notes text,
  created_at timestamptz default now()
);

create index if not exists idx_progress_client on public.progress_entries(client_id, recorded_at desc);

create table if not exists public.progress_photos (
  id uuid primary key default gen_random_uuid(),
  progress_entry_id uuid not null references public.progress_entries(id) on delete cascade,
  photo_url text not null,
  photo_type text check (photo_type in ('front','side','back')),
  created_at timestamptz default now()
);
