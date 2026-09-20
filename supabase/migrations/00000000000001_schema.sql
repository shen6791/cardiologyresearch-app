-- Wipe existing pharmacy-lk schema and set up fresh schema for the cardiology research site.
drop schema if exists public cascade;
create schema public;
grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on all tables in schema public to postgres, service_role;
grant all on all sequences in schema public to postgres, service_role;
grant all on all functions in schema public to postgres, service_role;
alter default privileges in schema public grant all on tables to postgres, service_role;
alter default privileges in schema public grant all on sequences to postgres, service_role;
alter default privileges in schema public grant all on functions to postgres, service_role;

-- ========== Roles / profiles ==========
create type public.app_role as enum ('super_admin', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role public.app_role not null default 'admin',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.current_role_is(r public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = r);
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

create policy "profiles: self read" on public.profiles for select
  using (id = auth.uid());
create policy "profiles: super admin reads all" on public.profiles for select
  using (public.current_role_is('super_admin'));
create policy "profiles: super admin manages all" on public.profiles for all
  using (public.current_role_is('super_admin'))
  with check (public.current_role_is('super_admin'));

-- ========== Site content ==========
create table public.site_settings (
  id int primary key default 1,
  doctor_name text not null default 'Dr. Faslur Rahuman',
  tagline text not null default 'Advancing interventional cardiology through evidence.',
  bio_intro text not null default '',
  bio_body text not null default '',
  photo_url text,
  contact_email text not null default 'csthcardioresearch@gmail.com',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into public.site_settings (id) values (1);
alter table public.site_settings enable row level security;
create policy "settings: public read" on public.site_settings for select using (true);
create policy "settings: admin write" on public.site_settings for update using (public.is_admin());

create table public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  publisher text not null,
  year int,
  full_article_url text,
  pdf_url text,
  pdf_path text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.publications enable row level security;
create policy "publications: public read" on public.publications for select using (true);
create policy "publications: admin write" on public.publications for all
  using (public.is_admin()) with check (public.is_admin());

create table public.clinical_trials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  link_label text,
  link_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.clinical_trials enable row level security;
create policy "trials: public read" on public.clinical_trials for select using (true);
create policy "trials: admin write" on public.clinical_trials for all
  using (public.is_admin()) with check (public.is_admin());

create table public.presentations (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  presented_at text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.presentations enable row level security;
create policy "presentations: public read" on public.presentations for select using (true);
create policy "presentations: admin write" on public.presentations for all
  using (public.is_admin()) with check (public.is_admin());

create table public.presentation_links (
  id uuid primary key default gen_random_uuid(),
  presentation_id uuid not null references public.presentations(id) on delete cascade,
  label text not null default 'Show',
  url text not null,
  sort_order int not null default 0
);
alter table public.presentation_links enable row level security;
create policy "pres_links: public read" on public.presentation_links for select using (true);
create policy "pres_links: admin write" on public.presentation_links for all
  using (public.is_admin()) with check (public.is_admin());

create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  cover_url text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.articles enable row level security;
create policy "articles: public read" on public.articles for select using (published = true);
create policy "articles: admin read all" on public.articles for select using (public.is_admin());
create policy "articles: admin write" on public.articles for all
  using (public.is_admin()) with check (public.is_admin());

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  video_url text not null,
  description text,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.videos enable row level security;
create policy "videos: public read" on public.videos for select using (published = true);
create policy "videos: admin read all" on public.videos for select using (public.is_admin());
create policy "videos: admin write" on public.videos for all
  using (public.is_admin()) with check (public.is_admin());

create table public.fellowships (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  pdf_url text,
  pdf_path text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.fellowships enable row level security;
create policy "fellowships: public read" on public.fellowships for select using (true);
create policy "fellowships: admin write" on public.fellowships for all
  using (public.is_admin()) with check (public.is_admin());

-- Auto-create a profile row when a new auth user is created (defaults to 'admin';
-- promote the first account to super_admin manually after signup).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin')
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
