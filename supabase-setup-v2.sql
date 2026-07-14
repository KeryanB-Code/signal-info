-- ============================================================
-- Maison Regard — Pilotage panel: rôles, analytics, signalement de bugs
-- À exécuter dans Supabase → SQL Editor.
-- Additif à supabase-setup.sql (ne pas re-exécuter celui-ci).
-- ============================================================

-- 1. PROFILES ---------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null check (role in ('administrateur','manager','coequipier')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- 2. FONCTION SECURITY DEFINER (évite la récursion RLS) ---------
create or replace function public.current_user_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

grant execute on function public.current_user_role() to authenticated;

-- 3. POLICIES PROFILES --------------------------------------------
-- Lecture seule via policies. Volontairement aucune policy insert/
-- update/delete : avec RLS activé et sans policy pour ces commandes,
-- Postgres les refuse par défaut. Tous les écritures passent
-- exclusivement par api/create-user.js (clé service_role, contourne
-- RLS) ou manuellement dans l'éditeur SQL pour le bootstrap.

create policy "users can read own profile"
  on public.profiles for select
  using (id = auth.uid());

create policy "admins and managers can read all profiles"
  on public.profiles for select
  using (public.current_user_role() in ('administrateur','manager'));

-- 4. EVENTS (analytics : pageviews, add_to_cart, checkout_click) --
create table public.events (
  id bigint generated always as identity primary key,
  type text not null check (type in ('pageview','add_to_cart','checkout_click')),
  path text,
  product_id text references public.products(id) on delete set null,
  session_id text not null,
  user_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;

create index events_type_created_at_idx on public.events (type, created_at desc);
create index events_session_id_idx on public.events (session_id);

-- Les visiteurs anonymes du site public doivent pouvoir insérer.
create policy "anyone can insert events"
  on public.events for insert
  with check (true);

-- Seuls les rôles de l'onglet Pilotage peuvent lire les données.
create policy "admins and managers can read events"
  on public.events for select
  using (public.current_user_role() in ('administrateur','manager'));

-- Pas de policy update/delete → les événements sont en append-only.

-- 5. BUG REPORTS ---------------------------------------------------
create table public.bug_reports (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  status text not null default 'ouvert' check (status in ('ouvert','en_cours','resolu')),
  reported_by uuid references auth.users(id),
  reported_by_name text not null,
  created_at timestamptz not null default now()
);

alter table public.bug_reports enable row level security;

create policy "staff can read bug reports"
  on public.bug_reports for select
  using (public.current_user_role() is not null);

create policy "staff can insert bug reports"
  on public.bug_reports for insert
  with check (public.current_user_role() is not null and reported_by = auth.uid());

create policy "staff can update bug reports"
  on public.bug_reports for update
  using (public.current_user_role() is not null)
  with check (public.current_user_role() is not null);

-- ============================================================
-- BOOTSTRAP — à exécuter manuellement, une fois, après avoir créé
-- le premier compte administrateur dans Authentication → Users →
-- Add user. Copie l'UUID de cet utilisateur depuis la table Users,
-- puis exécute (en remplaçant les valeurs) :
-- ============================================================
-- insert into public.profiles (id, email, full_name, role)
-- values ('<uuid-depuis-auth-users>', 'admin@maisonregard.fr', 'Prénom Nom', 'administrateur');
