-- 008: RLS POLICIES
alter table public.profiles                   enable row level security;
alter table public.clients                    enable row level security;
alter table public.exercises                  enable row level security;
alter table public.workout_plans              enable row level security;
alter table public.workout_days               enable row level security;
alter table public.workout_exercises          enable row level security;
alter table public.client_workout_assignments enable row level security;
alter table public.progress_entries           enable row level security;
alter table public.progress_photos            enable row level security;
alter table public.payments                   enable row level security;
alter table public.messages                   enable row level security;
alter table public.message_templates          enable row level security;
alter table public.automations                enable row level security;
alter table public.automation_logs            enable row level security;

-- Profiles: each coach sees/edits their own profile
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (id = auth.uid());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid());

-- Clients
drop policy if exists "clients_coach_scope" on public.clients;
create policy "clients_coach_scope" on public.clients
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

-- Exercises: global-read, coach-write own
drop policy if exists "exercises_select" on public.exercises;
create policy "exercises_select" on public.exercises
  for select using (is_global = true or coach_id = auth.uid());

drop policy if exists "exercises_write" on public.exercises;
create policy "exercises_write" on public.exercises
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

-- Workout plans
drop policy if exists "workout_plans_coach_scope" on public.workout_plans;
create policy "workout_plans_coach_scope" on public.workout_plans
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

-- workout_days + workout_exercises: gated by plan ownership
drop policy if exists "workout_days_via_plan" on public.workout_days;
create policy "workout_days_via_plan" on public.workout_days
  for all using (
    exists (
      select 1 from public.workout_plans wp
      where wp.id = workout_days.plan_id and wp.coach_id = auth.uid()
    )
  );

drop policy if exists "workout_exercises_via_day" on public.workout_exercises;
create policy "workout_exercises_via_day" on public.workout_exercises
  for all using (
    exists (
      select 1 from public.workout_days wd
      join public.workout_plans wp on wp.id = wd.plan_id
      where wd.id = workout_exercises.workout_day_id and wp.coach_id = auth.uid()
    )
  );

-- Client assignments
drop policy if exists "assignments_via_client" on public.client_workout_assignments;
create policy "assignments_via_client" on public.client_workout_assignments
  for all using (
    exists (
      select 1 from public.clients c
      where c.id = client_workout_assignments.client_id and c.coach_id = auth.uid()
    )
  );

-- Progress
drop policy if exists "progress_coach_scope" on public.progress_entries;
create policy "progress_coach_scope" on public.progress_entries
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

drop policy if exists "progress_photos_via_entry" on public.progress_photos;
create policy "progress_photos_via_entry" on public.progress_photos
  for all using (
    exists (
      select 1 from public.progress_entries pe
      where pe.id = progress_photos.progress_entry_id and pe.coach_id = auth.uid()
    )
  );

-- Payments
drop policy if exists "payments_coach_scope" on public.payments;
create policy "payments_coach_scope" on public.payments
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

-- Messages
drop policy if exists "messages_coach_scope" on public.messages;
create policy "messages_coach_scope" on public.messages
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

drop policy if exists "message_templates_coach_scope" on public.message_templates;
create policy "message_templates_coach_scope" on public.message_templates
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

-- Automations
drop policy if exists "automations_coach_scope" on public.automations;
create policy "automations_coach_scope" on public.automations
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

drop policy if exists "automation_logs_via_automation" on public.automation_logs;
create policy "automation_logs_via_automation" on public.automation_logs
  for all using (
    exists (
      select 1 from public.automations a
      where a.id = automation_logs.automation_id and a.coach_id = auth.uid()
    )
  );
