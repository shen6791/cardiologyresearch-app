grant usage on schema public to anon, authenticated;

grant select on public.site_settings to anon, authenticated;
grant update on public.site_settings to authenticated;

grant select on public.publications to anon, authenticated;
grant insert, update, delete on public.publications to authenticated;

grant select on public.clinical_trials to anon, authenticated;
grant insert, update, delete on public.clinical_trials to authenticated;

grant select on public.presentations to anon, authenticated;
grant insert, update, delete on public.presentations to authenticated;

grant select on public.presentation_links to anon, authenticated;
grant insert, update, delete on public.presentation_links to authenticated;

grant select on public.articles to anon, authenticated;
grant insert, update, delete on public.articles to authenticated;

grant select on public.videos to anon, authenticated;
grant insert, update, delete on public.videos to authenticated;

grant select on public.fellowships to anon, authenticated;
grant insert, update, delete on public.fellowships to authenticated;

grant select on public.profiles to authenticated;
grant update, delete on public.profiles to authenticated;

grant select, insert, delete on public.admin_invites to authenticated;

grant execute on function public.current_role_is(public.app_role) to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;
