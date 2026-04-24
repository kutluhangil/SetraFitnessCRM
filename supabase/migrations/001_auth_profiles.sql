-- 001: PROFILES — synced with Supabase Auth
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null,
  avatar_url text,
  phone text,
  business_name text,
  timezone text default 'Europe/Istanbul',
  locale text default 'tr' check (locale in ('tr','en')),
  currency text default 'TRY' check (currency in ('TRY','USD','EUR')),

  ls_customer_id text,
  ls_subscription_id text,
  ls_variant_id text,
  subscription_status text default 'trialing'
    check (subscription_status in ('trialing','active','paused','cancelled','expired')),
  subscription_ends_at timestamptz,
  client_limit integer default 5,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-create profile row on new auth.user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, business_name, locale)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'business_name',
    coalesce(new.raw_user_meta_data ->> 'locale', 'tr')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
