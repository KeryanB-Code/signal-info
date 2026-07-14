-- À exécuter dans Supabase → SQL Editor, sur le nouveau projet "maison-regard"

create table public.products (
  id text primary key,
  brand text not null,
  name text not null,
  ref text,
  subtitle text,
  price integer not null,
  category text not null check (category in ('optique','soleil')),
  gender text not null check (gender in ('homme','femme','mixte')),
  style text not null check (style in ('minimaliste','classique','statement','sport-chic','prestige')),
  materials text[] not null default '{}',
  colors text[] not null default '{}',
  description text,
  images text[] not null default '{}',
  rating numeric(2,1) not null default 0,
  review_count integer not null default 0,
  in_stock boolean not null default true,
  is_new boolean not null default false,
  correction boolean not null default false,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "public can read products"
  on public.products for select
  using (true);

create policy "authenticated can write products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);

create policy "public can read product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "authenticated can upload product images"
  on storage.objects for insert
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "authenticated can delete product images"
  on storage.objects for delete
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- Ensuite : Authentication → Users → Add user, créer un premier compte
-- (email + mot de passe) pour se connecter à /admin/login.
