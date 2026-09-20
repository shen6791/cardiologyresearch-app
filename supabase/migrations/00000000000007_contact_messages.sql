create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;

create policy "contact: anyone can submit" on public.contact_messages for insert
  with check (true);
create policy "contact: admin read" on public.contact_messages for select
  using (public.is_admin());
create policy "contact: admin delete" on public.contact_messages for delete
  using (public.is_admin());

grant insert on public.contact_messages to anon, authenticated;
grant select, delete on public.contact_messages to authenticated;
