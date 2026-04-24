-- 003: EXERCISES + WORKOUT PLANS
create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid references public.profiles(id) on delete cascade,
  name_tr text not null,
  name_en text not null,
  description_tr text,
  description_en text,
  muscle_group text not null,
  equipment text,
  difficulty text check (difficulty in ('beginner','intermediate','advanced')),
  video_url text,
  image_url text,
  is_global boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_exercises_coach on public.exercises(coach_id);
create index if not exists idx_exercises_muscle_group on public.exercises(muscle_group);

create table if not exists public.workout_plans (
  id uuid primary key default gen_random_uuid(),
  coach_id uuid not null references public.profiles(id) on delete cascade,
  name_tr text not null,
  name_en text,
  description text,
  duration_weeks integer default 4,
  difficulty text check (difficulty in ('beginner','intermediate','advanced')),
  goal text,
  is_template boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists workout_plans_set_updated_at on public.workout_plans;
create trigger workout_plans_set_updated_at
  before update on public.workout_plans
  for each row execute function public.set_updated_at();

create table if not exists public.workout_days (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.workout_plans(id) on delete cascade,
  day_number integer not null,
  name text,
  rest_day boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.workout_exercises (
  id uuid primary key default gen_random_uuid(),
  workout_day_id uuid not null references public.workout_days(id) on delete cascade,
  exercise_id uuid not null references public.exercises(id),
  sets integer default 3,
  reps text default '12',
  weight text,
  rest_seconds integer default 60,
  tempo text,
  notes text,
  sort_order integer default 0,
  superset_group text
);

create table if not exists public.client_workout_assignments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  plan_id uuid not null references public.workout_plans(id) on delete cascade,
  assigned_at timestamptz default now(),
  starts_at date not null,
  ends_at date,
  status text default 'active' check (status in ('active','completed','cancelled')),
  notes text
);

create index if not exists idx_assignments_client on public.client_workout_assignments(client_id);
