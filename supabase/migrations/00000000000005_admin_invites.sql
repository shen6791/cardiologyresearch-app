create table public.admin_invites (
  email text primary key,
  role public.app_role not null default 'admin',
  invited_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);
alter table public.admin_invites enable row level security;
create policy "invites: super admin manages" on public.admin_invites for all
  using (public.current_role_is('super_admin'))
  with check (public.current_role_is('super_admin'));
create policy "invites: self read own invite" on public.admin_invites for select
  using (email = auth.jwt() ->> 'email');

-- Replace the signup trigger: only create a profile (and grant access) when the
-- signing-up email was invited by a super admin. Anyone else who signs up gets
-- no profile row, so is_admin() stays false and the admin panel stays locked.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  invite public.admin_invites;
begin
  select * into invite from public.admin_invites where email = new.email;
  if invite.email is not null then
    insert into public.profiles (id, email, role)
    values (new.id, new.email, invite.role)
    on conflict (id) do nothing;
    delete from public.admin_invites where email = new.email;
  end if;
  return new;
end;
$$;

-- Seed the first super admin invite so the confirmed super admin account
-- (created directly in the dashboard) is promoted on next login/signup pass,
-- and so the invite flow is ready for future admins.
insert into public.admin_invites (email, role)
values ('animsara3@gmail.com', 'super_admin')
on conflict (email) do nothing;
